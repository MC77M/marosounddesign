# 04_TROUBLESHOOTING.md — トラブル対応

---

## 画像が本番だけ表示されない

### 原因候補

- 画像が Git 未追跡
- JSON 内パスと実ファイル名の大小文字違い
- 日本語ファイル名の NFD/NFC 不一致
- Netlify / CDN キャッシュ

### 確認手順

1. Network > Img タブで 404 確認
2. `works-data.json` / `selected-works-shared.js` の `jacket` / `thumbnail` パス確認
3. 実ファイルの存在確認
4. `git ls-files | grep <ファイル名>` で追跡確認
5. Python で NFC 確認:
   ```python
   import unicodedata
   print(unicodedata.normalize('NFC', '<ファイル名>'))
   ```

---

## 画像は出るがモーダルが開かない

### 原因候補

- `onclick` 側のパスと `selected-works-shared.js` 側のパス不一致
- NFD/NFC 不一致
- JS 構文エラー
- 古い本番 JS キャッシュ

### 確認手順

1. Console の赤エラーを確認
2. `selected-works-shared.js` のパスを確認
3. `portfolio.html` の `onclick` 引数と `img src` を確認
4. 本番の JS ファイルが最新か確認（ハードリロード: Cmd+Shift+R）
