import { AppColors, FONTS } from '@/constants/theme';
import { useGameStore } from '@/store/useGameStore';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ResultScreen = () => {
    const router = useRouter();
    const { score, currentCourse, resetGame } = useGameStore();

    const [cancelSound, setCancelSound] = React.useState<Audio.Sound | null>(null);

    React.useEffect(() => {
        const loadSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require('../../../assets/sounds/cancel.mp3')
                );
                setCancelSound(sound);
            } catch (error) {
                console.error("Cancel sound load error:", error);
            }
        };
        loadSound();

        return () => {
            cancelSound?.unloadAsync();
        };
    }, []);

    const handleFinish = async () => {
        if (cancelSound) {
            await cancelSound.stopAsync();
            await cancelSound.playAsync();
        }
        resetGame();
        router.replace('/');
    };

    const profitability = score - (currentCourse?.price || 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.subtitle}>EVALUATION</Text>
                <Text style={styles.title}>結果発表</Text>
            </View>

            <View style={styles.scoreBoard}>
                <View style={styles.row}>
                    <Text style={styles.label}>獲得金額</Text>
                    <Text style={styles.value}>{score.toLocaleString()}円</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>修練費用</Text>
                    <Text style={[styles.value, { color: AppColors.text.danger }]}>
                        -{currentCourse?.price.toLocaleString()}円
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>収支</Text>
                    <Text style={[
                        styles.resultValue,
                        { color: profitability >= 0 ? AppColors.accent.gold : AppColors.text.danger }
                    ]}>
                        {profitability >= 0 ? '+' : ''}{profitability.toLocaleString()}円
                    </Text>
                </View>
            </View>

            <Text style={styles.message}>
                {profitability > 0 ? '見事な腕前です。' : 'さらなる修行が必要です。'}
            </Text>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleFinish}
            >
                <Text style={styles.buttonText}>タイトル画面へ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.base.dark,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    subtitle: {
        fontSize: 12,
        letterSpacing: 6,
        color: AppColors.accent.gold,
        marginBottom: 8,
    },
    title: {
        fontSize: 48,
        color: AppColors.text.primary,
        fontFamily: FONTS.KAISHO,
        letterSpacing: 4,
    },
    scoreBoard: {
        backgroundColor: AppColors.ui.glassMatcha,
        paddingHorizontal: 60,
        paddingVertical: 50,
        borderRadius: 4,
        width: 600,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: AppColors.text.secondary,
        letterSpacing: 2,
    },
    value: {
        fontSize: 28,
        color: AppColors.text.primary,
        fontWeight: '400',
    },
    divider: {
        height: 1,
        backgroundColor: AppColors.ui.divider,
        width: '100%',
        marginVertical: 30,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    resultLabel: {
        color: AppColors.text.secondary,
        fontSize: 14,
        letterSpacing: 4,
        marginBottom: 8,
        fontFamily: FONTS.KLEE,
    },
    resultValue: {
        fontSize: 56,
        fontFamily: FONTS.KAISHO,
        letterSpacing: -1,
    },
    message: {
        fontSize: 24,
        color: AppColors.text.primary,
        fontWeight: '200',
        marginTop: 60,
        marginBottom: 80,
        letterSpacing: 2,
    },
    button: {
        paddingHorizontal: 80,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: AppColors.accent.gold,
    },
    buttonText: {
        color: AppColors.text.gold,
        fontSize: 18,
        letterSpacing: 4,
        fontFamily: FONTS.KLEE,
    }
});

export default ResultScreen;
