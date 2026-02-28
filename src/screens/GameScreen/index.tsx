import { COLORS } from '@/constants/theme';
import { WORD_LIST_3000, Word } from '@/constants/words';
import { useGameStore } from '@/store/useGameStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useTypingLogic } from './hooks/useTypingLogic';

const GameScreen = () => {
    const router = useRouter();
    const { score, timeRemaining, currentCourse, addScore, decrementTime, status } = useGameStore();
    const [targetWord, setTargetWord] = useState<Word>(WORD_LIST_3000[0]);
    const inputRef = useRef<TextInput>(null);

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

    // 常にフォーカスを維持
    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handlePressScreen = () => {
        inputRef.current?.focus();
    };

    const handlePressScreen = () => {
        inputRef.current?.focus();
    };

    const handleExit = () => {
        resetGame();
        router.replace('/');
    };

    // 現在のコースに応じた単語セットを取得
    const getWordList = () => {
        if (!currentCourse) return WORD_LIST_3000;
        if (currentCourse.price === 10000) return WORD_LIST_10000;
        if (currentCourse.price === 5000) return WORD_LIST_5000;
        return WORD_LIST_3000;
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={handlePressScreen}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    {/* ヘッダー情報 */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.timer}>残り {String(timeRemaining).padStart(3, '0')} 秒</Text>
                            <Text style={styles.courseName}>{currentCourse?.name}</Text>
                        </View>

                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.score}>獲得金額: {score.toLocaleString()} 円</Text>
                            <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                                <Text style={styles.exitButtonText}>中断して戻る</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 寿司カウンター演出 */}
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

                    {/* 見えないTextInputでキー入力を受け取る */}
                    <TextInput
                        ref={inputRef}
                        autoFocus
                        style={styles.hiddenInput}
                        onChangeText={(text) => {
                            if (text.length > 0) {
                                const lastChar = text.charAt(text.length - 1);
                                handleKeyPress(lastChar);
                            }
                        }}
                        value=""
                        autoCapitalize="none"
                        autoCorrect={false}
                        spellCheck={false}
                        keyboardType="ascii-capable"
                        blurOnSubmit={false}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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
        marginBottom: 40,
    },
    timer: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
    },
    courseName: {
        fontSize: 18,
        color: COLORS.WOOD_LIGHT,
        marginTop: 5,
    },
    score: {
        fontSize: 32,
        color: COLORS.TEXT_GOLD,
        fontWeight: 'bold',
    },
    exitButton: {
        marginTop: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.WOOD_LIGHT,
    },
    exitButtonText: {
        color: '#FFF',
        fontSize: 16,
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
        bottom: 0,
        left: 0,
        width: 10,
        height: 10,
        opacity: 0,
    },
});

export default GameScreen;
