import React, { Component } from 'react';
import { Dimensions, Image, FlatList, StyleSheet, Text, View } from 'react-native';
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
                                <Text>Place</Text>
                                <Text>@username</Text>
                            </View>
                            <View>
                                <Image 
                                    source={{ uri: 'https://source.unsplash.com/random/500x'+Math.floor((Math.random() * 800) + 500) }}
                                    style={styles.image}
                                />
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
        height: 275,
    },
    pickComponent: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    pickFooter: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pickHeader: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Feed;

