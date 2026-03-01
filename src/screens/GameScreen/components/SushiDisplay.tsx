import { AppColors, FONTS } from '@/constants/theme';
import { Word } from '@/constants/words';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SushiDisplayProps {
    targetWord: Word;
    targetRomaji: string;
    currentIndex: number;
}

export const SushiDisplay = memo(({
    targetWord,
    targetRomaji,
    currentIndex,
}: SushiDisplayProps) => (
    <View style={styles.counterArea}>
        <View style={styles.displayBoard}>
            <View style={styles.kanjiContainer}>
                <Text style={styles.kanjiText}>
                    {targetWord.kanji}
                </Text>
            </View>
            <Text style={styles.kanaText}>{targetWord.kana}</Text>

            <View style={styles.romajiContainer}>
                {targetRomaji.split('').map((char, i) => (
                    <Text
                        key={i}
                        style={[
                            styles.romajiChar,
                            i < currentIndex ? styles.typedChar : styles.untypedChar,
                        ]}
                    >
                        {char}
                    </Text>
                ))}
            </View>

            <View style={styles.pedestal} />
        </View>
    </View>
));

const styles = StyleSheet.create({
    counterArea: {
        width: '100%',
        alignItems: 'center',
    },
    displayBoard: {
        alignItems: 'center',
        width: '100%',
    },
    kanjiContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(197, 160, 89, 0.2)',
        marginBottom: 20,
    },
    kanjiText: {
        fontSize: 84,
        color: AppColors.text.primary,
        fontFamily: FONTS.KLEE,
        letterSpacing: 8,
    },
    kanaText: {
        fontSize: 18,
        color: AppColors.text.secondary,
        letterSpacing: 8,
        fontFamily: FONTS.KLEE,
    },
    romajiContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    romajiChar: {
        fontSize: 42,
        fontWeight: '300',
        textTransform: 'lowercase',
        letterSpacing: 2,
        fontFamily: FONTS.KLEE,
    },
    typedChar: {
        color: AppColors.accent.goldDim,
        opacity: 0.5,
    },
    untypedChar: {
        color: AppColors.accent.goldLight,
    },
    pedestal: {
        width: 200,
        height: 2,
        backgroundColor: AppColors.accent.gold,
        marginTop: 40,
        opacity: 0.3,
    },
});
