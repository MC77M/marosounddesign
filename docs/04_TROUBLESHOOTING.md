# 04_TROUBLESHOOTING.md — トラブル対応

---

## 画像が本番だけ表示されない

### 原因候補

- 画像が Git 未追跡
- JSON 内パスと実ファイル名の大小文字違い
- 日本語ファイル名の NFD/NFC 不一致
- Netlify / CDN キャッシュ

### 確認手順

1. **まず `python3 tools/check_image_paths.py` を実行**（NFD/未存在/Git未追跡/NFD-NFC重複を一括検出）
2. Network > Img タブで 404 確認
3. `works-data.json` / `history-data.json` / `selected-works-shared.js` / `index.html` / `portfolio.html` の `jacket` / `thumbnail` / `img src` / `onclick` パス確認
4. 実ファイルの存在確認
5. `git ls-files | grep <ファイル名>` で追跡確認
6. Python で NFC 確認:
   ```python
   import unicodedata
   print(unicodedata.normalize('NFC', '<ファイル名>'))
   ```

### NFD/NFC 不一致の見分け方

- macOS で日本語ファイル名を Finder からドラッグして HTML/JSON に貼り付けると NFD（し+゛ など）になることがある
- ローカル開発環境（macOS）では NFD でも 200 を返すが、Netlify では NFC ファイル名と一致せず SPA フォールバック（text/html, ~23KB）が返る
- 該当行のバイトを確認:
  ```bash
  grep "問題のファイル名" index.html | xxd | head
  ```
  `e3 81 97 e3 82 99` = し+゛（NFD じ）、`e3 81 98` = じ（NFC）。
- 全参照元（`index.html` / `portfolio.html` / `works.html` / `history.html` / `selected-works-shared.js` / `works-data.json` / `history-data.json`）を確認すること

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
