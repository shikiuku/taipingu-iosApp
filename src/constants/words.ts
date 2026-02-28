export type Word = {
    kanji: string;
    kana: string;
    romaji: string[]; // 複数の入力パターンを許容するため
};

export const WORD_LIST_3000: Word[] = [
    { kanji: 'お茶', kana: 'おちゃ', romaji: ['ocha'] },
    { kanji: '寿司', kana: 'すし', romaji: ['sushi'] },
    { kanji: 'マグロ', kana: 'まぐろ', romaji: ['maguro'] },
    { kanji: 'たまご', kana: 'たまご', romaji: ['tamago'] },
    { kanji: 'のりまき', kana: 'のりまき', romaji: ['norimaki'] },
];

export const WORD_LIST_5000: Word[] = [
    { kanji: '江戸前寿司', kana: 'えどまえずし', romaji: ['edomaezushi'] },
    { kanji: '回転寿司', kana: 'かいてんずし', romaji: ['kaitenzushi'] },
    { kanji: '本日のおすすめ', kana: 'ほんじつのおすすめ', romaji: ['honjitsunoosusume'] },
];
