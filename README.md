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
