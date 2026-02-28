import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CourseSelect = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>コース選択</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>お手軽 3,000円コース</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7CCC8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        marginBottom: 40,
    },
    button: {
        padding: 20,
        backgroundColor: '#5D4037',
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 24,
    },
});

export default CourseSelect;
