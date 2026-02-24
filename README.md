# 天気予報ダッシュボード

> 日本の都道府県別に、現在の天気と詳細な気象情報を確認できるシンプルなWebダッシュボード。

<img width="3840" height="1916" alt="top" src="https://github.com/user-attachments/assets/0bde079c-c27e-4c4c-ac95-226ae1262535" />

---

## 概要

**天気予報ダッシュボード** は、都道府県マップから地域を選択して天気を表示する静的サイトです。
セットアップは最小限で、ローカルですぐに動作します。

- 都道府県マップによる地域選択
- 現在時刻と現在天気の表示
- 湿度・風速・日の出/日の入りなどの詳細情報

## 機能

| 機能 | 説明 |
|------|------|
| 地域選択 | 都道府県マップから地域を選択 |
| 現在天気 | 天気・気温・最高/最低気温を表示 |
| 詳細情報 | 湿度・体感温度・気圧・風速など |
| リアルタイム時計 | 現在時刻を自動更新 |
| レスポンシブ対応 | モバイル/タブレット/PC対応 |

---

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フロントエンド | HTML / CSS / JavaScript |
| API | OpenWeather API |
| 地図 | japan-map-js |

---

## セットアップ

### 必要環境

- モダンブラウザ（Chrome / Safari / Edge など）

### 設定

1. `js/config.example.js`のコピー`js/config.local.js` を作成し、 `apiKey` を設定します。
2. `index.html` をブラウザで開きます。

---

## ディレクトリ構成

```
weather-forecast/
├── index.html
├── style.css
├── images/
│   └── favicon.ico
├── js/
│   ├── main.js
│   ├── config.js
│   ├── config.local.js
│   ├── config.example.js
│   ├── weather-api.js
│   ├── weather-view.js
│   ├── map.js
│   └── prefectures.js
```

---

## ライセンス

MIT
