export interface Word {
    kanji: string;
    kana: string;
    romaji: string[];
}

// 初級：短めの日常単語
export const WORD_LIST_3000: Word[] = [
    { kanji: 'マグロ', kana: 'まぐろ', romaji: ['maguro'] },
    { kanji: 'サーモン', kana: 'さーもん', romaji: ['sa-mon'] },
    { kanji: 'エビ', kana: 'えび', romaji: ['ebi'] },
    { kanji: 'イカ', kana: 'いか', romaji: ['ika'] },
    { kanji: '玉子', kana: 'たまご', romaji: ['tamago'] },
    { kanji: 'イくら', kana: 'いくら', romaji: ['ikura'] },
    { kanji: 'タコ', kana: 'たこ', romaji: ['tako'] },
    { kanji: 'ウニ', kana: 'うに', romaji: ['uni'] },
    { kanji: 'りんご', kana: 'りんご', romaji: ['ringo'] },
    { kanji: 'みかん', kana: 'みかん', romaji: ['mikan'] },
    { kanji: 'すいか', kana: 'すいか', romaji: ['suika'] },
    { kanji: 'つくえ', kana: 'つくえ', romaji: ['tukue', 'tsukue'] },
    { kanji: 'いす', kana: 'いす', romaji: ['isu'] },
    { kanji: 'とけい', kana: 'とけい', romaji: ['tokei'] },
    { kanji: 'めがね', kana: 'めがね', romaji: ['megane'] },
    { kanji: 'ほん', kana: 'ほん', romaji: ['hon'] },
    { kanji: 'ぺん', kana: 'ぺん', romaji: ['pen'] },
    { kanji: 'ねこ', kana: 'ねこ', romaji: ['neko'] },
    { kanji: 'いぬ', kana: 'いぬ', romaji: ['inu'] },
    { kanji: 'とり', kana: 'とり', romaji: ['tori'] },
];

// 中級：日常的なフレーズや少し長い単語
export const WORD_LIST_5000: Word[] = [
    ...WORD_LIST_3000,
    { kanji: 'こんにちは', kana: 'こんにちは', romaji: ['konnitiha', 'konnichiwa'] },
    { kanji: 'ありがとう', kana: 'ありがとう', romaji: ['arigatou'] },
    { kanji: 'おやすみ', kana: 'おやすみ', romaji: ['oyasumi'] },
    { kanji: 'おはえよう', kana: 'おはよう', romaji: ['ohayou'] },
    { kanji: 'いただきます', kana: 'いただきます', romaji: ['itadakimasu'] },
    { kanji: 'ごちそうさま', kana: 'ごちそうさま', romaji: ['gotisousama', 'gochisousama'] },
    { kanji: 'いってきます', kana: 'いってきます', romaji: ['ittekimasu'] },
    { kanji: 'おかえり', kana: 'おかえり', romaji: ['okaeri'] },
    { kanji: 'でんわばんごう', kana: 'でんわばんごう', romaji: ['denwabangou'] },
    { kanji: 'ゆうびんきょく', kana: 'ゆうびんきょく', romaji: ['yuubinkyoku'] },
    { kanji: 'しんかんせん', kana: 'しんかんせん', romaji: ['shinkansen', 'sinkansen'] },
    { kanji: 'じどうはんばいき', kana: 'じどうはんばいき', romaji: ['jidouhanbaiki', 'zidouhanbaiki'] },
];

// 上級：ことわざ、四字熟語、長い文章
export const WORD_LIST_10000: Word[] = [
    ...WORD_LIST_5000,
    { kanji: '石の上にも三年', kana: 'いしのうえにもさんねん', romaji: ['ishinouenimosannen', 'isinouenimosannen'] },
    { kanji: '犬も歩けば棒に当たる', kana: 'いぬもあるけばぼうにあたる', romaji: ['inu mo arukeba bou ni ataru', 'inumourukebabouniataru'] },
    { kanji: '一石二鳥', kana: 'いっせきにちょう', romaji: ['issekinichou', 'issekinitiyou'] },
    { kanji: '温故知新', kana: 'おんこちしん', romaji: ['onkochishin', 'onkotisin'] },
    { kanji: '一生懸命', kana: 'いっしょうけんめい', romaji: ['isshoukenmei', 'issiyoukenmei'] },
    { kanji: '臥薪嘗胆', kana: 'がしんしょうたん', romaji: ['gashinshoutan', 'gasinsiyoutan'] },
    { kanji: '諸行無常', kana: 'しょぎょうむじょう', romaji: ['shogyoumujou', 'siyogiyoumujou'] },
    { kanji: '早寝早起き門三文の徳', kana: 'はやねはやおきもんさんもんのとく', romaji: ['hayanehayaokimonsammonnotoku'] },
];
