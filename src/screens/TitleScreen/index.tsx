import { AppColors, FONTS } from '@/constants/theme';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const TitleScreen = () => {
    const router = useRouter();
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const loadSound = async () => {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../../assets/sounds/decide.mp3')
            );
            setSound(newSound);
        };
        loadSound();

        return () => {
            sound?.unloadAsync();
        };
    }, []);

    const handleStart = useCallback(async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.playAsync();
        }
        router.push('/CourseSelect');
    }, [router, sound]);

    return (
        <View style={styles.container}>
            {/* 画面全体のフラッシュを削除 */}

            {/* 背景の装飾的な要素 */}
            <View style={styles.decoCircle} />

            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>打</Text>
                    <View style={styles.logoLine} />
                    <Text style={styles.logoSubText}>TYPING GAME</Text>
                </View>

                <Text style={styles.brandTitle}>打 タイピング</Text>
                <Text style={styles.description}>
                    静寂の中で、指先を研ぎ澄ます。
                </Text>

                <TouchableOpacity
                    style={styles.startButton}
                    activeOpacity={0.8}
                    onPress={handleStart}
                >
                    <Text style={styles.buttonText}>修行を始める</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>PREMIUM ZEN EDITION</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.base.dark,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    decoCircle: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: AppColors.base.matcha,
        opacity: 0.1,
        top: -width * 0.2,
        right: -width * 0.2,
    },
    content: {
        alignItems: 'center',
        zIndex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        fontSize: 120,
        color: AppColors.text.gold,
        includeFontPadding: false,
        fontFamily: FONTS.KAISHO,
    },
    logoLine: {
        width: 60,
        height: 4,
        backgroundColor: AppColors.accent.gold,
        marginVertical: 10,
    },
    logoSubText: {
        fontSize: 14,
        letterSpacing: 8,
        color: AppColors.text.secondary,
        fontWeight: '600',
        fontFamily: FONTS.KLEE,
    },
    brandTitle: {
        fontSize: 32,
        fontWeight: '300',
        color: AppColors.text.primary,
        marginBottom: 10,
        letterSpacing: 2,
        fontFamily: FONTS.KLEE,
    },
    description: {
        fontSize: 16,
        color: AppColors.text.secondary,
        marginBottom: 60,
        fontStyle: 'italic',
        fontFamily: FONTS.KLEE,
    },
    startButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 60,
        paddingVertical: 18,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: AppColors.accent.gold,
    },
    buttonText: {
        color: AppColors.text.gold,
        fontSize: 20,
        fontFamily: FONTS.KLEE,
        letterSpacing: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        color: AppColors.text.secondary,
        fontSize: 12,
        letterSpacing: 4,
        opacity: 0.5,
        fontFamily: FONTS.KLEE,
    },
});

export default TitleScreen;
