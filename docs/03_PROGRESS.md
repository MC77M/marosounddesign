# Refactoring Progress

## Phase 1: Security — innerHTML → DOM API
- **works.html**: jacket/credits/year の innerHTML を createElement+textContent+setAttribute に置換
- **portfolio.html**: jacket/credits の innerHTML を同様に置換
- Status: ✅ 完了

## Phase 2: Modal close behavior unification
- **works.html**: `e.target !== overlay` → `e.target.closest('#modal')` に変更
- **portfolio.html**: 同上
- **index.html**: 変更なし（既に closest パターン使用）
- Status: ✅ 完了

## Phase 3A: CSS common file extraction
- **css/style.css**: index.html / portfolio.html 共通 CSS を新規ファイルに抽出（約400行）
- **index.html**: `<link rel="stylesheet" href="css/style.css">` 追加、ページ固有 CSS のみ `<style>` に残す
- **portfolio.html**: 同上
- **works.html**: `<link rel="stylesheet" href="css/style.css">` 追加（`<style>` 内容は変更なし）
- Status: ✅ 完了

## Phase 4A: 日付フォーマット統一
- **selected-works-shared.js**: 日付表記を `YYYY.MM.DD` 形式に統一
- Status: ✅ 完了

## Phase 4B: works カウント確認
- **index.html**: works カウント確認 → 修正不要
- Status: ✅ 完了（修正なし）

## Phase 4C: 不要 preload / fetchpriority 削除
- **index.html** / **portfolio.html**: 不要な `fetchpriority="high"` および preload タグを削除
- Status: ✅ 完了

## Phase 4D: works フィルター軽量化
- **works.html**: `applyFilter` 内の重複 `querySelectorAll` を最適化
- Status: ✅ 完了

## Phase 5: 日本語画像パス NFC 正規化
- **works-data.json**: `jacket` / `thumbnail` パスを NFC 正規化
- **selected-works-shared.js**: jacket パスを NFC 正規化
- **portfolio.html**: `onclick` 引数・`img src` パスを NFC 正規化
- Status: ✅ 完了

## Phase 6: フォルダ整理
- `_dev/` ディレクトリ作成・開発用ファイル移動
- `_archive/` ディレクトリ作成・旧バージョンファイル移動
- Status: ✅ 完了

## Phase 7: docs 整備
- `docs/00_HANDOVER.md` 作成（引き継ぎ）
- `docs/01_RULES.md` 作成（作業ルール）
- `docs/02_CHECKLIST.md` 作成（確認チェックリスト）
- `docs/04_TROUBLESHOOTING.md` 作成（トラブル対応）
- Status: ✅ 完了

## Phase 8: SEO Phase 1A — meta / OGP / Twitter Card 追加
- **index.html** / **works.html** / **portfolio.html** / **history.html**: `meta description` / `og:type` / `og:site_name` / `og:title` / `og:description` / `twitter:card` / `twitter:title` / `twitter:description` を追加
- **portfolio.html**: `<title>` を "宮川麿 — MaroSoundDesign" → "Profile — MaroSoundDesign" に変更（index.html との重複解消）
- Status: ✅ 完了

## Phase 9: SEO Phase 1B — OGP 画像追加
- `data/raw/OGP_image.png`（1729×910）を JPEG 変換し `assets/ogp.jpg` として配置
- **index.html** / **works.html** / **portfolio.html** / **history.html**: `og:image` / `twitter:image` を追加
- Status: ✅ 完了

## Phase 10: SEO Phase 1C — sitemap.xml / robots.txt 追加
- `sitemap.xml`: 全4ページの URL / lastmod / changefreq / priority を記載
- `robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap:` を設定
- Status: ✅ 完了

## Phase 11: SEO Phase 1D — JSON-LD 構造化データ追加
- **index.html**: `Person` + `WebSite` スキーマを `</head>` 直前に挿入
- **portfolio.html**: `Person` スキーマを `</head>` 直前に挿入
- sameAs: `https://x.com/MaroSoundDesign` / `https://marosounddesign.com/portfolio.html`（Wikipedia・Uta-net は URL確認後に追加予定）
- Status: ✅ 完了（sameAs 追記待ち）

## Phase 12: Performance Phase 1A — Google Fonts 非同期化
- **index.html** / **works.html** / **portfolio.html** / **history.html**: Google Fonts CSS 読み込みをレンダリングブロッキングから非同期に変更
- `rel="stylesheet"` → `rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"` に変更
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` を追加
- `<noscript>` フォールバックを追加
- 表示崩れなし・Consoleエラーなし確認済み
- Status: ✅ 完了
