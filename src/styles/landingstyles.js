import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    btnEye: {
        position: 'absolute',
        top: 10,
        right: 37,
        zIndex: 2,
    },
    buttonContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: 100,
        width,
        height: width * (9 / 12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: "80%",
        height: "80%",
        resizeMode: 'contain'
    },
    input: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
    },
    inputContainer: {
        marginTop: 10,
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37,
        zIndex: 2,
    },
    landingPage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height,
        width,
    },
    signInButton: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 1.0)',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInText: {
        color: "#b23f2e",
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    signUpText: {
        color: '#b23f2e',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    subTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitleText: {
        color: 'black',
        fontSize: 18,
    },
    title: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        fontFamily: 'Roboto',
    },
    titleText: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
  });

export default styles;