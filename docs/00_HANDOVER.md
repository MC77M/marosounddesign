# 00_HANDOVER.md — 引き継ぎファイル

次回作業の開始前に、このファイルから読む。

---

## プロジェクト概要

- **プロジェクト名**: HP_File_260418
- **内容**: Netlify公開用の静的ポートフォリオサイト

---

## 主要ページ

| ファイル | 説明 |
|---|---|
| index.html | トップページ |
| works.html | 楽曲一覧（300件、フィルター付き） |
| portfolio.html | プロフィール・Selected Works（title: "Profile — MaroSoundDesign"） |
| history.html | 2019年以前の作品アーカイブ |

## SEO 関連ファイル

| ファイル | 説明 |
|---|---|
| assets/ogp.jpg | OGP 画像（1200×630） |
| sitemap.xml | 全4ページ登録済み |
| robots.txt | 全クローラー許可・sitemap 参照 |
| googlea0a2b71118ae6d61.html | Google Search Console 認証ファイル（削除禁止）|

---

## 主要データ・スクリプト

| ファイル | 説明 |
|---|---|
| works-data.json | works.html の全楽曲データ |
| history-data.json | history.html の経歴データ |
| selected-works-shared.js | portfolio.html のモーダル処理・データ |

---

## 現在の状態

- XSS対策済み（innerHTML 禁止 → DOM API に統一）
- モーダル閉じ処理統一済み
- CSS共通化済み（css/style.css）
- 日付表記 YYYY.MM.DD 統一済み
- 不要 preload / fetchpriority 削除済み
- works フィルター軽量化済み
- 日本語画像パス NFC 正規化済み
- **SEO Phase 1 完了**（2026-04-28）
  - meta description / OGP / Twitter Card 追加済み（全4ページ）
  - portfolio.html title 重複解消（"Profile — MaroSoundDesign"）
  - OGP 画像配置済み（assets/ogp.jpg / 1200×630）
  - sitemap.xml / robots.txt 追加済み
  - Google Search Console 所有権確認済み・サイトマップ送信済み
  - JSON-LD 構造化データ追加済み（index.html: Person+WebSite / portfolio.html: Person）
  - Schema.org Validator: エラーなし・警告なし確認済み
  - sameAs: X / portfolio.html（Wikipedia・Uta-net は URL確認後に追加予定）
- **Performance Phase 1 完了**（2026-04-28）
  - Google Fonts を非同期読み込みに変更（全4ページ / rel=preload + onload + noscript）
  - fonts.gstatic.com preconnect 追加済み
  - Inter ウェイトを 300;400;500;700;800;900 → **800;900 のみ**に削減（11→5ウェイト）
  - モバイル Performance スコア: index 61 / works 64 / portfolio 59 / history 65
  - デスクトップ Performance スコア: index 85 / works 84 / portfolio 91 / history 88
  - モバイル LCP の根本改善は未完（フォント非同期化の効果が限定的）

---

## 重要注意事項

- **日本語ファイル名は NFD/NFC 問題が起きる**
  - macOS は NFD、Netlify は NFC を期待する場合がある
  - 画像パスは必ず NFC 正規化すること
- **selected-works-shared.js と portfolio.html のパス一致が必須**
  - `onclick` 引数と `img src` が selected-works-shared.js のパスと一致しているか確認
- **本番確認では Network タブの画像 404 を必ず確認する**

---

## 関連ドキュメント

| ファイル | 内容 |
|---|---|
| docs/01_RULES.md | 作業ルール |
| docs/02_CHECKLIST.md | push前・ローカル・本番の確認手順 |
| docs/03_PROGRESS.md | リファクタリング進捗ログ |
| docs/04_TROUBLESHOOTING.md | トラブル対応 |

---

## 次回着手候補（優先度順）

| 優先度 | 項目 | 概要 |
|---|---|---|
| 🔴 高 | works.html 初期表示件数制限 | 300件全件レンダリングによりモバイル LCP 12.8秒。初期30件のみ描画し残りをスクロール時追加 |
| 🟠 中 | sameAs 追記 | Wikipedia・Uta-net の実URLが確定したら index.html / portfolio.html の JSON-LD に追加 |
| 🟡 低 | Noto Sans JP 700 / DM Mono 600 バグ確認 | 宣言あるが未ロード。現状ブラウザが代替表示中。目視で問題なければ対応不要 |
| 🟡 低 | LCP 要素への preload 追加 | index.html のヒーローセクション向け |

---

## 次回作業時の手順

1. `docs/00_HANDOVER.md`（このファイル）を読む
2. `docs/01_RULES.md` を読む
3. `docs/02_CHECKLIST.md` を読む
4. コード変更は **1目的ずつ**
5. 変更後はローカル確認、必要なら本番確認
