import { COLORS } from '@/constants/theme';
import { useGameStore } from '@/store/useGameStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ResultScreen = () => {
    const router = useRouter();
    const { score, currentCourse, resetGame } = useGameStore();

    const handleFinish = () => {
        resetGame();
        router.replace('/');
    };

    const profitability = score - (currentCourse?.price || 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>結果発表</Text>

            <View style={styles.scoreBoard}>
                <Text style={styles.scoreLabel}>獲得金額:</Text>
                <Text style={styles.scoreValue}>{score.toLocaleString()}円</Text>

                <Text style={styles.scoreLabel}>コース料金:</Text>
                <Text style={styles.costValue}>-{currentCourse?.price.toLocaleString()}円</Text>

                <View style={styles.divider} />

                <Text style={styles.scoreLabel}>収支:</Text>
                <Text style={[styles.profitValue, { color: profitability >= 0 ? COLORS.TEA_GREEN : COLORS.DANGER }]}>
                    {profitability >= 0 ? '+' : ''}{profitability.toLocaleString()}円
                </Text>
            </View>

            <Text style={styles.message}>
                {profitability > 0 ? 'おトクでした！' : '残念、損してしまいました...'}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleFinish}
            >
                <Text style={styles.buttonText}>タイトルへ戻る</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WOOD_DARK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 48,
        color: COLORS.TEXT_GOLD,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    scoreBoard: {
        backgroundColor: '#FFF',
        padding: 40,
        borderRadius: 20,
        width: 500,
        alignItems: 'center',
    },
    scoreLabel: {
        fontSize: 20,
        color: '#666',
        marginTop: 10,
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.TEXT_MAIN,
    },
    costValue: {
        fontSize: 32,
        color: COLORS.DANGER,
    },
    divider: {
        height: 2,
        backgroundColor: '#EEE',
        width: '100%',
        marginVertical: 20,
    },
    profitValue: {
        fontSize: 56,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 32,
        color: '#FFF',
        marginTop: 40,
        marginBottom: 60,
    },
    button: {
        backgroundColor: COLORS.WOOD_MEDIUM,
        paddingHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 24,
    }
});

export default ResultScreen;
