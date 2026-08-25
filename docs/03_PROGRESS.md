# Refactoring Progress

## Feature 2026-08-25: History ジャケット対応
- 対象: History 228件
- 割り当て: 169作品／重複除外98画像（96×96 WebP、8,000B以下）
- 未確認: 59作品はCSS製`NO IMAGE`を表示
- 運用: 元画像は外部保管し、出典URL・SHA-256・割り当てを`data/history_artwork_sources.json`で管理
- 表示: 既存の行高・文字位置を維持し、画像はlazy loading
- Status: ✅ 実装・検証完了

## Docs 2026-08-25: 現在状態へ同期
- ページ構成: 6ページ
- データ件数: Works 322件 / History 228件 / 合計550 Songs / Selected Works 12件
- 最新Works: 君のメインヒロイン・ROOKEY♡ROOKEYS・StarLight(上海)の計5件まで反映済み
- Status: ✅ 最新データへ同期

## Research 2026-08-25: 2019年以前の作品 外部情報照合
- 対象: History 228件をWeb・X（旧Twitter）・YouTubeで検索し、アーティストと曲名の組み合わせを照合
- 表記修正: 平成琴姫「通りゃんせ～初恋胸キュンキュン～」、SEVEN4「スキスキスキ」
- 外部確認済み: The Triple Clowns 6曲、NEVA GIVE UP「永遠のハッピーアワー」、Maria「VIVA Revolution」、あにまどーる「いえっさーぱんだ」
- 未確認9曲: Nina Pelea「Break Down」「恋のはじまり」、Dear L mana「Everyday 君が好き」、柊木りお「でりゅーじょん」、ハニースパイス「story」、CLOVERxCLOVER「CRYING GIRL」、マイ・チェリーボーイズ「パラダイス」「only you」「Kixx me」
- 方針: 未確認曲も不存在とは判断せず現状維持。将来、同一作品の根拠・ジャケット画像を入手した場合にWorks掲載を再検討し、今回の削除・整理対象から除外する
- Status: ✅ 調査完了・保留

## Ops 2026-07-28: Contact / Netlify Forms 本番運用確認
- 対応: Form detection有効化、`contact`フォーム認識、メール通知設定、旧Contact導線を`contact.html`へ統一
- 通知表示: 項目名を短い日本語表記へ変更、`All`→`すべて / 全般`、Privacy同意→`同意済み`
- キャッシュ対策: `js/contact.js?v=20260728`へ更新
- 本番確認: 送信成功、成功表示、submission追加、通知メール受信、Privacy値`同意済み`、Consoleエラーなし
- 残作業: テストsubmission 3件は未削除
- Status: ✅ 完了・本番反映済み

## Feature 2026-05-04: Privacy Policy ページ新規追加
- 目的: contact.html のプライバシーポリシーリンク先を作成
- 追加ファイル:
  - `privacy.html` — プライバシーポリシー本体（style.css 流用 + `<style>` 内ページ固有CSS、pv- プレフィックス）
- 変更ファイル:
  - `contact.html` — プライバシーポリシーリンクを `href="privacy.html" target="_blank" rel="noopener noreferrer"` に変更
  - `sitemap.xml` — privacy.html エントリ追加（priority 0.3）
- 内容: 個人情報の取り扱い / 収集する情報 / 利用目的 / 第三者への提供 / 安全管理 / お問い合わせ / 改定について（全7項目）
- 収集情報: お名前 / メールアドレス / 会社名・所属（任意） / ご相談の種類 / ご予算感（任意） / 希望納期（任意） / お問い合わせ内容
- 施行日: 2026-05-04
- 不変項: js/contact.js / css/contact.css / css/style.css / 既存ページ / Netlify Forms設定 すべて変更なし
- 確認: PC(1280px)/モバイル(375px) 表示確認済み、リンク接続確認済み
- Status: ✅ 完了・本番反映済み

