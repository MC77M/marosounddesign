# Refactoring Progress

## Chore 2026-04-29 (15): claude.md → CLAUDE.md 正規化・HANDOVER.md参照行追加
- 目的: git 追跡名を Claude Code の正式ファイル名 `CLAUDE.md` に統一
- 修正: `AGENTS.md` / `CLAUDE.md`（旧 `claude.md`）のみ（内容変更なし・rename のみ）
  - `git mv claude.md CLAUDE.md`（macOS case-insensitive 問題を git レベルで解消）
  - `AGENTS.md` / `CLAUDE.md` 両方に未コミット差分「最初に/docs/00_HANDOVER.mdを確認する」を追加
- 不変項: HTML / CSS / JS / JSON / 画像 / その他すべて変更なし
- 確認:
  - `git ls-files | grep -i claude` → `CLAUDE.md` のみ（`claude.md` 消滅） ✅
  - diff が HANDOVER.md参照行のみ（rename 92%） ✅
- Status: ✅ 完了（commit be00daa / push 済み）

## Chore 2026-04-29 (14): _archive/2026-04-19_netlify_upload を削除
- 目的: 本番から参照されていない旧スナップショットを削除してリポジトリを軽量化
- 事前確認: index.html / works.html / portfolio.html / history.html / works-data.json / history-data.json / selected-works-shared.js / css/ / js/ すべてで `_archive` 参照 0 件確認済み
- 修正: `git rm -r _archive/2026-04-19_netlify_upload/`（579 ファイル削除・12,444 行削減）
- 不変項: 本番ファイル・画像・設定すべて変更なし
- 確認:
  - `git diff --cached --name-status` で `_archive/` 外の削除 0 件 ✅
  - `git ls-tree -r HEAD _archive` が空 ✅
- Status: ✅ 完了（commit 9fbed2d / push 済み）

## Docs 2026-04-29 (13): README / .gitignore 整理 Phase 1
- 目的: README を現状構成に合わせ更新、.gitignore に素材ディレクトリを追加
- 修正: `README.md` / `.gitignore` のみ（HTML/CSS/JS/JSON/画像は変更なし）
  - `README.md`: `no_cache_server.py` のルート記述を削除、`history.html` / `css/` / `js/` / `assets/` / `docs/` / `tools/` / SEO ファイル群を追記、「HTMLに直接データを持っている」旧メモを削除
  - `.gitignore`: `data/work/tmp/` / `data/archive/tmp/` を削除し `data/raw/` / `data/work/` / `data/output/tmp/` / `data/output/mappings/` を追加
- 不変項: HTML / CSS / JS / JSON / 画像 / `_archive/` / `googlea0a2b71118ae6d61.html` はすべて変更なし
- 確認:
  - 変更ファイルが `README.md` / `.gitignore` / `docs/03_PROGRESS.md` のみ ✅
  - `data/raw/OGP_image.png` が untracked から消えた ✅
- Status: ✅ 完了

## Perf 2026-04-28 (12): works.html スマホ画像後追い改善 Phase 1
- 目的: スマホ高速スクロール時のカード画像後追い表示を低リスク調整で改善
- 修正: `works.html` のみ
  - `ioFill` の `rootMargin` を `600px 0px` → `1200px 0px`（高速フリック時の DOM 生成余裕を拡大）
  - card `<img>` に `width="600" height="600"` 属性付与（CLS 抑制 / 早期レイアウト確定）
  - card `<img>` の `loading="lazy"` → `loading="eager"`（IO 既ゲートのため二段 lazy 解消）
  - `fillYear` で `isInitialYear = year === years[0]` を判定し、初期表示年の先頭 3 枚のみ `fetchpriority="high"` 付与
- 不変項: 画像生成なし / `thumbnail` フィールド追加なし / JSON / CSS / モーダル仕様 / Progressive Rendering 構造すべて変更なし
- 確認:
  - 375px / 390px / 414px で初期表示 22 枚 (2026) すべて `loading="eager"` `width="600"` `height="600"` ✅
  - 先頭 3 枚のみ `fetchpriority="high"`、4 枚目以降は付与なし ✅
  - スクロールで 2025 (77) / 2024 (50) / 2023 (40) が IO 起動で順次 fillYear ✅
  - Console エラーなし / 404 なし ✅
- Status: ✅ 完了

## Fix 2026-04-28 (11): index.html スマホ版フッターの折り返し・文字間崩れ修正
- 症状: 480px 以下で `© 2025 宮川麿. All rights reserved.` が不自然に折り返され、文字間が広く見える
- 修正: `index.html` `<style>` 内 `@media(max-width:480px)` のみ
  - `footer` を `align-items:center;justify-content:center;text-align:center` に変更（左寄せ→中央寄せ）
  - `padding:1.6rem 1rem` で横余白を縮小
  - `.ft-copy` に `letter-spacing:.04em;white-space:nowrap;font-size:.6rem;line-height:1.4` を追加し1行表示
