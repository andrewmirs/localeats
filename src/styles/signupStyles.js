import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 40,
        justifyContent: 'flex-start',
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 200,
        textAlign: 'center',
        margin: 10,
    },
    submitButton: {
        backgroundColor: 'purple',
        color: 'white',
        fontSize: 16,
        height: 37,
        width: 200,
        textAlign: 'center',
        padding: 10,
    }
});

export default styles;