## Style 2026-05-04: Contact モバイルレイアウト微調整
- 目的: モバイルでの hero-sub 改行位置と hero→form 間の余白を改善
- 修正:
  - `css/contact.css`: hero-sub に `flex-wrap: wrap` 追加、`.nowrap` ルール追加
  - `contact.html`: 「Mixing & Mastering」span に `class="nowrap"` 追加
  - `css/contact.css`: モバイル(≤900px) `.ct-section-label` margin-top `4.5rem` → `3.25rem`
- 不変項: PC表示 / js/contact.js / Netlify Forms設定 すべて変更なし
- 確認: PC(1280px)/モバイル(375px) 表示確認済み
- Status: ✅ 完了・本番反映済み

## Feature 2026-05-04: Contact Form ページ新規追加
- 目的: Google Forms外部遷移を廃止し、サイト内完結のお問い合わせフォームを設置
- ソース: `_AddContacForm/Contact Form.html`（React+Babel製プロトタイプ）をバニラHTML/CSS/JSに変換
- 追加ファイル:
  - `contact.html` — Contactページ本体（既存ナビ/フッター使用）
  - `css/contact.css` — Contact専用スタイル（ct-プレフィックス、既存変数マッピング）
  - `js/contact.js` — フォーム制御・バリデーション・Netlify Forms送信
- 変更ファイル:
  - `sitemap.xml` — contact.html エントリ追加（priority 0.7）
  - `docs/00_HANDOVER.md` — 主要ページ表・ファイル表に追記
- 不変項: index.html / works.html / portfolio.html / history.html / css/style.css / 既存JS すべて変更なし
- 設計方針:
  - フォント: Inter に統一（Figtree不使用）
  - カラー: 既存 --pink/--purple/--blue にマッピング
  - CSSクラス: ct- プレフィックスで衝突回避
  - Budget/Deadline: 任意項目（必須は name/email/category/message/privacy）
  - 送信: Netlify Forms（honeypot spam対策込み）
  - 成功画面: SuccessOrb（ページ内表示、遷移なし）
  - セキュリティ: innerHTML不使用、textContent/DOM APIのみ
- デプロイ後タスク:
  - Netlify管理画面 → Forms → contact → Notifications で通知先メールアドレスを設定する
  - ~~プライバシーポリシーページの作成~~ → 完了（privacy.html として作成済み）
- Status: ✅ 完了・本番反映済み（実ブラウザ検証済み: 1440px/900px/375px）

## Style 2026-05-04: Contact ページ UI バランス調整（既存サイト統一）
- 目的: Contact ページの後付け感を減らし、既存 index/works/portfolio/history と同じトーンに寄せる
- 修正: `css/contact.css` のみ
- 装飾調整:
  - 送信ボタン: padding `.75rem 2rem`、default shadow 削除、hover を既存 `.btn-fill:hover` と統一
  - Back ボタン: padding `.6rem 1.5rem`（SEND より控えめに）、テキスト「Back · 戻る」→「Back」に簡略化
  - チップ active shadow: `0 8px 20px` → `0 4px 12px`（既存 `.tag:hover` と同等に）
  - OK 表示: CSS で `display:none`（エラー時のみ赤表示、左サイドの進捗は維持）
  - パルスドット: 緑 → 紫系 `var(--purple)` に変更（サイトパレットに統一）
  - 成功 Orb: 140px → 88px、shadow 縮小、回転 8s → 12s、チェックマーク 3.5rem → 2rem
  - receipt ボックス: border-radius 18px → 12px、shadow を既存カードと統一
  - sending overlay: spinner 72px → 48px、blur 12px → 8px
