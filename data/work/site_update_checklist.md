# Site Update Checklist

このサイトを更新するときの簡易チェックリスト。

## 1. Source 更新

- `works` の追加・修正は [works-data.json](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/works-data.json) を正として編集する
- レイアウトや文言修正は対象の本体ファイルを編集する
- 主な本体ファイル
  - [index.html](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/index.html)
  - [portfolio.html](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/portfolio.html)
  - [works.html](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/works.html)
  - [works-data.json](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/works-data.json)

## 2. 画像運用

- 元画像は `data/raw/source_images/` に置く
- 本番利用画像だけを [images](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/images) に置く
- 未使用画像は [data/archive/unused_webp](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/data/archive/unused_webp) に移す
- `works` 用画像を追加したら、必要に応じて管理マッピングも更新する
  - [jacket_mapping.txt](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/data/work/mappings/jacket_mapping.txt)
  - [rename_map.txt](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/data/work/mappings/rename_map.txt)

## 3. Deploy 反映

- デプロイ用フォルダは [2026-04-17_netlify_upload](/Users/miyagawamaro/Downloads/HP_Codex/HP_File/2026-04-17_netlify_upload) を使う
- 修正後は、変更した本体ファイルを必ずデプロイ用にも反映する
- 特に確認するファイル
  - `index.html`
  - `portfolio.html`
  - `works.html`
  - `works-data.json`
  - `images/` の追加・削除分

## 4. 差分確認

- 「修正したつもり」で終わらせず、実ファイルで確認する
- 最低限この3点を確認する
  - source 側に変更が入っているか
  - deploy 側にも同じ変更が入っているか
  - 不要ファイルが deploy 側に残っていないか

## 5. Preview 確認

- プレビューで対象ページを確認する
- `works` 更新時は一覧カードとモーダルの両方を見る
- 画像が見えないときは、まず実ファイルの有無と参照パスを確認する
- キャッシュ疑いがあるときは、必要な画像URLだけクエリを付けて更新する

## 6. 完了前チェック

- 変更ファイル名を列挙できる状態にする
- source と deploy の両方が更新済みか確認する
- 今回の修正内容を一言で説明できる状態にする

## 7. 今後の原則

- `works.html` の作品追加・修正は直接触らず、基本は `works-data.json` を更新する
- 完了報告の前に、記憶ではなく実ファイルで確認する
- 反映済みと伝えるときは、source と deploy の両方を確認してから伝える
