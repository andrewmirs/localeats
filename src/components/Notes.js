import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class Notes extends Component {
   
    constructor(props){
        super(props);

        this.state={
            favoritesList: [],
            favorite: null,
            details: null,
            notes: '',
        };
      
    }

    // componentDidMount = () => {
    //     const { navigation } = this.props;
    //     const favorite = navigation.getParam('favorite', "Favorite didn't make it");
    //     const details = navigation.getParam('details', "Details didn't make it");

    //     this.setState({
    //         details,
    //         favorite
    //     });
    // }

    render(){
        const { height, width } = Dimensions.get('window');
        console.log('State in Notes Component:', this.state);
        return (
            <View style={styles.container}>
                    <View>
                        <Text>I've reached the notes page!!</Text>
                    </View>
                    <View style={{mareginTop: 40, flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                            <View style={{ width: width / 2 - 30, height: width / 2 - 30, borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover',
                                        borderTopLeftRadius: 5, borderTopRightRadius: 5, }} 
                                        source={require('../../assets/images/northitalia.jpeg')} 
                                    />
                                </View>
                                <View style={{ flex: -1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10, paddingBottom: 5 }}>
                                    <Text style={{ fontSize: 12, color: '#b63838'}}>Favorite Spagetti Spot</Text>
                                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>North Italia</Text>
                                    <Text style={{ fontSize: 10 }}>Website Link</Text>
                                </View>
                                <View style={{ flex: -1, height: 30, flexDirection: 'row', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'grey'}}>
                                    <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: 'grey', borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name={`ios-call`} size={18} color='darkgrey' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: 'darkgrey', borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name={`ios-pin`} size={18} color='grey' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                            <View style={{ width: width / 2 - 30, height: width / 2 - 30, borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover',
                                        borderTopLeftRadius: 5, borderTopRightRadius: 5, }} 
                                        source={require('../../assets/images/northitalia.jpeg')} 
                                    />
                                </View>
                                <View style={{ flex: -1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10, paddingBottom: 5 }}>
                                    <Text style={{ fontSize: 12, color: '#b63838'}}>Favorite Spagetti Spot</Text>
                                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>North Italia</Text>
                                    <Text style={{ fontSize: 10 }}>Website Link</Text>
                                </View>
                                <View style={{ flex: -1, height: 30, flexDirection: 'row', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'grey'}}>
                                    <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: 'grey', borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name={`ios-call`} size={18} color='darkgrey' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: 'darkgrey', borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name={`ios-pin`} size={18} color='grey' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
        );
    }
}


const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: 'white',
        justifyContent: 'center', 
    },
});

export default Notes;