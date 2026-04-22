# HP_File

このフォルダは `marosounddesign.com` 向けの静的サイト作業用です。

## 現在の公開ファイル

- `index.html`: トップページ
- `works.html`: 作品一覧ページ
- `works-data.json`: `works.html` が読み込む作品データ
- `portfolio.html`: ポートフォリオ構成ページ
- `images/`: 公開で使う画像
- `netlify.toml`: Netlify 配信設定
- `no_cache_server.py`: ローカル確認用サーバー

## データ管理ルール

公開中のファイルと、作業中のデータを分けて管理します。

- `images/` は公開用だけを置く
- 画像差し替え時は、差し替え前の公開画像に合わせてサイズ・解像度・形式を揃える
- 加工前や調整中の素材は `data/` 配下で管理する
- 元データは上書きしない
- 作業履歴は `data/change_log.md` に残す

## 推奨フロー

1. 受け取った素材を `data/raw/` に保存
2. 加工中データを `data/work/` で編集
3. 採用した画像やメモを `data/output/` にまとめる
4. 公開するものだけ `images/` と HTML に反映
5. 古い版は `data/archive/` に移す

## 画像ルール

| 項目 | 規定 |
|---|---|
| フォーマット | **WebP のみ** |
| ピクセルサイズ | **600×600px**（正方形） |
| ファイルサイズ | **80KB 以下を目安**（quality 82） |
| アスペクト比 | **1:1**（object-fit:cover で表示のため） |
| ファイル名 | `_hash_{アーティスト名}_{楽曲名}.webp` |

### 画像追加・差し替え時の手順

1. 元画像を `data/raw/` に保存
2. 600×600px・WebP quality 82 に変換して `images/` に配置
3. 変換コマンド例（PIL使用）：
   ```python
   from PIL import Image
   img = Image.open("input.jpg").resize((600,600), Image.LANCZOS)
   img.save("_hash_アーティスト_楽曲名.webp", "webp", quality=82, method=6)
   ```

## 命名ルール

- 日付は `YYYY-MM-DD`
- バージョンは `v01`, `v02` のように付与
- 例: `2026-04-16_top_hero_v01.psd`
- 例: `2026-04-16_works_jacket_list_v02.csv`

## メモ

今のサイトは HTML 内に作品データを直接持っているため、更新時は HTML と素材管理の両方を意識すると安全です。
今後必要であれば、作品データを CSV や JSON に分離する構成にも移行できます。

`works.html` の作品追加は、今後は基本的に `works-data.json` を更新します。