- 不変項: HTML 構造・文言・PC/タブレット表示・JS は変更なし
- 確認:
  - 375px / 414px で `.ft-copy` 高さ 13.4px = 1行・横スクロールなし ✅
  - Console エラーなし ✅
- Status: ✅ 完了

## Perf 2026-04-28 (10): works.html openModal で jacket 読み込みを最大 250ms 待機
- 目的: 画像なしモーダルが先に開いて jacket が遅れて表示される体感を改善
- 修正: `works.html` のみ
  - `waitForJacket(src, timeoutMs)` を追加（`Image()` の onload/onerror または `setTimeout` 早い方で resolve、`img.complete` で即解決）
  - `openModal()` 冒頭で `if (w.jacket) await waitForJacket(w.jacket, 250)` を 1 行追加
- 不変項: thumbnail / モーダル HTML / CSS / フィルター / 年別 lazy fill すべて変更なし、全件 preload なし
- 確認:
  - キャッシュ済み jacket: waitForJacket 5ms / openModal 全体 1ms ✅
  - 250ms 上限が機能（早期 resolve も含めキャップ） ✅
  - モーダル表示時 `#modalJacket img` に src 反映確認 ✅
  - Console エラーなし / 404 なし ✅
- Status: ✅ 完了

## Perf 2026-04-28 (9): works.html 初期表示年 jacket の idle 先読み
- 目的: 初期表示中の最新年カードに対し、ブラウザ idle 時間で jacket を低優先 preload しモーダル表示遅延を更に解消
- 修正: `works.html` のみ
  - `preloadInitialYearJackets()` を追加（`years[0]` のみ対象、`requestIdleCallback` 優先・未対応時は `setTimeout(800ms)` フォールバック）
  - `renderWorks()` 末尾に呼び出しを 1 行追加
- 不変項: thumbnail 表示 / モーダル jacket / フィルター / 年別 lazy fill / CSS / デザイン すべて変更なし
- 全 300 件は先読みしない（最新年=2026 の 22 件のみ）
- 確認:
  - 初期描画後に 22 件の jacket webp が 200 で取得 ✅
  - 他年の jacket は 0 件（lazy fill 維持） ✅
  - Console エラーなし / Network 404 なし ✅
- Status: ✅ 完了

## Perf 2026-04-28 (8): works.html モーダル jacket 画像の hover/touchstart 先読み
- 目的: 一覧 thumbnail → モーダル jacket 表示時の遅延を解消
- 修正: `works.html` のみ
  - `safeAssetSrc` 直下に `preloadedJackets` Set と `preloadJacket(idx)` を追加（`new Image()` で非同期取得、重複抑止）
  - wcard テンプレートに `onmouseenter="preloadJacket(${index})"` `ontouchstart="preloadJacket(${index})"` を追加
- 不変項: CSS / openModal / フィルター / 年別 lazy fill / thumbnail 化 / モーダルデザイン すべて変更なし
- 確認:
  - hover/touchstart で jacket リソース（例: SAKURA GRADUATION jacket.webp）が Network に出現 ✅
  - Console エラーなし ✅
  - jacket 関連 Network 404 なし ✅
- Status: ✅ 完了

## Hotfix 2026-04-28 (7): スマホ版ヘッダーロゴ位置を index/portfolio に揃える（works.html）
- 症状: スマホ表示で works.html のロゴが index/portfolio より右下にズレる（375/390/414px で再現）
- 原因: works.html インライン `<style>` に `nav{padding:1.2rem 2.5rem}` があり、外部 `css/style.css` の `@media(max-width:900px){nav{padding:1rem 1.4rem}}` を CSS 読み込み順で上書き。works.html だけ ≤600px 用の `nav{padding:1rem 1.2rem}` で別値になっていた
- 修正: works.html の `<style>` 内
  - 削除: `@media(max-width:600px)` 内の `nav{padding:1rem 1.2rem}`（index/portfolio に存在しない works.html 固有値）
  - 追加: `@media(max-width:900px){nav{padding:1rem 1.4rem}}`（shared CSS と同値、インライン上書き対策）
- 確認:
  - 375px: padding `16px 22.4px` / logoLeft 22.4 → 3 ページ完全一致 ✅
  - 414px: padding `16px 22.4px` ✅
  - 1280px: padding `19.2px 40px`（PC は変化なし） ✅
  - 横スクロールなし、Console エラーなし ✅
- Status: ✅ 完了

