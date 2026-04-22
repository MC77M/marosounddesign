# Change Log

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
