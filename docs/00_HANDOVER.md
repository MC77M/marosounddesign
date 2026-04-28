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
| portfolio.html | プロフィール・Selected Works（title: "Profile — MaroSoundDesign"） |
| history.html | 2019年以前の作品アーカイブ |

## SEO 関連ファイル

| ファイル | 説明 |
|---|---|
| assets/ogp.jpg | OGP 画像（1200×630） |
| sitemap.xml | 全4ページ登録済み |
| robots.txt | 全クローラー許可・sitemap 参照 |
| googlea0a2b71118ae6d61.html | Google Search Console 認証ファイル（削除禁止）|

---

## 主要データ・スクリプト

| ファイル | 説明 |
|---|---|
| works-data.json | works.html の全楽曲データ（raw 142KB / brotli 13.7KB） |
| history-data.json | history.html の経歴データ |
| selected-works-shared.js | portfolio.html のモーダル処理・データ |

---

## 現在の状態（2026-04-29 時点）

- XSS対策済み（innerHTML 禁止 → DOM API に統一）
- モーダル閉じ処理統一済み
- CSS共通化済み（css/style.css）
- 日付表記 YYYY.MM.DD 統一済み
- 不要 preload / fetchpriority 削除済み
- works フィルター軽量化済み
- 日本語画像パス NFC 正規化済み
- 画像パス NFC 自動チェック導入済み（`tools/check_image_paths.py`）
- README.md を現状構成に更新済み（2026-04-29）
- .gitignore に `data/raw/` `data/work/` `data/output/tmp/` `data/output/mappings/` 追加済み（2026-04-29）
- `_archive/2026-04-19_netlify_upload/` 削除済み・本番参照なし確認済み（2026-04-29）
- `claude.md` → `CLAUDE.md` 正規化済み・`AGENTS.md` / `CLAUDE.md` に `00_HANDOVER.md` 参照行追加（2026-04-29）

### Fix 2026-04-28（index.html スマホフッター崩れ修正・コミット 11ef71a）
- 症状: 480px 以下で `© 2025 宮川麿. All rights reserved.` が不自然に折り返され、文字間が広く見えていた
- 修正: `index.html` `<style>` 内の `@media(max-width:480px)` のみ書き換え
  - footer を中央寄せ化（`align-items:center;justify-content:center;text-align:center;padding:1.6rem 1rem`）
  - `.ft-copy` に `letter-spacing:.04em;white-space:nowrap;font-size:.6rem;line-height:1.4` を追加し1行表示
- 不変項: HTML 構造・文言・PC/タブレット表示・JS は変更なし
- 検証: 375 / 414px で `.ft-copy` 高さ 13.4px=1行・横スクロールなし・Console エラーなし

### Perf 2026-04-28（works.html スマホ画像後追い改善 Phase 1・コミット 9403a07）
- **背景**: スマホ高速フリック時、カード画像が後追いで表示される体感（rootMargin 600px が短い・lazy + IO の二段ゲート・width/height 未指定）
- **対応（works.html のみ、画像生成・JSON・CSS・モーダル仕様すべて変更なし）**:
  1. `ioFill` の `rootMargin` を `600px 0px` → `1200px 0px`（フリック追い越し対策）
  2. card `<img>` に `width="600" height="600"` 属性付与（CLS 抑制 / 早期レイアウト確定）
  3. card `<img>` の `loading="lazy"` → `loading="eager"`（IO 既ゲートのため二段 lazy 解消）
  4. `fillYear` 内で `isInitialYear = year === years[0]` を判定し、初期表示年の先頭 3 枚のみ `fetchpriority="high"`
- **状態**: Phase 1 のみ反映。**スマホ実機での体感確認待ち**。Phase 2（thumbnail 240px 生成）は実機確認後に判断
- **検証済**: 375/390/414px で初期 22 枚すべて期待属性、IO 起動で 2025/2024/2023 順次 fillYear、Console/404 なし

### Hotfix 2026-04-28
- index.html スマホ崩れ修正: inline `@media(max-width:900px)` の `.about-grid` 2 カラム指定が style.css 780px 単カラム化を上書きしていた → 781–900px に限定
- Selected Works の Lienel 画像 404 修正: index.html 296-297 行の "じ" が NFD 形式（し+゛）。NFC に正規化（6 バイトのみ）
- 再発防止: `tools/check_image_paths.py` 追加。push 前に NFD / 実ファイル無し / Git 未追跡 / NFD-NFC 重複を一括検出

