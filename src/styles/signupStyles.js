import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#b23f2e',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    submitText: {
        color: "rgba(255, 255, 255, 1.0)",
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
});

export default styles;