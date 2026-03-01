import { AppColors, FONTS } from '@/constants/theme';
import { Course, useGameStore } from '@/store/useGameStore';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COURSES: Course[] = [
    { id: '3000', name: '壱の試練', price: 3000, timeLimit: 60 },
    { id: '5000', name: '弐の試練', price: 5000, timeLimit: 90 },
    { id: '10000', name: '参の試練', price: 10000, timeLimit: 120 },
];

const CourseSelect = () => {
    const router = useRouter();
    const startCourse = useGameStore((state) => state.startCourse);
    const [cursorSound, setCursorSound] = useState<Audio.Sound | null>(null);
    const [cancelSound, setCancelSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const loadSounds = async () => {
            try {
                const { sound: cursor } = await Audio.Sound.createAsync(
                    require('../../../assets/sounds/cursor.mp3')
                );
                const { sound: cancel } = await Audio.Sound.createAsync(
                    require('../../../assets/sounds/cancel.mp3')
                );
                setCursorSound(cursor);
                setCancelSound(cancel);
            } catch (error) {
                console.error("Sound load error:", error);
            }
        };
        loadSounds();

        return () => {
            cursorSound?.unloadAsync();
            cancelSound?.unloadAsync();
        };
    }, []);

    const handleSelect = async (course: Course) => {
        if (cursorSound) {
            await cursorSound.stopAsync();
            await cursorSound.playAsync();
        }
        startCourse(course);
        router.push('/GameScreen');
    };

    const handleBack = async () => {
        if (cancelSound) {
            await cancelSound.stopAsync();
            await cancelSound.playAsync();
        }
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Text style={styles.subtitle}>SELECT COURSE</Text>
                <Text style={styles.title}>お品書きを選んでください</Text>
            </View>

            <View style={styles.courseWrapper}>
                {COURSES.map((course) => (
                    <TouchableOpacity
                        key={course.id}
                        activeOpacity={0.7}
                        style={styles.courseCard}
                        onPress={() => handleSelect(course)}
                    >
                        <View style={styles.cardIndicator} />
                        <Text style={styles.coursePrice}>{course.price.toLocaleString()}円</Text>
                        <Text style={styles.courseName}>{course.name}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.detailsText}>制限時間: {course.timeLimit}秒</Text>
                        <Text style={styles.levelText}>
                            {course.price === 3000 ? '初級' : course.price === 5000 ? '中級' : '上級'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
            >
                <Text style={styles.backButtonText}>戻る</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.base.dark,
        alignItems: 'center',
        paddingTop: 80,
    },
    headerArea: {
        alignItems: 'center',
        marginBottom: 80,
    },
    subtitle: {
        fontSize: 14,
        letterSpacing: 6,
        color: AppColors.accent.gold,
        marginBottom: 10,
        fontWeight: '600',
        fontFamily: FONTS.KLEE,
    },
    title: {
        fontSize: 36,
        color: AppColors.text.primary,
        fontFamily: FONTS.KAISHO,
        letterSpacing: 2,
    },
    courseWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        paddingHorizontal: 40,
    },
    courseCard: {
        width: 280,
        height: 380,
        backgroundColor: AppColors.ui.glassMatcha,
        borderRadius: 4,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(197, 160, 89, 0.3)', // goldDim
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    cardIndicator: {
        position: 'absolute',
        top: 20,
        width: 40,
        height: 2,
        backgroundColor: AppColors.accent.gold,
    },
    coursePrice: {
        fontSize: 18,
        color: AppColors.text.gold,
        fontWeight: '600',
        marginBottom: 10,
        letterSpacing: 2,
        fontFamily: FONTS.KLEE,
    },
    courseName: {
        fontSize: 32,
        fontFamily: FONTS.KAISHO,
        textAlign: 'center',
        color: AppColors.text.primary,
        marginBottom: 30,
    },
    divider: {
        width: '40%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 30,
    },
    detailsText: {
        fontSize: 16,
        color: AppColors.text.secondary,
        marginBottom: 10,
        fontFamily: FONTS.KLEE,
    },
    levelText: {
        fontSize: 14,
        color: AppColors.accent.gold,
        fontWeight: '300',
        letterSpacing: 3,
        fontFamily: FONTS.KLEE,
    },
    backButton: {
        marginTop: 80,
        padding: 10,
    },
    backButtonText: {
        fontSize: 14,
        color: AppColors.text.secondary,
        letterSpacing: 4,
        textDecorationLine: 'underline',
    }
});

export default CourseSelect;