### Perf 2026-04-28（works.html モーダル jacket 表示改善・コミット 99175c0 / 28005dd / e837243）
- **背景**: 一覧は thumbnail（~20KB）、モーダルは jacket（高解像度）。タップ後モーダルが先に開いて jacket が遅れて差し込まれる体感があった
- **対応 3 段（works.html のみ、CSS / モーダル HTML / フィルター / 年別 lazy fill すべて変更なし）**:
  1. **hover/touchstart 先読み**: `preloadJacket(idx)` を追加し、`.wcard` に `onmouseenter` / `ontouchstart` を付与。`Set` で重複抑止
  2. **初期表示年の idle preload**: `preloadInitialYearJackets()` を `renderWorks()` 末尾で呼び出し。`requestIdleCallback`（未対応時 `setTimeout 800ms`）で `years[0]` の jacket のみ低優先で取得（全件 preload はしない）
  3. **openModal 内 250ms 待機**: `waitForJacket(src, 250)` を追加し `openModal` 冒頭で `await`。キャッシュ済みなら即解決、未読込時のみ最大 250ms 待ってから開く（画像なしモーダル先行表示の体感解消）
- **状態**: 改善余地あり（実機 PSI 未再計測 / 一括 preload や CDN 配信最適化は未着手）。次回は実機での体感確認後に判断

### Feature/Hotfix 2026-04-28（追加分・コミット 61b9db7 / 97c6d64 / c8086d7 / 68a0522）
- **スマホモーダル下スワイプ閉じ機能追加**（3 ページ対応）
  - 新規 `js/modal-swipe.js`（touchstart/move/end、閾値 80px、上方向無視、`.modal-handle` または `scrollTop===0` 開始限定 → モーダル内スクロール非干渉、`window.closeModal` 呼び出し fallback あり）
  - 各 HTML に `<script src="js/modal-swipe.js?v=20260428" defer></script>` 1 行追加のみ。CSS / 既存 JS 変更なし
  - PC 操作非干渉（touch event のみ監視）。overlay クリック / close ボタン / Escape 維持
- **works.html ヘッダーロゴ表示崩れ修正**
  - 1 行表示 → `<br>` 抜け追加（index/portfolio と同じ `Maro<br><span>Sound</span>Design`）
  - スマホ位置ズレ → works.html `<style>` に `@media(max-width:900px){nav{padding:1rem 1.4rem}}` 追加、`@media(max-width:600px)` の `nav{padding:1rem 1.2rem}` 削除（インライン `nav{}` が外部 CSS の ≤900px 規則を読込順で上書きしていたため）
  - PC (≥901px) の padding `1.2rem 2.5rem` は変更なし。3 ページのロゴ位置が 375/414px で完全一致

### SEO Phase 1 完了（2026-04-28）
- meta description / OGP / Twitter Card 追加済み（全4ページ）
- portfolio.html title 重複解消（"Profile — MaroSoundDesign"）
- OGP 画像配置済み（assets/ogp.jpg / 1200×630）
- sitemap.xml / robots.txt 追加済み
- Google Search Console 所有権確認済み・サイトマップ送信済み
- JSON-LD 構造化データ追加済み（index.html: Person+WebSite / portfolio.html: Person）
- Schema.org Validator: エラーなし・警告なし確認済み
- sameAs: X / portfolio.html（Wikipedia・Uta-net は URL確認後に追加予定）

### Performance Phase 1 完了（2026-04-28）— works.html 中心

| フェーズ | 内容 | 対象 |
|---|---|---|
| 1A | Google Fonts を preload+onload で非同期化 | 全4ページ |
| 1B | Inter ウェイトを 800;900 のみに削減（11→5ウェイト） | 全4ページ |
| 1C | カード画像を thumbnail（~20KB）に切替 / `content-visibility:auto` | works.html |
| 1D | Progressive Rendering — 初期22件 + IntersectionObserver 遅延充填 | works.html |
| 1E | `css/style.css` を preload+onload 非同期化 / `*.css` max-age=86400 | works.html + netlify.toml |
| 1F | Inter 900 Latin woff2 を `<link rel="preload">` で先読み | works.html |

#### 最新 PageSpeed Insights（モバイル / 2026-04-28 計測）

| ページ | Performance | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| **works.html** | **67** | 3.9s | 7.2s | 0ms | 0.001 |
| index.html | 61 | — | — | — | — |
| portfolio.html | 59 | — | — | — | — |
| history.html | 65 | — | — | — | — |

