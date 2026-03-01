---
description: How to build and install the typing app on your iPad
---

## iPadへのインストール手順 (EAS Build)

Windows環境からiPadにアプリを入れるには、Expoのクラウドビルドサービス（EAS Build）を使用するのが最も簡単です。

### 1. 準備
1.  **Expoアカウントの作成**: [expo.dev](https://expo.dev) でアカウントを作成してください。
2.  **EAS CLIのインストール**: ターミナルで以下のコマンドを実行します。
    ```bash
    npm install -g eas-cli
    ```
3.  **ログイン**:
    ```bash
    eas login
    ```

### 2. ビルドの実行
iPadにインストールするための「プレビュービルド」を作成します。以下のコマンドを実行してください。
```bash
eas build --profile preview --platform ios
```
*   **注意**: 初回実行時に「Apple Developer Program」への登録（年間プラン）が必要になる場合があります。個人利用で開発者登録をしていない場合は、[テスト用ビルド(Internal Distribution)](https://docs.expo.dev/build/internal-distribution/)の手順が必要になります。

### 3. iPadへのインストール
1.  ビルドが完了すると、ExpoのダッシュボードにQRコードが表示されます。
2.  iPadのカメラでQRコードをスキャンし、指示に従ってプロファイルをインストールします。
3.  アプリがホーム画面に追加されます。

### 別の方法: ローカルで確認するだけなら
同じWi-Fiに繋いでいる場合、iPadに **Expo Go** アプリをインストールし、現在PCで実行中のターミナルのQRコードをスキャンするだけで、ビルドせずに動作確認が可能です。
（※今回は個人アプリとして「インストール」したいとのことでしたので、上記EAS Buildを推奨します）
