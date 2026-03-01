/**
 * Modern Zen & Matcha Theme Colors
 * 抹茶、墨色、金を基調としたプレミアムな和風デザイン。
 */
export const AppColors = {
  // ベースカラー (抹茶・墨)
  base: {
    dark: '#1B211E',    // 深い緑を含んだ墨色 (背景)
    matcha: '#2D3E33',  // 深い抹茶色
    matchaLight: '#4E6356', // 明るめの抹茶色
    charcoal: '#2C2C2C', // 墨色
  },

  // アクセント (シャンパンゴールド系)
  accent: {
    gold: '#C5A059',    // アンティークゴールド
    goldLight: '#E5C687', // 輝きのあるゴールド
    goldDim: '#8F7642',   // 落ち着いたゴールド
  },

  // テキスト
  text: {
    primary: '#E8EBE9',   // 清潔感のある白 (メイン)
    secondary: '#A8B0AB', // 落ち着いたグレー (補足)
    gold: '#D4AF37',      // テキスト用ゴールド
    black: '#121212',     // 反転テキスト用
    danger: '#E57373',    // エラー・警告 (少し和風に寄せた赤)
  },

  // UIパーツ
  ui: {
    glass: 'rgba(255, 255, 255, 0.05)',  // 極薄いグラスモーフィズム
    glassMatcha: 'rgba(45, 62, 51, 0.6)', // 抹茶色のグラスモーフィズム
    overlay: 'rgba(0, 0, 0, 0.7)',
    divider: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.5)',
  }
};

// 互換性レイヤー (既存の参照を壊さないために維持)
export const COLORS = {
  WOOD_DARK: AppColors.base.dark,
  WOOD_LIGHT: AppColors.text.primary, // 暫定的に白系
  WOOD_MEDIUM: AppColors.base.matcha,
  SUSHI_WHITE: AppColors.text.primary,
  TEA_GREEN: AppColors.base.matchaLight,
  TEXT_MAIN: AppColors.text.primary,
  TEXT_GOLD: AppColors.text.gold,
  DANGER: AppColors.text.danger,
};

export const DIMENSIONS = {
  IPAD_WIDTH: 1366,
  IPAD_HEIGHT: 1024,
  HEADER_HEIGHT: 100,
  FOOTER_HEIGHT: 120,
};

export const FONTS = {
  KAISHO: 'TamanegiKaisho',
  KLEE: 'KleeOneSemiBold',
} as const;