- フォントバランス調整:
  - Contact ロゴ: `clamp(3.5rem,8vw,6.5rem)` → `clamp(2.8rem,6.5vw,4.8rem)`（works page-title 級に）
  - mobile ロゴ: `clamp(2.25rem,12vw,3.5rem)` → `clamp(2rem,12vw,2.8rem)`
  - input/select: `1.05rem` → `.92rem`（既存本文 `.92rem` と統一）
  - textarea: `1rem` → `.88rem` / date: `.94rem` → `.88rem`
  - side title: weight `900` → `800`（既存 sec-title と統一）
  - SEND ボタン: `.65rem` → `.68rem`（既存 `.btn` と統一）
  - BACK ボタン: `.65rem`（SEND `.68rem` との段差維持）
  - 英字ラベル / kicker / section-label: `.65rem` → `.6rem`（既存 eyebrow と統一）
  - チップ: `.65rem` → `.6rem`（既存 `.tag` と統一）
  - mobile input/textarea/select: `1rem` → `.88rem`
- 変更ファイル: `css/contact.css` / `contact.html`（Back ボタンテキストのみ）
- 不変項: js/contact.js / css/style.css / 既存ページ / Netlify Forms設定 すべて変更なし
- 確認: PC(1280px)/モバイル(375px) 表示確認済み、console エラーなし、Netlify Forms属性維持
- Status: ✅ 完了・本番反映済み

## Style 2026-05-04: Contact hero→form 間の余白調整
- 目的: PC表示でheroとフォームセクションの間が詰まって見える問題を解消
- 修正: `css/contact.css` `.ct-section-label` margin-top `4.5rem` → `6rem`、モバイル(≤900px)では `4.5rem` を維持
- 不変項: contact.html / works.html / css/style.css / js/contact.js すべて変更なし
- 確認: PC/モバイル表示確認済み
- Status: ✅ 完了・本番反映済み

## Style 2026-05-04: Contact ヘッダーを Works ページヘッダーに統一
- 目的: Contact ページ上部の後付け感を減らし、Works と同じトーンに揃える
- 修正:
  - `css/contact.css`: `.ct-hero` padding-top `10rem` → `8rem`、`.ct-hero-title` font-size `clamp(2.8rem,6.5vw,4.8rem)` → `clamp(2.4rem,6vw,4rem)`、`.ct-title-wrap` / `.ct-hero-echo` 削除、モバイル独自サイズ指定削除
  - `contact.html`: `ct-hero-echo` span 削除、`ct-title-wrap` div 削除
- 維持: Contact見出しグラデーション・サブラベル・説明文・フォーム構造・Netlify Forms設定
- 不変項: works.html / css/style.css / js/contact.js / 既存ページ すべて変更なし
- 確認: PC(1280px)/モバイル(375px) 表示確認済み
- Status: ✅ 完了・本番反映済み

## Copy 2026-05-04: Contact フォーム下部の英語併記削除・返信目安控えめ化
- 目的: フォーム下部の実用エリアを軽くし、英語装飾を削減
- 修正:
  - `contact.html`: プライバシー同意文の英語併記削除、返信目安の英語併記削除、ボタン文言を SEND INQUIRY に復元
  - `css/contact.css`: `.ct-submit-meta` を font-size `.55rem` / letter-spacing `.15em` / text-transform `none` / font-weight `400` に変更
- 不変項: SEND INQUIRY / BACK ボタン文言・js/contact.js・Netlify Forms設定・既存ページ すべて変更なし
- 確認: PC(1280px)/モバイル(375px) 表示確認済み
- Status: ✅ 完了・本番反映済み

## Chore 2026-04-29 (15): claude.md → CLAUDE.md 正規化・HANDOVER.md参照行追加
- 目的: git 追跡名を Claude Code の正式ファイル名 `CLAUDE.md` に統一
- 修正: `AGENTS.md` / `CLAUDE.md`（旧 `claude.md`）のみ（内容変更なし・rename のみ）
  - `git mv claude.md CLAUDE.md`（macOS case-insensitive 問題を git レベルで解消）
  - `AGENTS.md` / `CLAUDE.md` 両方に「最初に/docs/00_HANDOVER.mdを確認する」を追加
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