## Hotfix 2026-04-28 (6): works.html ヘッダーロゴが横一列になる表示崩れを修正
- 症状: works.html の左上ロゴ `MaroSoundDesign` が 1 行で横長表示、index.html / portfolio.html と不一致
- 原因: works.html:263 の `.nav-logo` 内に `<br>` が抜けていた
  - index.html:144 / portfolio.html:100 → `Maro<br><span>Sound</span>Design`
  - works.html:263 → `Maro<span>Sound</span>Design`
- 修正: works.html の該当 1 行に `<br>` を 1 つ追加（最小差分）
- 確認: PC/mobile プレビュー両方で width 103px / height 32px の 2 行表示、Console エラーなし
- Status: ✅ 完了

## Feature 2026-04-28 (5): スマホモーダル 下スワイプ閉じを portfolio.html / works.html へ横展開
- 編集: `portfolio.html` 325 行目直後・`works.html` 324 行目に `<script src="js/modal-swipe.js?v=20260428" defer></script>` を 1 行ずつ追加
- 既存 JS / CSS / HTML は一切変更なし（script タグ追加のみ）
- 既存挙動の保全: overlay クリック / close ボタン / Escape / open 時 transform 遷移すべて維持
- 確認: mobile プレビュー (375x812) で両ページの touch 合成イベント検証
  - portfolio.html: 120px 下スワイプで閉じる ✅ / 30px で閉じず inline クリア ✅
  - works.html: 120px 下スワイプで閉じる ✅ / 30px で閉じず inline クリア ✅
  - Console エラーなし ✅
- Status: ✅ 完了（3 ページすべて対応）

## Feature 2026-04-28 (4): スマホモーダル 下スワイプで閉じる（index.html 限定先行導入）
- 追加: `js/modal-swipe.js`（共有スクリプト、touchstart/move/end 監視・閾値 80px・上方向ドラッグ無視・PC操作非干渉）
  - `.modal-handle` または `modal.scrollTop===0` のときのみドラッグ開始 → モーダル内スクロールと干渉しない
  - 下方向ドラッグ中のみ `transform: translateY(dy)` を inline 付与、`transition: none`
  - 80px 以上で `window.closeModal()`（無ければ overlay の `.open` 解除 + body overflow 復元）
  - 閾値未満は inline スタイルをクリアして CSS の元位置に戻す
- 編集: `index.html` 372 行目に `<script src="js/modal-swipe.js?v=20260428" defer></script>` 1 行のみ追加
- 既存挙動の保全: overlay クリック / close ボタン / Escape / open 時の transform 遷移すべて維持
- 確認: mobile プレビュー (375x812) で touch 合成イベントによる検証
  - 120px 下スワイプ → modal 閉じる、inline style 完全クリア、body.overflow 復元 ✅
  - 30px 下スワイプ → modal は閉じず inline style クリア ✅
  - 100px 上スワイプ → 何も起きない（transform 付与なし） ✅
  - Console エラーなし ✅
- 未対応: portfolio.html / works.html へは未展開（動作確認後に別タスクで横展開予定）
- Status: ✅ 完了（index.html のみ）

## Hotfix 2026-04-28 (3): 画像パス NFC チェックスクリプト導入（再発防止）
- 追加: `tools/check_image_paths.py`
  - 対象: index.html / portfolio.html / works.html / history.html / selected-works-shared.js / works-data.json / history-data.json
  - 検出: NFD 形式パス / 実ファイル無し / Git 未追跡 / NFD-NFC 重複ファイル
  - エラー 0 件で `OK  Image path check passed` を表示し exit 0
- 更新: `docs/02_CHECKLIST.md` push 前チェックに `python3 tools/check_image_paths.py` を追加
- 更新: `docs/04_TROUBLESHOOTING.md` NFD/NFC 不一致の見分け方と全参照元リストを追記
- 確認: 現状でエラー 0 件、サイト本体（HTML/CSS/JS/JSON）に変更なし
- Status: ✅ 完了

## Hotfix 2026-04-28 (2): Selected Works の Lienel 画像が本番で表示されない
- 症状: Selected Works の Lienel_じれったいKISS だけ本番で 404 → alt の "jacket" 表示
- 原因: index.html 296-297 行のファイル名 "じ" が NFD 形式（し+゛, e3 81 97 e3 82 99）。Netlify 上のファイルは NFC（じ, e3 81 98）。リクエスト不一致で SPA フォールバック (text/html) を返却
- 修正: 該当 2 行のみ NFC 正規化（最小差分）
- 確認: 該当行が `e3 81 98 e3 82 8c e3 81 a3 e3 81 9f e3 81 84` (NFC じれったい) になったこと、他文字列に変更なし
- Status: ✅ 完了

