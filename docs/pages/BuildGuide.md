# iPadビルド・デプロイガイド

## 概要
このプロジェクトは Expo を使用しており、Windows 環境から iPad へアプリをインストールするために **EAS Build** を利用します。

## 準備するもの
1.  **Expo アカウント**: [expo.dev](https://expo.dev) で作成。
2.  **EAS CLI**:
    ```bash
    npm install -g eas-cli
    ```
3.  **Apple Developer アカウント**: (IPA を直接配布・インストールする場合に推奨)

## ビルド手順
以下のコマンドを実行して、iPad 用のプレビュービルドを作成します。

```bash
eas build --profile preview --platform ios
```

### 設定ファイル
- `app.json`: `bundleIdentifier` ("com.k4849.taipingu") が設定されている必要があります。
- `eas.json`: ビルドプロファイル（development, preview, production）が定義されています。

## インストール
1.  ビルド完了後、ターミナルまたは Expo ダッシュボードに表示される **QRコード** を iPad のカメラでスキャンします。
2.  「プロファイルのインストール」の指示に従います。
3.  ホーム画面にアプリが追加されます。

## 開発中の確認 (Expo Go)
ビルドせずに動作確認したい場合は、iPad に **Expo Go** をインストールし、`npx expo start` で表示される QR コードを読み取ります。
