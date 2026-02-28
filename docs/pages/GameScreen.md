# GameScreenドキュメント

## 概要
寿司屋のカウンターを舞台としたメインのタイピング画面。
右から流れてくる寿司（単語）をタイピングして消していく。

## 主なコンポーネント
- `SushiPlate`: 寿司と単語を表示するコンポーネント
- `ComboMeter`: 連続入力成功を表示するゲージ
- `ScoreBoard`: 現在のスコア（円）を表示
- `TimerDisplay`: 残り時間を表示

## ロジック
- `useTypingLogic`: キー入力を受け取り、現在の単語と照合する
- `useSushiAnimation`: 寿司の移動アニメーション（Reanimated）

## スタイル
- iPad ランドスケープ最適化
- 木目調の背景と和風フォント
