import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    font: {
        color: 'white'
    },
    profileInfoContainer: {
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingVertical: 10
    },
    profilepage: {
        flex: 1, 
        backgroundColor: '#EB9486',
        borderColor: 'lightgrey',
        padding: 30,
        height: 70
    },
    picture: {
        marginLeft: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    signOutButton: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#b23f2e',
        justifyContent: 'center',
        marginTop: 40,
    },
    signOutText: {
        color: "rgba(255, 255, 255, 1.0)",
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
});

export default styles;