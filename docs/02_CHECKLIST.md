# 02_CHECKLIST.md — 確認チェックリスト

---

## push前チェック

- [ ] `git status` 確認
- [ ] 不要な差分がないか確認
- [ ] HTML / CSS / JS / JSON の文法確認
- [ ] 画像パス存在確認
- [ ] 日本語パス NFC 確認
- [ ] 未追跡画像がないか確認（`git ls-files`）

---

## ローカル確認

### ページ表示
- [ ] index.html
- [ ] works.html
- [ ] portfolio.html
- [ ] history.html

### レスポンシブ
- [ ] PC 表示
- [ ] スマホ表示

### 機能
- [ ] works フィルター
- [ ] works モーダル
- [ ] portfolio Selected Works モーダル

### コンソール
- [ ] Console エラーなし

---

## Netlify 本番確認

### ページ
- [ ] 4ページ表示確認

### データ件数
- [ ] 534 Songs（works.html）
- [ ] works 300件
- [ ] portfolio 12件

### 画像
- [ ] 画像抜けなし
- [ ] Network タブで画像 404 なし

### 機能
- [ ] モーダル正常動作

### コンソール
- [ ] Console エラーなし

---

## SEO 確認（本番デプロイ後）

- [ ] https://marosounddesign.com/sitemap.xml が 200 OK・XML 正常
- [ ] https://marosounddesign.com/robots.txt が 200 OK・Sitemap 参照あり
- [ ] https://marosounddesign.com/assets/ogp.jpg が表示される
- [ ] Google Search Console でサイトマップ送信済み
- [ ] googlea0a2b71118ae6d61.html を削除していない（所有権維持に必須）
