import yaml
import json
import os

# 読みやすく、かつ正確な標準的ヘボン式を基本とする
ROMAJI_MAP = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
    'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'っ': '',
    'ー': '-', '！': '!', '？': '?', '。': '.', '、': ',', '　': ' ', ' ': ' '
}

def kana_to_romaji(kana):
    romaji = ""
    i = 0
    while i < len(kana):
        if i + 1 < len(kana) and kana[i:i+2] in ROMAJI_MAP:
            romaji += ROMAJI_MAP[kana[i:i+2]]
            i += 2
        elif kana[i] == 'っ':
            if i + 1 < len(kana):
                next_part = kana_to_romaji(kana[i+1])
                if next_part:
                    romaji += next_part[0]
            i += 1
        elif kana[i] == 'ん':
            if i + 1 < len(kana):
                n_next = kana_to_romaji(kana[i+1])
                if n_next and n_next[0] in 'aiueoy':
                    romaji += 'nn'
                else:
                    romaji += 'n'
            else:
                romaji += 'nn'
            i += 1
        elif 0x30A1 <= ord(kana[i]) <= 0x30F6:
            hira = chr(ord(kana[i]) - 0x60)
            romaji += ROMAJI_MAP.get(hira, kana[i])
            i += 1
        else:
            romaji += ROMAJI_MAP.get(kana[i], kana[i])
            i += 1
    return romaji.replace('--', '-')

def process_yaml(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    word_data = data['word']
    categories = {
        'low': ['txt2', 'txt3', 'txt4'],
        'mid': ['txt5', 'txt6', 'txt7'],
        'high': ['txt8', 'txt9', 'txt10', 'txt11', 'txt12', 'txt13', 'txt14']
    }
    lists = {'low': [], 'mid': [], 'high': []}
    for cat_name, keys in categories.items():
        for key in keys:
            if key in word_data:
                for item in word_data[key]:
                    for kana, kanji in item.items():
                        lists[cat_name].append({
                            'kanji': kanji,
                            'kana': kana,
                            'romaji': [kana_to_romaji(kana)]
                        })
    return lists['low'], lists['mid'], lists['high']

def generate_ts(l3000, l5000, l10000, output_path):
    lines = [
        "export interface Word {",
        "    kanji: string;",
        "    kana: string;",
        "    romaji: string[];",
        "}",
        ""
    ]
    def add_list(name, data):
        lines.append(f"export const {name}: Word[] = [")
        for d in data:
            entry = f"    {{ kanji: {json.dumps(d['kanji'], ensure_ascii=False)}, kana: {json.dumps(d['kana'], ensure_ascii=False)}, romaji: {json.dumps(d['romaji'], ensure_ascii=False)} }},"
            lines.append(entry)
        lines.append("];")
        lines.append("")

    add_list("WORD_LIST_3000", l3000)
    add_list("WORD_LIST_5000", l5000)
    add_list("WORD_LIST_10000", l10000)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))

if __name__ == "__main__":
    l3, l5, l10 = process_yaml("woed.yaml")
    generate_ts(l3, l5, l10, "src/constants/words.ts")
    print("Regenerated words.ts")