## Hotfix 2026-04-28: index.html スマホ表示崩れ修正
- 症状: スマホ幅 (≤390px) で About/Profile セクションの本文が右端に細く押し出され縦書き状態
- 原因: index.html inline `<style>` の `@media(max-width:900px)` が `.about-grid` を 2 カラム固定し、style.css 側 780px 単カラム化ルールを上書き
- 修正: `.about-grid` の 2 カラム指定を `@media (min-width:781px) and (max-width:900px)` に限定（index.html のみ、最小差分）
- 確認: 375/390/414px で単カラム化、横スクロールなし、コンソールエラーなし
- Status: ✅ 完了

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

## Phase 13: Performance Phase 1B — Google Fonts Inter ウェイト削減
- **index.html** / **works.html** / **portfolio.html** / **history.html**: Inter のウェイト指定を `300;400;500;700;800;900` → `800;900` に変更
- 調査の結果 Inter は 800・900 のみ実使用、300〜700 は未使用と確認
- Noto Sans JP・DM Mono は変更なし（全ウェイト使用中）
- 11ウェイト → 5ウェイト（フォント CSS ダウンロード量約 55% 削減）
- 表示崩れなし・Consoleエラーなし確認済み
- Status: ✅ 完了

## Phase 14: Performance Phase 1C — works.html 画像最適化
- **works.html** L495: カード画像ソースを `work.jacket` → `work.thumbnail || work.jacket` に変更
  - thumbnail（~20KB, 300px）を使用、jacket（~50KB, 600px）はモーダルのみ継続使用
  - 300枚分で推定 ~9MB のダウンロード削減
- **works.html** L139: `.yr-block` に `content-visibility:auto;contain-intrinsic-size:0 600px` を追加
  - ビューポート外の年別ブロックのレンダリングをブラウザがスキップ
- カード画像 thumbnail 使用確認済み・モーダル jacket フルサイズ確認済み
- フィルター（J-POP: 281件表示 / ALL: 300件）・モーダル正常確認済み
- Consoleエラーなし・Network 404 なし確認済み
- Status: ✅ 完了

## Phase 15: Performance Phase 1D — works.html Progressive Rendering
- **works.html**: 300件一括 DOM 生成を年別スケルトン先行 + IntersectionObserver 遅延充填に変更
  - `buildGrouped()`: グループ化・ソートをモジュール変数に格納
  - `renderSkeletons()`: 全年の空 yr-block を先行 innerHTML（ID アンカー確保）
  - `fillYear(year)`: 1年分のカードを `.works-grid` に挿入、`filledYears` で二重充填防止
  - `initFillObserver()`: `ioFill`（rootMargin:600px）で残り年を遅延充填
  - `fw()`: 非 ALL フィルター時に全 pendingYears を同期 flush してから applyFilter
- 初期 DOM: 22件（2026年のみ） / 残り278件は IntersectionObserver でスクロール時に充填
- 年別ナビ（#yr2026〜#yr2020）・フィルター全種・openModal・コンソールエラーなし 確認済み
- Status: ✅ 完了（Lighthouse 再測定は別途実施）

## Phase 16: Performance Phase 1E — works.html CSS 非同期化 + CSS キャッシュ
- **works.html** L23: `<link rel="stylesheet" href="css/style.css">` を `<link rel="preload" ... as="style" onload="...rel='stylesheet'">` + `<noscript>` フォールバックに変更
  - 22 KB の外部 CSS が render-blocking だった問題を解消（インライン `<style>` がファーストビューをカバー）
- **netlify.toml**: `*.css` 用ヘッダブロックを追加（`Cache-Control: public, max-age=86400`）
  - これまで `*.css` は汎用 1h キャッシュにフォールバックしていた → 24h に延長
- 検証: works.html 初期表示・カード（22→300件）・フィルター（J-POP 281件）・モーダル・Console エラーなし 確認済み
- 適用範囲: works.html のみ。他ページ（index/portfolio/history）への横展開は別フェーズで判断
- Status: ✅ 完了

## Phase 17: Performance Phase 1F — works.html Inter 900 font preload
- **works.html** L21直下: `<link rel="preload" href="https://fonts.gstatic.com/s/inter/v20/...woff2" as="font" type="font/woff2" crossorigin>` を追加
  - LCP 要素 `<h1 class="page-title">Works</h1>` は Inter 900 のみ使用（38.4px / area 21,774 sq px）
  - Google Fonts CSS 到着→woff2 URL 発見という連鎖を断ち切り、HTML parse 直後にフォント DL を開始
  - Latin subset のみ（"Works" は純 Latin）、24 KB / cache 1年
- ローカル検証: t=16ms で Inter 900 woff2 が preload fetch 開始・表示崩れなし・Console エラーなし 確認済み
- 本番 PageSpeed 測定後に効果を判断（効果薄ければ revert 候補）
- Status: ✅ 実装済（PageSpeed 再測定待ち）
