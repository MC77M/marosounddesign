# 00_HANDOVER.md — 引き継ぎファイル

次回作業の開始前に、このファイルから読む。

---

## プロジェクト概要

- **プロジェクト名**: HP_File_260418
- **内容**: Netlify公開用の静的ポートフォリオサイト

---

## 主要ページ

| ファイル | 説明 |
|---|---|
| index.html | トップページ |
| works.html | 楽曲一覧（300件、フィルター付き） |
| portfolio.html | Selected Works（12件、モーダル付き） |
| history.html | 経歴 |

---

## 主要データ・スクリプト

| ファイル | 説明 |
|---|---|
| works-data.json | works.html の全楽曲データ |
| history-data.json | history.html の経歴データ |
| selected-works-shared.js | portfolio.html のモーダル処理・データ |

---

## 現在の状態

- XSS対策済み（innerHTML 禁止 → DOM API に統一）
- モーダル閉じ処理統一済み
- CSS共通化済み（css/style.css）
- 日付表記 YYYY.MM.DD 統一済み
- 不要 preload / fetchpriority 削除済み
- works フィルター軽量化済み
- 日本語画像パス NFC 正規化済み

---

## 重要注意事項

- **日本語ファイル名は NFD/NFC 問題が起きる**
  - macOS は NFD、Netlify は NFC を期待する場合がある
  - 画像パスは必ず NFC 正規化すること
- **selected-works-shared.js と portfolio.html のパス一致が必須**
  - `onclick` 引数と `img src` が selected-works-shared.js のパスと一致しているか確認
- **本番確認では Network タブの画像 404 を必ず確認する**

---

## 関連ドキュメント

| ファイル | 内容 |
|---|---|
| docs/01_RULES.md | 作業ルール |
| docs/02_CHECKLIST.md | push前・ローカル・本番の確認手順 |
| docs/03_PROGRESS.md | リファクタリング進捗ログ |
| docs/04_TROUBLESHOOTING.md | トラブル対応 |

---

## 次回作業時の手順

1. `docs/00_HANDOVER.md`（このファイル）を読む
2. `docs/01_RULES.md` を読む
3. `docs/02_CHECKLIST.md` を読む
4. コード変更は **1目的ずつ**
5. 変更後はローカル確認、必要なら本番確認
