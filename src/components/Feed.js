import React, { Component } from 'react';
import { Dimensions, ImageBackground, FlatList, StyleSheet, Text, View } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';

class Feed extends Component {
    constructor(props){
        super(props);

        this.state = {
            photo_feed: [0,1,2,3,4],
            refresh: false,
        }
    }

    loadNew = () => {
        this.setState({
            refresh: true,
        });
        this.setState({
            photo_feed: [5,6,7,8,9],
            refresh: false,
        })
    }

    render() {

        return(
            <View style={styles.feedContainer}>

                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    data={this.state.photo_feed}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.flatlist}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.pickComponent}>
                            <View style={styles.pickHeader}>
                                <Text style={styles.place}>North Italia</Text>
                                <Text style={styles.username}>@username</Text>
                            </View>
                            <View>
                                <ImageBackground 
                                    source={{ uri: 'https://source.unsplash.com/random/500x'+Math.floor((Math.random() * 800) + 500) }}
                                    style={styles.image}
                                >
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.titleText}>Brunch Spot</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.pickFooter}>
                                <FontAwesome name={`comments-o`} size={21} color='grey' onPress={() => alert('touched')} />
                                <Feather name={`phone`} size={20} color='grey' />
                                <Entypo name={`location-pin`} size={21} color='grey' />
                            </View>
                        </View>
                    )}
                />
                
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
    },
    flatlist: {
        flex: 1,
        backgroundColor: '#eee'
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 225,
    },
    pickComponent: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 1,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    pickFooter: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    pickHeader: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
    },
    place: {
        color: 'white',
    },
    titleContainer: {
        width: '100%',
        paddingTop: 2,
        paddingBottom: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        marginTop: 20,
    },
    titleText: {
        fontSize: 25,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'lobster',
    },
    username: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Feed;

