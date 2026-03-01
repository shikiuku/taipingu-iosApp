import { AppColors } from '@/constants/theme';
import { WORD_LIST_10000, WORD_LIST_3000, WORD_LIST_5000, Word } from '@/constants/words';
import { useGameStore } from '@/store/useGameStore';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameHeader } from './components/GameHeader';
import { SushiDisplay } from './components/SushiDisplay';
import { useTypingLogic } from './hooks/useTypingLogic';

const GameScreen = () => {
    const router = useRouter();
    const {
        score,
        timeRemaining,
        currentCourse,
        addScore,
        decrementTime,
        status,
        resetGame
    } = useGameStore();

    const [completeSound, setCompleteSound] = useState<Audio.Sound | null>(null);
    const [cancelSound, setCancelSound] = useState<Audio.Sound | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);
    const cancelSoundRef = useRef<Audio.Sound | null>(null);
    const inputRef = useRef<TextInput>(null);

    // 効果音の読み込み
    useEffect(() => {
        let isMounted = true;
        const loadSounds = async () => {
            try {
                // 完了音
                const { sound: complete } = await Audio.Sound.createAsync(
                    require('../../../assets/sounds/word_complete.mp3')
                );
                // 戻る音
                const { sound: cancel } = await Audio.Sound.createAsync(
                    require('../../../assets/sounds/cancel.mp3')
                );

                if (isMounted) {
                    setCompleteSound(complete);
                    soundRef.current = complete;
                    setCancelSound(cancel);
                    cancelSoundRef.current = cancel;
                } else {
                    complete.unloadAsync();
                    cancel.unloadAsync();
                }
            } catch (error) {
                console.log('Failed to load sounds', error);
            }
        };

        loadSounds();

        return () => {
            isMounted = false;
            if (soundRef.current) soundRef.current.unloadAsync();
            if (cancelSoundRef.current) cancelSoundRef.current.unloadAsync();
        };
    }, []);

    const words = (() => {
        if (!currentCourse) return WORD_LIST_3000;
        if (currentCourse.price === 10000) return WORD_LIST_10000;
        if (currentCourse.price === 5000) return WORD_LIST_5000;
        return WORD_LIST_3000;
    })();

    const [targetWord, setTargetWord] = useState<Word>(
        words[Math.floor(Math.random() * words.length)]
    );

    // タイピング完了時の処理
    const onComplete = useCallback(() => {
        // 音声を最優先で（非同期で）再生
        if (completeSound) {
            completeSound.stopAsync().then(() => {
                completeSound.playAsync();
            }).catch(err => console.log('Replay error', err));
        }

        let amount = 100;
        if (currentCourse?.price === 10000) {
            amount = 500;
        } else if (currentCourse?.price === 5000) {
            amount = 300;
        } else if (currentCourse?.price === 3000) {
            amount = 100;
        }

        addScore(amount);
        const nextWord = words[Math.floor(Math.random() * words.length)];
        setTargetWord(nextWord);
    }, [currentCourse, words, addScore, completeSound]);

    const { targetRomaji, currentIndex, handleKeyPress } = useTypingLogic(targetWord, onComplete);

    // タイマー管理
    useEffect(() => {
        const interval = setInterval(() => {
            decrementTime();
        }, 1000);
        return () => clearInterval(interval);
    }, [decrementTime]);

    // リザルト画面への遷移
    useEffect(() => {
        if (status === 'result') {
            router.replace('/Result');
        }
    }, [status, router]);

    // 自動フォーカス（ゲーム開始時）
    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100); // タイムアウトを短縮して違和感を軽減
        return () => clearTimeout(timer);
    }, []);

    const handlePressScreen = () => {
        inputRef.current?.focus();
    };

    const handleExit = () => {
        if (cancelSound) {
            cancelSound.stopAsync().then(() => {
                cancelSound.playAsync();
            });
        }
        resetGame();
        router.navigate('/');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar hidden />
            <TouchableWithoutFeedback onPress={handlePressScreen}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    {/* ヘッダーエリア */}
                    <View style={styles.headerContainer}>
                        <GameHeader
                            timeRemaining={timeRemaining}
                            score={score}
                            courseName={currentCourse?.name}
                            onExit={handleExit}
                        />
                    </View>

                    {/* メインコンテンツ（センター配置） */}
                    <View style={styles.contentArea}>
                        <SushiDisplay
                            targetWord={targetWord}
                            targetRomaji={targetRomaji}
                            currentIndex={currentIndex}
                        />
                    </View>

                    {/* 固定のボトムスペーサー（レイアウトを安定させるため、出し入れしない） */}
                    <View style={styles.bottomSpacer} />

                    <TextInput
                        ref={inputRef}
                        style={styles.hiddenInput}
                        onChangeText={(text) => {
                            if (text.length > 0) {
                                for (let i = 0; i < text.length; i++) {
                                    handleKeyPress(text.charAt(i));
                                }
                            }
                        }}
                        value=""
                        autoCapitalize="none"
                        autoCorrect={false}
                        spellCheck={false}
                        keyboardType="default"
                        blurOnSubmit={false}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.base.dark,
    },
    container: {
        flex: 1,
        paddingHorizontal: 40,
    },
    headerContainer: {
        paddingTop: 20,
    },
    contentArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSpacer: {
        height: 80, // 固定値にしてガタつきを防止
    },
    hiddenInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        opacity: 0.01,
    },
});

export default GameScreen;
