import { COLORS } from '@/constants/theme';
import { Course, useGameStore } from '@/store/useGameStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COURSES: Course[] = [
    { id: '3000', name: 'お手軽 3,000円コース', price: 3000, timeLimit: 60 },
    { id: '5000', name: 'お勧め 5,000円コース', price: 5000, timeLimit: 90 },
    { id: '10000', name: '高級 10,000円コース', price: 10000, timeLimit: 120 },
];

const CourseSelect = () => {
    const router = useRouter();
    const startCourse = useGameStore((state) => state.startCourse);

    const handleSelect = (course: Course) => {
        startCourse(course);
        router.push('/GameScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>お品書きを選んでください</Text>
            <View style={styles.courseContainer}>
                {COURSES.map((course) => (
                    <TouchableOpacity
                        key={course.id}
                        style={styles.courseCard}
                        onPress={() => handleSelect(course)}
                    >
                        <Text style={styles.courseText}>{course.name}</Text>
                        <Text style={styles.detailsText}>{course.timeLimit}秒 / 初級〜</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backButtonText}>戻る</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WOOD_LIGHT,
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: COLORS.WOOD_DARK,
        marginBottom: 60,
    },
    courseContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
    },
    courseCard: {
        width: 300,
        height: 400,
        backgroundColor: '#FFF',
        borderWidth: 10,
        borderColor: COLORS.WOOD_MEDIUM,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    courseText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.WOOD_DARK,
        marginBottom: 20,
    },
    detailsText: {
        fontSize: 18,
        color: '#666',
    },
    backButton: {
        marginTop: 60,
    },
    backButtonText: {
        fontSize: 20,
        color: COLORS.WOOD_DARK,
        textDecorationLine: 'underline',
    }
});

export default CourseSelect;
