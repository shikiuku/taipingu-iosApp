import { Word } from '@/constants/words';
import { useCallback, useEffect, useMemo, useState } from 'react';

// かなとローマ字の対応マップ
export const KANA_ROMAJI_MAP: { [key: string]: string[] } = {
    'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
    'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
    'さ': ['sa'], 'し': ['si', 'shi'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
    'た': ['ta'], 'ち': ['ti', 'chi'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
    'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
    'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
    'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
    'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
    'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
    // わ行
    'わ': ['wa'], 'を': ['wo'], 'ん': ['nn', 'n'],
    // 濁音
    'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
    'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
    'だ': ['da'], 'ぢ': ['ji', 'zi'], 'づ': ['zu'], 'で': ['de'], 'ど': ['do'],
    'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
    'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
    // 拗音（2文字の組み合わせ）
    'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
    'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'],
    'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'],
    'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
    'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
    'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
    'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
    'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
    'じゃ': ['ja', 'zya'], 'じゅ': ['ju', 'zyu'], 'じょ': ['jo', 'zyo'],
    'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
    'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],
    'ふぁ': ['fa'], 'ふぃ': ['fi'], 'ふぇ': ['fe'], 'ふぉ': ['fo'],
    'でぃ': ['di'], 'どぅ': ['du'], 'てぃ': ['ti'],
    // 小書き文字
    'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe'], 'ぉ': ['lo', 'xo'],
    'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo'], 'っ': ['xtsu', 'ltu'],
    'ゎ': ['lwa', 'xwa'],

    // その他
    'ー': ['-'], '！': ['!'], '？': ['?'], '。': ['。'], '、': ['、'], ' ': [' '], '　': [' ']
};

