#!/usr/bin/env python3
"""画像パス検証: NFC 正規化 / ファイル存在 / Git 追跡 / NFD-NFC 重複。

push 前に実行する。エラー 0 件なら OK / Image path check passed を表示し
exit 0、問題があれば exit 1。
"""
from __future__ import annotations

import re
import subprocess
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SOURCES = [
    "index.html",
    "portfolio.html",
    "works.html",
    "history.html",
    "selected-works-shared.js",
    "works-data.json",
    "history-data.json",
]

PATH_RE = re.compile(
    r"(?:images|assets)/[^\s\"'`<>()\\?]+\.(?:webp|jpg|jpeg|png|gif|svg|avif|ico)",
    re.IGNORECASE,
)


def git_tracked_set() -> set[str]:
    try:
        out = subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=ROOT,
            check=True,
            capture_output=True,
        ).stdout
    except (FileNotFoundError, subprocess.CalledProcessError):
        return set()
    # git ls-files outputs raw bytes; with core.precomposeunicode=true, on
    # macOS this is NFC. We compare normalized strings to be safe.
    files = out.split(b"\x00")
    return {
        unicodedata.normalize("NFC", b.decode("utf-8"))
        for b in files
        if b
    }


def find_filesystem_duplicates() -> list[tuple[str, str]]:
    """同じ NFC 名に decompose される異形ファイルが共存していないか。"""
    seen: dict[str, str] = {}
    dups: list[tuple[str, str]] = []
    for d in ("images", "assets"):
        base = ROOT / d
        if not base.exists():
            continue
        for p in base.rglob("*"):
            if not p.is_file():
                continue
            rel = p.relative_to(ROOT).as_posix()
            nfc = unicodedata.normalize("NFC", rel)
            if nfc in seen and seen[nfc] != rel:
                dups.append((seen[nfc], rel))
            else:
                seen[nfc] = rel
    return dups


def scan_file(path: Path) -> list[tuple[int, str]]:
    """ファイル内の画像パス参照を (line_no, raw_path) で返す。"""
    if not path.exists():
        return []
    results: list[tuple[int, str]] = []
    with path.open("r", encoding="utf-8") as f:
        for lineno, line in enumerate(f, 1):
            for m in PATH_RE.finditer(line):
                results.append((lineno, m.group(0)))
    return results


def main() -> int:
    errors: list[str] = []

    tracked = git_tracked_set()
    if not tracked:
        print("WARN: git ls-files が取得できませんでした (Git 追跡チェックをスキップ)")

    for src in SOURCES:
        src_path = ROOT / src
        if not src_path.exists():
            continue
        for lineno, raw in scan_file(src_path):
            nfc = unicodedata.normalize("NFC", raw)
            if raw != nfc:
                errors.append(
                    f"NG  NFD 検出  {src}:{lineno}  {raw!r}  -> NFC {nfc!r}"
                )
            fs_path = ROOT / nfc
            if not fs_path.exists():
                errors.append(
                    f"NG  実ファイル無し  {src}:{lineno}  {nfc}"
                )
                continue
            if tracked and nfc not in tracked:
                errors.append(
                    f"NG  Git 未追跡  {src}:{lineno}  {nfc}"
                )

    for a, b in find_filesystem_duplicates():
        errors.append(f"NG  NFD/NFC 重複ファイル  {a}  ⟂  {b}")

    if errors:
        print("\n".join(errors))
        print(f"\nFAIL: {len(errors)} 件の問題が見つかりました")
        return 1

    print("OK  Image path check passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
