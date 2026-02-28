import { COLORS } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TitleScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>打（タイピング）</Text>
            <Text style={styles.subLogo}>Sushida Style</Text>

            <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('CourseSelect')}
            >
                <Text style={styles.buttonText}>スタート</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>iPad Landscape Optimized</Text>
            </View>
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
    logo: {
        fontSize: 80,
        fontWeight: 'bold',
        color: COLORS.TEXT_GOLD,
        marginBottom: 10,
    },
    subLogo: {
        fontSize: 24,
        color: COLORS.WOOD_LIGHT,
        marginBottom: 60,
    },
    startButton: {
        backgroundColor: COLORS.WOOD_MEDIUM,
        paddingHorizontal: 80,
        paddingVertical: 20,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: COLORS.TEXT_GOLD,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
    },
    footerText: {
        color: COLORS.WOOD_LIGHT,
        opacity: 0.6,
    },
});

export default TitleScreen;
