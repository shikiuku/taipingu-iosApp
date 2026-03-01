import { AppColors, FONTS } from '@/constants/theme';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GameHeaderProps {
    timeRemaining: number;
    score: number;
    courseName?: string;
    onExit: () => void;
}

export const GameHeader = memo(({
    timeRemaining,
    score,
    courseName,
    onExit,
}: GameHeaderProps) => (
    <View style={styles.header}>
        <View>
            <Text style={styles.courseSubtitle}>SESSION</Text>
            <Text style={styles.courseName}>{courseName}</Text>
        </View>

        <View style={styles.headerCenter}>
            <Text style={styles.timerLabel}>REMAINING</Text>
            <Text style={styles.timerValue}>
                {String(timeRemaining).padStart(3, '0')}
            </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.scoreLabel}>BENEFIT</Text>
            <Text style={styles.scoreValue}>
                {score.toLocaleString()} <Text style={styles.currency}>円</Text>
            </Text>
            <TouchableOpacity style={styles.exitButton} onPress={onExit} activeOpacity={0.7}>
                <Text style={styles.exitButtonText}>中断</Text>
            </TouchableOpacity>
        </View>
    </View>
));

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 10,
    },
    headerCenter: {
        alignItems: 'center',
    },
    courseSubtitle: {
        fontSize: 12,
        letterSpacing: 4,
        color: AppColors.text.secondary,
        marginBottom: 4,
        fontFamily: FONTS.KLEE,
    },
    courseName: {
        fontSize: 24,
        color: AppColors.text.primary,
        fontWeight: '200',
        letterSpacing: 2,
    },
    timerLabel: {
        fontSize: 10,
        letterSpacing: 4,
        color: AppColors.text.secondary,
        marginBottom: 2,
        fontFamily: FONTS.KLEE,
    },
    timerValue: {
        fontSize: 48,
        color: AppColors.text.primary,
        fontWeight: '300',
        fontVariant: ['tabular-nums'],
    },
    scoreLabel: {
        fontSize: 12,
        letterSpacing: 4,
        color: AppColors.text.secondary,
        marginBottom: 4,
        fontFamily: FONTS.KLEE,
    },
    scoreValue: {
        fontSize: 48,
        color: AppColors.text.gold,
        fontFamily: FONTS.KLEE,
    },
    currency: {
        fontSize: 24,
        color: AppColors.text.secondary,
        fontFamily: FONTS.KLEE,
        marginLeft: 4,
    },
    exitButton: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    exitButtonText: {
        color: AppColors.text.secondary,
        fontSize: 12,
        letterSpacing: 2,
        fontFamily: FONTS.KLEE,
    },
});
