# ダウンロード要求フォーム POC

製品ページを巡回し、閲覧した製品のカタログをまとめてダウンロード請求できるPOCサイト。

## ファイル構成

```
sample-page/
├── index.html              # 製品一覧ページ
├── download.html           # カタログ請求フォーム
├── css/
│   └── style.css           # 共通スタイル
├── js/
│   └── tracker.js          # 閲覧履歴管理（localStorage）
└── products/
    ├── product1.html       # ヘッドホン A1
    ├── product2.html       # スマートウォッチ Pro X
    └── product3.html       # スピーカー S3
```

## 動作フロー

1. 製品一覧 (`index.html`) から製品を選んでクリック
2. 製品詳細ページを開くと自動で閲覧履歴に記録（LocalStorage使用）
3. ヘッダーの「カタログ請求」バッジに閲覧数が表示される
4. ダウンロードフォーム (`download.html`) で閲覧した製品一覧が表示
5. チェックボックスで請求する製品を選択し、連絡先を入力して送信

## 起動方法

```bash
open index.html
```

または任意のローカルサーバーで起動：

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

## 技術仕様

- HTML/CSS/JavaScript（フレームワーク不使用）
- LocalStorageによる閲覧履歴の永続化
- レスポンシブデザイン対応

## 公開方法

GitHub Pagesで公開済み（別アカウント使用）。
- Settings → Pages → Branch を `main` に設定

## TODO: サーバー連携機能

現在はフロントエンドのみ。以下の機能を追加予定：

### 実装したい機能
フォーム送信時に：
1. PDFをダウンロードさせる
2. 同時にサーバーへ通知してメール送信

### 構成案
```
[ダウンロードボタン]
    ↓
[JavaScript] → Perlサーバーへ POST（閲覧履歴 + メールアドレス）
    ↓
[Perl CGI] → メール送信
    ↓
[JavaScript] → PDFダウンロード開始
```

### 必要な実装

**1. フロントエンド（download.html）**
- フォーム送信時に `fetch()` で Perl サーバーへ POST
- 送信データ: メールアドレス、会社名、閲覧した製品リスト
- 成功レスポンス受信後、PDFダウンロードを開始

**2. Perl側（新規CGI）**
- JSON で POST データを受信
- 社内担当者へメール送信（顧客情報＋閲覧製品リスト）
- 成功/失敗のJSONレスポンスを返す

### 備考
- 既存サーバーは Perl で構築済み
- LocalStorage の保持期間: 永続（Safari は7日未使用で削除の可能性あり）
- Cookie でも実装可能だが、4KB制限あり。LocalStorage推奨
