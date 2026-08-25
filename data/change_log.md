# Change Log

- 2026-08-25: HistoryのキャラクターソングからInstrumental 3件を削除
- 2026-08-25: Historyの8作品へ公式・販売ページ由来の96pxジャケット7画像を追加し、POINT表記を公式の`POiNT`へ修正
- 2026-08-25: Shoo「I found love」・TOKYO SWEET PARTY「ハイビスカス」へ公式ジャケット2件を追加し、後者を公式表記へ修正
- 2026-08-25: History全228件を公式照合し、96pxジャケット89件を159作品へ割り当て（未確認69作品はCSS製`NO IMAGE`）
- 2026-08-25: StarLight(上海)「流星ラプソディ」「前向きパーリナイ☆」「恋愛自販機」を公式プレビュー公開日でWorksへ追加し、共通の公式ロゴ画像を追加
- 2026-08-25: 君のメインヒロイン「メロきゅん」、ROOKEY♡ROOKEYS「キミだけショッピングモール (サビver.)」をWorksへ追加し、本画像・サムネイル・元画像を追加
- 2026-08-24: 木苺FRUCTOSE「キミ好き！！」、drop「青春オーケストラ」、MAISY「It’s all right.」をWorksへ追加し、本画像・サムネイル・元画像を追加
- 2026-08-24: 規格外8件の元画像を保管し、7件を600×600px本画像へ再生成（`_hash_works_030.webp`はquality 50で80,000B超のため見送り）
- 2026-08-24: Selected Works規格外3件を600×600px本画像へ統一し、Lienel・雨宮天の元画像を保管
- 2026-07-29: あの日見たラッキースター3作品をWorksへ追加し、本画像・サムネイル・元画像を追加
- 2026-07-29: 星名美怜「Sparkle」をWorksへ追加し、本画像・サムネイル・元画像を追加
- 2026-07-29: ai*ai「めちゃらぶchuchuchu」2件をWorksへ追加し、Historyのai*ai 2件を移行
- 2026-07-29: `_hash_works_036.webp` を同一作品の高解像度元画像から600×600px・quality 82で再生成
- 2026-07-29: 参照中の容量超過本画像16件を最終バッチとして600×600px維持・80,000bytes以下へ再圧縮
- 2026-07-29: 参照中の容量超過本画像10件を第3バッチとして600×600px維持・80,000bytes以下へ再圧縮
- 2026-07-29: 参照中の容量超過本画像10件を第2バッチとして600×600px維持・80,000bytes以下へ再圧縮
- 2026-07-29: 参照中の容量超過本画像10件を600×600px維持・80,000bytes以下へ再圧縮
- 2026-07-29: Selected Works の `_hash_nme_himitsu.webp` を600×600px維持・quality 77で79,568bytesへ再圧縮

## 2026-07-28

- `works-data.json` に2026年5月〜7月公開の8作品を追加
- 本画像600×600px・サムネイル300×300pxのWebPを各8件追加

## 2026-04-16

- データ管理用ディレクトリを追加
- 公開用ファイルと作業用データを分離する運用を開始
- `images/` 内の未使用ファイルを `data/` 配下へ整理
- 元画像は `data/raw/source_images/` へ移動
- 管理用テキストは `data/work/mappings/` へ移動
- 未使用の `.webp` は `data/archive/unused_webp/` へ移動
- `works.html` の作品データを `works-data.json` へ完全移行

## 2026-04-19

### ポップアップ修正
- `selected-works-shared.js` がデプロイフォルダに含まれておらず本番でモーダルが動作しない不具合を修正
- デプロイフォルダ (`2026-04-19_netlify_upload/`) に `selected-works-shared.js` を追加
- デプロイフォルダの `index.html` が古い版だったため最新版に差し替え

### 「嫌いになれない。」画像の紐付け修正
- `selected-works-shared.js` 内のjacketパスを `_hash_portfolio_013.webp` → `_hash_麻倉もも_嫌いになれない。.webp` に修正
- `SELECTED_WORK_JACKET_MAP` の不要エントリを削除
- `selected-works-shared.js` の読み込みに `?v=20260419` を付与してキャッシュ破棄

### モーダル画像表示速度改善
- `index.html` の `openModal()` でグリッドのキャッシュ済み `<img>` を再利用するよう変更
- 反映ファイル: `index.html`

### フッターレイアウト修正（スマホ）
- 480px以下でフッターを縦積みに変更
- 反映ファイル: `index.html`

### 画像リサイズ・最適化
- 700px以上の画像37件を600×600px・quality 82にリサイズ（PIL使用）
- 対象: `_hash_works_*`, `_hash_portfolio_*`, `_hash_nme_himitsu.webp` 等
- 合計サイズ: 約14.8MB → 13.2MB
- 画像統一ルールを `README.md` に追記（フォーマット: WebP、サイズ: 600×600px、quality 82）

### 未使用画像の整理
- 未使用の画像7件を `images/` → `unused_webp/` に移動
  - `_hash_UPローチ_お疲れSUMMERDAY.webp`
  - `_hash_UPローチ_キミ依存シンドローム.webp`
  - `_hash_UPローチ_テノナルホウヘ.webp`
  - `_hash_UPローチ_ドキドキLOVE.webp`
  - `_hash_portfolio_001.webp`
  - `_hash_portfolio_004.webp`
  - `_hash_portfolio_013.webp`（「嫌いになれない」旧jacket）
- デプロイフォルダの同ファイルも削除

---

## 書き方テンプレート

- `YYYY-MM-DD`: 何を追加・差し替え・削除したか
- 反映先: `index.html` / `works.html` / `images/` など
- 補足: 元データの保管場所や差し替え理由
