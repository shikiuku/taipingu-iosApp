import { COLORS } from '@/constants/theme';
import { WORD_LIST_3000, Word } from '@/constants/words';
import { useGameStore } from '@/store/useGameStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTypingLogic } from './hooks/useTypingLogic';

const GameScreen = () => {
    const router = useRouter();
    const { score, timeRemaining, currentCourse, addScore, decrementTime, status } = useGameStore();
    const [targetWord, setTargetWord] = useState<Word>(WORD_LIST_3000[0]);

    const onComplete = () => {
        addScore(100);
        // 次の単語を選ぶ（ランダム）
        const nextWord = WORD_LIST_3000[Math.floor(Math.random() * WORD_LIST_3000.length)];
        setTargetWord(nextWord);
    };

    const { targetRomaji, currentIndex, handleKeyPress } = useTypingLogic(targetWord, onComplete);

    // タイマー開始
    useEffect(() => {
        const interval = setInterval(() => {
            decrementTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 終了判定
    useEffect(() => {
        if (status === 'result') {
            router.push('/Result');
        }
    }, [status]);

    return (
        <View style={styles.container}>
            {/* ヘッダー情報 */}
            <View style={styles.header}>
                <Text style={styles.timer}>残り {String(timeRemaining).padStart(3, '0')} 秒</Text>
                <Text style={styles.score}>獲得金額: {score.toLocaleString()} 円</Text>
            </View>

            {/* 寿司カウンター演出（プレースホルダー） */}
            <View style={styles.counterArea}>
                <View style={styles.sushiPlate}>
                    <Text style={styles.kanjiText}>{targetWord.kanji}</Text>
                    <Text style={styles.kanaText}>{targetWord.kana}</Text>

                    <View style={styles.romajiContainer}>
                        {targetRomaji.split('').map((char, i) => (
                            <Text
                                key={i}
                                style={[
                                    styles.romajiChar,
                                    i < currentIndex ? styles.typedChar : styles.untypedChar
                                ]}
                            >
                                {char}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

            {/* 見えないTextInputでキー入力を受け取る（iPad物理キーボード等を想定） */}
            <TextInput
                autoFocus
                style={styles.hiddenInput}
                onChangeText={(text) => {
                    const char = text.slice(-1);
                    if (char) handleKeyPress(char);
                }}
                value=""
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WOOD_DARK,
        padding: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 100,
    },
    timer: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
    },
    score: {
        fontSize: 32,
        color: COLORS.TEXT_GOLD,
        fontWeight: 'bold',
    },
    counterArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sushiPlate: {
        width: 600,
        height: 250,
        backgroundColor: '#FFF',
        borderRadius: 125,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 8,
        borderColor: COLORS.WOOD_MEDIUM,
    },
    kanjiText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: COLORS.TEXT_MAIN,
    },
    kanaText: {
        fontSize: 24,
        color: '#666',
        marginBottom: 20,
    },
    romajiContainer: {
        flexDirection: 'row',
    },
    romajiChar: {
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'lowercase',
    },
    typedChar: {
        color: '#DDD',
    },
    untypedChar: {
        color: COLORS.TEXT_MAIN,
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
});

export default GameScreen;
