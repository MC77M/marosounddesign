# marosounddesign-site

`marosounddesign.com` 向けの静的サイト（Netlify 公開）。

---

## 本番公開ファイル

| ファイル / フォルダ | 説明 |
|---|---|
| `index.html` | トップページ |
| `works.html` | 楽曲一覧（300件、フィルター付き） |
| `portfolio.html` | プロフィール・Selected Works |
| `history.html` | 2019年以前の作品アーカイブ |
| `works-data.json` | works.html の全楽曲データ |
| `history-data.json` | history.html の経歴データ |
| `selected-works-shared.js` | portfolio.html のモーダル処理・データ |
| `css/style.css` | 共通スタイル |
| `js/modal-swipe.js` | スマホ下スワイプ閉じ処理 |
| `assets/ogp.jpg` | OGP 画像（1200×630） |
| `images/` | 公開用画像（WebP 600×600px） |
| `netlify.toml` | Netlify 配信設定 |
| `sitemap.xml` | 全4ページ登録済み |
| `robots.txt` | 全クローラー許可・sitemap 参照 |
| `googlea0a2b71118ae6d61.html` | Google Search Console 認証（**削除禁止**） |

---

## 開発用ファイル

| ファイル / フォルダ | 説明 |
|---|---|
| `_dev/no_cache_server.py` | ローカル確認サーバー |
| `tools/check_image_paths.py` | NFD/NFC・404チェック（push 前に実行） |
| `docs/` | 作業ルール・進捗・チェックリスト・トラブル対応 |
| `data/` | 素材管理（raw → work → output → images/） |
| `_archive/` | 旧バージョンスナップショット |

---

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
3. 変換コマンド例（PIL 使用）:
   ```python
   from PIL import Image
   img = Image.open("input.jpg").resize((600, 600), Image.LANCZOS)
   img.save("_hash_アーティスト_楽曲名.webp", "webp", quality=82, method=6)
   ```

---

## 素材管理フロー

1. 受け取った素材を `data/raw/` に保存
2. 加工中データを `data/work/` で編集
3. 採用した画像やメモを `data/output/` にまとめる
4. 公開するものだけ `images/` と HTML に反映
5. 古い版は `data/archive/` に移す
6. 作業履歴は `data/change_log.md` に残す

---

## 命名ルール

- 日付は `YYYY-MM-DD`
- バージョンは `v01`, `v02` のように付与
- 例: `2026-04-16_top_hero_v01.psd`
- 例: `2026-04-16_works_jacket_list_v02.csv`