#### Phase 1G 調査結果（2026-04-28）— works.html FCP/LCP の残課題

- **TTFB**: warm 0.23s / cold 0.68s（初回アクセスは遅い。HTML `max-age=0` だが Netlify CDN がキャッシュ）
- **works-data.json**: raw 142KB → brotli **13.7KB**（90%圧縮済み）— JSON はボトルネックではない
- **FCP 3.9s の主因**: cold TTFB + DNS/TLS + CPU 4x + `body::after` SVG feTurbulence ノイズフィルタ描画コスト（推定）
- **LCP 7.2s の主因**: FCP+3.3s — Moto G Power 823px viewport では先頭カード画像がビューポート内に収まり、cold image fetch が LCP 候補
- **Noto Sans JP**: CSS 内に 372 woff2 サブセット参照。cold 初回はブラウザが必要サブセットを parallel fetch — これが実質的なフォント遅延要因
- **これ以上の改善**: Noto JP self-host サブセット化・SSR/Edge functions が必要。ポートフォリオサイトとしては費用対効果が低く、**Phase 1 はここで終了が妥当**

---

## 重要注意事項

- **日本語ファイル名は NFD/NFC 問題が起きる**
  - macOS は NFD、Netlify は NFC を期待する場合がある
  - 画像パスは必ず NFC 正規化すること
  - **push 前に `python3 tools/check_image_paths.py` を実行**（OK 表示で通過）
- **selected-works-shared.js と portfolio.html のパス一致が必須**
  - `onclick` 引数と `img src` が selected-works-shared.js のパスと一致しているか確認
- **本番確認では Network タブの画像 404 を必ず確認する**
- **css/style.css の変更後は cache-busting に注意**（max-age=86400 のため、緊急変更時はファイル名を変更）
- **Google Fonts woff2 URL は v20 系で安定**（Inter 900 Latin preload URL: `...UcCO3FwrK3...AZ9hiJ-Ck-8.woff2`）

---

## 関連ドキュメント

| ファイル | 内容 |
|---|---|
| docs/01_RULES.md | 作業ルール |
| docs/02_CHECKLIST.md | push前・ローカル・本番の確認手順 |
| docs/03_PROGRESS.md | リファクタリング進捗ログ |
| docs/04_TROUBLESHOOTING.md | トラブル対応 |

---

## 次回着手候補（優先度順）

| 優先度 | 項目 | 概要 |
|---|---|---|
| 🟢 高 | works.html Phase 1 のスマホ実機体感確認 | 本番反映後、375/390/414px 実機で高速スクロール時の画像後追いが減ったか確認。改善不足なら Phase 2 へ |
| 🟢 高 | works.html スマホ画像後追い改善 Phase 2（実機確認後） | `images/thumbs/` に 240×240 WebP（5-10KB）を生成 → `selected-works-shared.js` または works-data.json に `thumbnail:` を実体化 → `<img sizes="(max-width:600px) 33vw, 200px" srcset="...">` で配信。LCP 大幅改善見込み |
| 🟢 高 | スマホ実機でモーダル下スワイプ動作確認（portfolio / works） | index は確認済み。3 ページ共通の `js/modal-swipe.js` を読み込んでいるので挙動は同一の想定だが要実機確認 |
| 🟠 中 | sameAs 追記 | Wikipedia・Uta-net の実URLが確定したら index.html / portfolio.html の JSON-LD に追加 |
| 🟠 中 | index / portfolio / history の CSS 非同期化 | works.html と同様 preload+onload 化（Phase 1E の横展開）。1ページずつ検証 |
| 🟡 低 | works-data.json キャッシュ緩和 | `max-age=300`（5分）に変更。2回目以降の LCP -200ms 程度。netlify.toml 1行 |
| 🟡 低 | Noto Sans JP 700 / DM Mono 600 バグ確認 | 宣言あるが未ロード。目視で問題なければ対応不要 |
| ⬛ 低 | Noto JP self-host サブセット化 | FCP/LCP 改善期待大だが実装コスト高。ビルドパイプライン要 |
| ⬛ 低 | `body::after` SVG noise 削除 | FCP 改善可能性あるがデザイン変更のため要判断 |

---

## 次回作業時の手順

1. `docs/00_HANDOVER.md`（このファイル）を読む
2. `docs/01_RULES.md` を読む
3. `docs/02_CHECKLIST.md` を読む
4. コード変更は **1目的ずつ**
5. 変更後はローカル確認、必要なら本番確認
