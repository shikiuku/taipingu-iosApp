import { StyleSheet, Text, View } from 'react-native';

const GameScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Game Screen (Sushi Counter)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8D6E63',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        color: '#FFF',
    },
});

export default GameScreen;
