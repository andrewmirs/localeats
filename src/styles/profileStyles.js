import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    acceptButton: {
        width: width - 55,
        height: 45,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 15,
        paddingVertical: 15

    },
    buttonContainer: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: "grey",
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    cancelButton: {
        width: width - 55,
        height: 45,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginVertical: 15,
        paddingVertical: 15

    },
    editTitle: {
        color: "grey",
        fontSize: 18,
    },
    font: {
        color: 'white'
    },
    headerBackground: {
        flex: 1,
        width: width,
        height: 300,
        backgroundColor: 'lightgrey',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    location: {
        fontSize: 12,
        color: 'black',
        fontWeight: '300'
    },
    name: {
        marginTop: 20,
        fontSize: 14,
        color: 'darkgrey',
        fontWeight: 'bold',
    },
    profilepage: {
        flex: 1, 
        backgroundColor: 'white',
    },
    profilePic: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 4,
    },
    profilePicWrap: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0, 0.4)',
        borderWidth: 16,
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
    username: {
        fontSize: 12,
        color: 'black',
        fontWeight: '300',
    },
});

export default styles;