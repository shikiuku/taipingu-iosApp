export interface Word {
    kanji: string;
    kana: string;
    romaji: string[];
}

export const WORD_LIST_3000: Word[] = [
    { kanji: 'マグロ', kana: 'まぐろ', romaji: ['maguro'] },
    { kanji: 'サーモン', kana: 'さーもん', romaji: ['sa-mon'] },
    { kanji: 'エビ', kana: 'えび', romaji: ['ebi'] },
    { kanji: 'イカ', kana: 'いか', romaji: ['ika'] },
    { kanji: '玉子', kana: 'たまご', romaji: ['tamago'] },
    { kanji: 'イクラ', kana: 'いくら', romaji: ['ikura'] },
    { kanji: 'タコ', kana: 'たこ', romaji: ['tako'] },
    { kanji: 'ウニ', kana: 'うに', romaji: ['uni'] },
];

export const WORD_LIST_5000: Word[] = [
    ...WORD_LIST_3000,
    { kanji: '中トロ', kana: 'ちゅうとろ', romaji: ['tyuutoro', 'chuutoro'] },
    { kanji: 'いくら軍艦', kana: 'いくらぐんかん', romaji: ['ikuragunkan'] },
];

export const WORD_LIST_10000: Word[] = [
    ...WORD_LIST_5000,
    { kanji: '特上穴子', kana: 'とくじょうあなご', romaji: ['tokujouanago'] },
    { kanji: '大トロ炙り', kana: 'おおとろあぶり', romaji: ['ootoroaburi'] },
];
