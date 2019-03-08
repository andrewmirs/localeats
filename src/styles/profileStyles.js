import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    buttonContainer: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    header: {
        height: 70, 
        padding: 30, 
        backgroundColor: 'white', 
        borderColor: 'lightgrey', 
        borderBottomWidth: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
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
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 15

    },
    signOutText: {
        color: "grey",
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
});

export default styles;