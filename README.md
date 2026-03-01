# Taipingu - Sushida Style Typing Game for iPad

iPadに最適化された、和風（寿司屋カウンター）テーマのタイピングゲーム。

## 🛠 技術スタック
- **Framework**: Expo (Managed Workflow)
- **Language**: TypeScript
- **State**: Zustand
- **Animation**: React Native Reanimated
- **Assets**: `word_complete.mp3` (単語完了時の音声フィードバック)

## 📜 開発の掟 (Crucial Rules)

## フェーズ 26: リザルト画面ループの修正
- [x] ステップ1: `useGameStore` の `decrementTime` にステータスガードを追加（意図しないリザルト遷移の防止）
- [x] ステップ2: `addScore` へのガード追加による Zustand ストアの安全性向上

## フェーズ 27: 単語完了時の音声フィードバック
- [x] ステップ1: 「カーソル移動10.mp3」を「word_complete.mp3」に改名してアセットへ配置
- [x] ステップ2: `GameScreen` で単語入力完了時に `word_complete.mp3` を再生するロジックを実装

## 📂 構成とドキュメント
詳細な仕様や手順は以下のドキュメントを参照してください。

- **[アプリ画面フロー](./docs/flow.md)**: 全体の画面遷移図と各画面の役割。
- **[開発ルール](./docs/rules.md)**: コーディング規約やプロジェクトの方針。
- **各画面の仕様**:
    - [タイトル画面](./docs/pages/TitleScreen.md)
    - [コース選択画面](./docs/pages/CourseSelect.md)
    - [ゲーム画面](./docs/pages/GameScreen.md)
    - [結果画面](./docs/pages/ResultScreen.md)
- **[iPadビルド・デプロイガイド](./docs/pages/BuildGuide.md)**: iPadへのインストール手順 (EAS Build)。

## 🛠 技術詳細
- **Framework**: Expo (Managed Workflow)
- **Navigation**: Expo Router
- **State**: Zustand
- **Audio**: `expo-av`
    - `word_complete.mp3`: 単語完了時
    - `cancel.mp3`: 戻る・中断時
    - `cursor.mp3`: 選択時
    - `decide.mp3`: 開始時
- **UI/UX**: 
    - iPad Landscape (横画面) 固定
    - StatusBar 非表示 (完全な没入感)
    - 低遅延レスポンス（アニメーション排除済み）