const toHiragana = (str: string) => {
    return str.replace(/[\u30A1-\u30F6]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
};

const splitKana = (kana: string) => {
    const units: string[] = [];
    const hira = toHiragana(kana);
    let i = 0;
    while (i < hira.length) {
        // 先に2文字の組み合わせをチェック (ふぉ、きゃ、など)
        if (i + 1 < hira.length) {
            const duo = hira.substring(i, i + 2);
            if (KANA_ROMAJI_MAP[duo]) {
                units.push(duo);
                i += 2;
                continue;
            }
            // 2文字目が小書き文字の場合のフォールバック
            if ('ぁぃぅぇぉゃゅょ'.includes(hira[i + 1])) {
                units.push(duo);
                i += 2;
                continue;
            }
        }
        units.push(hira[i]);
        i += 1;
    }
    return units;
};

export const useTypingLogic = (targetWord: Word | null, onComplete: () => void) => {
    const [typedInCurrentKana, setTypedInCurrentKana] = useState('');
    const [currentKanaIndex, setCurrentKanaIndex] = useState(0);
    const [currentIndexInDisplay, setCurrentIndexInDisplay] = useState(0);
    const [selectedRomajiPatterns, setSelectedRomajiPatterns] = useState<string[]>([]);
    const [mistakeCount, setMistakeCount] = useState(0);

    const kanaUnits = useMemo(() => (targetWord ? splitKana(targetWord.kana) : []), [targetWord]);

    useEffect(() => {
        if (targetWord) {
            const patterns = kanaUnits.map(unit => KANA_ROMAJI_MAP[unit]?.[0] || unit);
            setSelectedRomajiPatterns(patterns);
            setTypedInCurrentKana('');
            setCurrentKanaIndex(0);
            setCurrentIndexInDisplay(0);
        }
    }, [targetWord, kanaUnits]);

    const displayRomaji = useMemo(() => selectedRomajiPatterns.join(''), [selectedRomajiPatterns]);

    const handleKeyPress = useCallback((key: string) => {
        if (!targetWord || currentKanaIndex >= kanaUnits.length) return;

        const input = key.toLowerCase();
        const isHiraganaInput = /^[ぁ-んー、。？！]$/.test(input);

        let tempTypedInCurrentKana = typedInCurrentKana;
        let tempCurrentKanaIndex = currentKanaIndex;
        let tempCurrentIndexInDisplay = currentIndexInDisplay;
        let tempSelectedRomajiPatterns = [...selectedRomajiPatterns];

        let isCorrect = false;

        if (isHiraganaInput) {
            const currentUnit = kanaUnits[tempCurrentKanaIndex];
            const hiraCandidate = toHiragana(tempTypedInCurrentKana + input);

            if (input === currentUnit) {
                const currentPattern = tempSelectedRomajiPatterns[tempCurrentKanaIndex];
                tempCurrentIndexInDisplay += (currentPattern.length - tempTypedInCurrentKana.length);
                tempCurrentKanaIndex += 1;
                tempTypedInCurrentKana = '';
                isCorrect = true;
            } else if (currentUnit.startsWith(hiraCandidate)) {
                tempTypedInCurrentKana = hiraCandidate;
                if (hiraCandidate === currentUnit) {
                    const currentPattern = tempSelectedRomajiPatterns[tempCurrentKanaIndex];
                    tempCurrentIndexInDisplay += (currentPattern.length - (tempTypedInCurrentKana.length - hiraCandidate.length));
                    tempCurrentKanaIndex += 1;
                    tempTypedInCurrentKana = '';
                }
                isCorrect = true;
            }
        } else {
            const char = input;
            const currentUnit = kanaUnits[tempCurrentKanaIndex];
            let validPatterns: string[] = [];

            if (currentUnit === 'っ') {
                if (tempCurrentKanaIndex + 1 < kanaUnits.length) {
                    const nextUnit = kanaUnits[tempCurrentKanaIndex + 1];
                    const nextPatterns = KANA_ROMAJI_MAP[nextUnit] || [nextUnit[0]];
                    validPatterns = nextPatterns.map(p => p[0]);
                }
                validPatterns.push('xtsu', 'ltu');
            } else if (currentUnit === 'ん') {
                if (tempCurrentKanaIndex + 1 < kanaUnits.length) {
                    const nextUnit = kanaUnits[tempCurrentKanaIndex + 1];
                    const nextPatterns = KANA_ROMAJI_MAP[nextUnit] || [nextUnit[0]];
                    const startsWithVowel = nextPatterns.some(p => 'aiueoy'.includes(p[0]));
                    validPatterns = startsWithVowel ? ['nn'] : ['nn', 'n'];
                } else {
                    validPatterns = ['nn', 'n'];
                }
            } else {
                validPatterns = KANA_ROMAJI_MAP[currentUnit] || [currentUnit];
            }

            const nextTyped = tempTypedInCurrentKana + char;
            const matchingPattern = validPatterns.find(p => p.startsWith(nextTyped));

            if (matchingPattern) {
                if (currentUnit !== 'っ' && tempSelectedRomajiPatterns[tempCurrentKanaIndex] !== matchingPattern) {
                    tempSelectedRomajiPatterns[tempCurrentKanaIndex] = matchingPattern;
                }
                tempTypedInCurrentKana = nextTyped;
                tempCurrentIndexInDisplay += 1;
                if (nextTyped === matchingPattern) {
                    tempCurrentKanaIndex += 1;
                    tempTypedInCurrentKana = '';
                }
                isCorrect = true;
            }
        }

        if (isCorrect) {
            // playSuccessSound(); // Removed as requested
        } else {
            setMistakeCount(prev => prev + 1);
        }

        if (tempCurrentKanaIndex === kanaUnits.length) {
            onComplete();
        }

        setTypedInCurrentKana(tempTypedInCurrentKana);
        setCurrentKanaIndex(tempCurrentKanaIndex);
        setCurrentIndexInDisplay(tempCurrentIndexInDisplay);
        setSelectedRomajiPatterns(tempSelectedRomajiPatterns);

    }, [targetWord, kanaUnits, currentKanaIndex, typedInCurrentKana, selectedRomajiPatterns, currentIndexInDisplay, onComplete]);

    return {
        currentIndex: currentIndexInDisplay,
        handleKeyPress,
        targetRomaji: displayRomaji,
        mistakeCount,
    };
};
