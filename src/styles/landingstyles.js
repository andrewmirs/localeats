import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: 'white',
        width,
        height: width * (9 / 12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: "80%",
        height: "80%",
    },
    landingPage: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      height,
      width,
    },
    signInButton: {
        backgroundColor: 'rgb(175,175,175)',
        width: '40%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 2,
    },
    signInText: {
        color: "white",
        fontSize: 18,
        margin: 5,
    },
    signUpButton: {
        backgroundColor: 'pink',
        width: '40%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderRadius: 2,
    },
    signUpText: {
        color: 'black',
        fontSize: 18,
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