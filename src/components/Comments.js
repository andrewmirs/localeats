import React, { Component } from 'react';
import { FlatList, Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import { auth, database, f, storage } from '../../config/config';
import { api_key } from '../../config/google_maps_api';


class Comments extends Component {

    constructor(props){
        super(props);

        this.state = {
            comments_list: [],
            refresh: false,
            loading: true,
        }

    }

    componentDidMount = () => {
        this.checkParams();
    }

    checkParams = () => {
        const params = this.props.navigation.state.params;
        if(params){
            if(params.favId){
                this.setState({
                    favId: params.favId,
                });
                this.fetchComments(params.favId);
                this.fetchFavoriteInfo(params.favId);
            } 
        }
    }

    addCommentToList = (comments_list, data, comment) => {
        
        var that = this;
        var commentObj = data[comment];
        database.ref('users').child(commentObj.author).once('value').then(function(snapshot){

            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();

                comments_list.push({
                    id: comment,
                    comment: commentObj.comment,
                    posted: that.timeConverter(commentObj.posted),
                    author: data.username,
                    authorAvatar: data.avatar,
                    authorId: commentObj.author,
                });

                that.setState({
                    refresh: false,
                    loading: false,
                });

        }).catch(error => console.log(error));

    }

    fetchAvatar = (author) => {

        var that = this;

        database.ref('users').child(author).once('value').then(function(snapshot){

            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                const username = that.userNameFix(data.username);
                that.setState({
                    fav_author_avatar: data.avatar,
                    fav_author: username,
                });

        }).catch(error => console.log(error));       

    }

    fetchFavoriteInfo = (favId) => {
        
        var that = this;

        database.ref('favorites').child(favId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists){
                data = snapshot.val();
                that.fetchAvatar(data.author);

                that.setState({
                    fav_photo: data.photo,
                    fav_favorite: data.favorite,
                    fav_caption: data.caption,
                });
            }
        }).catch(error => console.log(error));

    }

    fetchComments = (favId) => {

        var that = this;

        database.ref('comments').child(favId).orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists){
                data = snapshot.val();
                var comments_list = that.state.comments_list;

                for( var comment in data ){
                    that.addCommentToList(comments_list, data, comment);
                }


            } else {
                // no comments found
                that.setState({
                    comments_list: [],
                });
            }
        }).catch(error => console.log(error));
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    pluralCheck = (s) => {
        if(s == 1){
            return ' ago';
        } else {
            return 's ago';
        }
    }

    timeConverter = (timestamp) => {

        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);

        // Years
        var interval = Math.floor(seconds / 31536000);
        if(interval >= 1){
            return interval + ' year' + this.pluralCheck(interval);
        }

        // Months
        interval = Math.floor(seconds / 2592000);
        if(interval >= 1){
            return interval + ' month' + this.pluralCheck(interval);
        }

        // Days
        interval = Math.floor(seconds / 86400);
        if(interval >= 1){
            return interval + ' day' + this.pluralCheck(interval);
        }

        // Hours
        interval = Math.floor(seconds / 3600);
        if(interval >= 1){
            return interval + ' hour' + this.pluralCheck(interval);
        }

        // Minutes
        interval = Math.floor(seconds / 60);
        if(interval >= 1){
            return interval + ' minute' + this.pluralCheck(interval);
        }

        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
    }

    userNameFix = (username) => {
        var str = username.substr(1);
        return str;
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'Comments', style: { color: '#fff', fontFamily: 'horizon', fontSize: 30 } }}
                    rightComponent={{ color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#b23f2e',
                        }}
                />
                <ImageBackground 
                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.state.fav_photo}&key=${api_key}`}}
                    style={styles.favImage}
                >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', height: 150, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                         <Image source={{ uri: `${this.state.fav_author_avatar}`}} style={{ height: 85, width: 85, borderRadius: 100, borderWidth: 2, borderColor: 'black', marginLeft: 10 }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>"{this.state.fav_caption}"</Text>
                            <Text style={{ fontSize: 12, color: 'lightgrey' }}>- {this.state.fav_author}</Text>
                        </View>
                    </View>
                </ImageBackground>
                { this.state.comments_list.length == 0 ? (
                    // no comments show empty state
                    <Text>No comments found..</Text>
                ) : (
                    // comments available
                    <FlatList
                        refreshing={this.state.refresh} 
                        data={this.state.comments_list}
                        keyExtractor={( item, index ) => index.toString()}
                        style={{ flex: 1, backgroundColor: '#eee'}}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.commentContainer}>
                                
                                <TouchableOpacity>
                                    <Image source={{ uri: `${item.authorAvatar}`}} style={{ height: 50, width: 50, borderRadius: 100, borderWidth: 1, borderColor: 'black', margin: 5 }} />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                    <Text style={{ fontWeight: 'bold' }}>{this.userNameFix(item.author)}: </Text><Text>{item.comment}</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 2, paddingRight: 4 }}>
                                    <Text style={{ fontSize: 8, color: 'grey' }}>{item.posted}</Text>
                                </View>

                            </View>
                        )}
                    />
                )}
                <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1, borderTopWidth: 1, borderTopColor: 'grey', padding: 10, marginBottom: 15}} keyboardVerticalOffset={80}>
                    <View>
                        <TextInput 
                            editable={true}
                            placeholder={'Add a comment..'}
                            onChangeText={(text) => this.setState({comment: text})}
                            style={{ marginVertical: 10, height: 10, padding: 5, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white', color: 'black' }}
                        />
                        <TouchableOpacity onPress={() => alert('Comment Posted')}>
                            <Text>Post</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commentContainer: {
        width: '96%', 
        marginHorizontal: '2%', 
        flexDirection: 'row', 
        overflow: 'hidden', 
        justifyContent: 'space-between', 
        backgroundColor: 'white', 
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    favImage: {
        resizeMode: 'cover',
        width: '100%',
        height: 150,
    },
});

export default Comments;