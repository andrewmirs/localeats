import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { auth, database, f, storage } from '../../config/config';
import styles from '../styles/profileStyles';
import EditProfile from './EditProfile';
import ProfileHeader from './ProfileHeader';
import LocalPick from './LocalPick';
import Icon from '../../assets/images/localpick-icon.png';

class Profile extends Component {

    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#b23f2e',
        },
        headerTintColor: '#fff',
    };

    constructor(props){
        super(props);
        this.state={
            avatar: 'https://api.adorable.io/avatars/285/test@user.r.png',
            firstname: '',
            lastname: '',
            location: '',
            userId: '',
            username: '',
            loggedin: false,
            editProfile: false,
            loading: true,
            favorites: [],
        }
    }

    componentDidMount = () => {
        const that = this;
        f.auth().onAuthStateChanged(function(user) {
            if(user){
                that.fetchUserInfo(user.uid);
                that.fetchFavorites(user.uid);
            } else {
                console.log('No user data! Either not logged in or database error')
            }
        });
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.isFocused !== this.props.isFocused){
            this.fetchFavorites(this.state.userId);
        }
    }

    fetchFavorites = (userId) => {
        var that = this;
        database.ref('users').child(userId).child('favorites').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            var arrayOfData = [];
                for(var user in data){
                    if (data[user].author == userId){
                        arrayOfData.push(data[user]);
                    }
                }
                
                that.setState({
                    favorites: arrayOfData,
                    loading: false,
                });
        });
    }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    location: data.location,
                    avatar: data.avatar,
                    userId: userId,
                    loggedin: true,
                    loading: false,
                });
        });
    }

    signOutUser = () => {
        auth.signOut()
        .then(() => {
            this.props.navigation.navigate('Landing');
            console.log('Signed out!!!')
        }).catch((err) => {
            console.log('Error', err);
        }); 
    }

    editProfile = () => {
        this.setState({
            editProfile: true,
        })
    }

    cancelEdit = () => {
        this.setState({
            editProfile: false,
        })
    }

    updateProfile = (firstname, lastname, username) => {

        var un = username.toLowerCase();
        database.ref('users').child(this.state.userId).child('firstname').set(firstname);
        database.ref('users').child(this.state.userId).child('lastname').set(lastname);
        database.ref('users').child(this.state.userId).child('username').set(`@${un}`);
        this.setState({
            editProfile: false,
        })
        this.fetchUserInfo(this.state.userId);
        
    }

    // create a unique ID for each avatar photo being saved to storage
     s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    // permissions for camera use
    _checkPermisions = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera: status});

        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({cameraRoll: statusRoll});
    }

    // function to pick image from phone storage
    _pickImage = async () => {
        this._checkPermisions();
        var avatar = this.state.avatar
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: false,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({  
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: result.uri 
                
        });
        this.uploadImage(this.state.uri);
        } else{
            this.setState({
                imageSelected: false
            })
        }
    };

    // take chosen image and format to blob to be processed in server
    uploadImage = async (uri) => {
        //
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = that.state.imageId;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];

        this.setState({
        currentFileType: ext,
        uploading:true
        });

        var FilePath = imageId+'.'+that.state.currentFileType;
        const oReq = new XMLHttpRequest();
        oReq.open("GET", uri, true);
        oReq.responseType = "blob";
        oReq.onload = () => {
            const blob = oReq.response;
            //Call function to complete upload with the new blob to handle the uploadTask.
            database.ref("users/" + userid + "/currentImg/").set(FilePath)
            this.completeUploadBlob(blob, FilePath);
        };
        oReq.send();
    }

    //once file is formatted it is sent to firebase storage and a url is saved to firebase database
    completeUploadBlob = (blob, FilePath) => {
        var that = this;
        var userid = f.auth().currentUser.uid;
        var currentAvatar = that.state.currentImg
        // var imageId = this.state.imageId;

        var uploadTask = storage.ref('user/'+userid+'/img').child(FilePath).put(blob);

        uploadTask.on('state_changed', function(snapshot){
          var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        console.log('Upload is '+progress+'% complete');
        that.setState({
            progress:progress,
        });
        }, function(error) {
        console.log('error with upload - '+error);
        }, function(){
        //complete
        that.setState({progress:100});
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            that.processUpload(downloadURL)
            if(currentAvatar){
                storage.ref('user/'+userid+'/img/').child(currentAvatar).delete().then(function(){
                    that.processUpload(downloadURL)
                }).catch(function(error){
                    console.log(error)
                })
            }else{
                that.processUpload(downloadURL)
            };
        });
        }) 
    }

    // the downloadURL is sent to firebase database and state is reset
    processUpload = imageUrl => {
        var userId = f.auth().currentUser.uid;
        database.ref("users/" + userId + "/avatar/").set(imageUrl)
        alert("Profile picture has been updated");
    
        this.setState({
        uploading: false,
        imageSelected: false,
        uri: "",
        avatar: imageUrl
        });
    };

    render(){
        
        const localpicks = this.state.favorites.map(( pick, index ) => (
            <LocalPick 
                favorite={pick.favorite} 
                phonenumber={pick.phonenumber} 
                name={pick.name}
                photo={pick.photo}
                rating={pick.rating}
                latitude={pick.latitude}
                longitude={pick.longitude}
                placeId={pick.placeId}
                key={index}
            />
        ));

        return(
            <View style={{ flex: 1 }}>
                {this.state.loading == true ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image 
                            source={Icon}
                            resizeMode='contain'
                            style={{ height: 150, marginBottom: 30 }}
                        />
                        <ActivityIndicator size="large" color="#b23f2e" />
                    </View>
                ) : (
                <View style={styles.profilepage}>
                
                        <ProfileHeader
                            avatar={this.state.avatar}
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            username={this.state.username}
                            location={this.state.location}
                        />

                    <View style={{ borderTopWidth: 5, borderColor: '#b23f2e', zIndex: 3 }}></View>
                    <ScrollView style={{ flex: 1 }}>
                        { this.state.favorites.length == 0 ? (
                            <View style={{ paddingVertical: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text >Add your own Local Picks on the <Text style={{fontWeight: 'bold'}}>Home</Text> tab!</Text>
                            </View>
                        ) : (
                            <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                { localpicks }
                            </View>
                        )}
                        { this.state.editProfile == true ? (
                            <EditProfile cancelEdit={() => this.cancelEdit()} updateProfile={this.updateProfile} uploadImage={() => this._pickImage() }/>
                        ) : (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={styles.signOutButton}
                                    onPress={this.editProfile}
                                >
                                    <Text style={styles.signOutText}>Edit Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.signOutButton}
                                    onPress={this.signOutUser}
                                >
                                    <Text style={styles.signOutText}>Sign Out</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView> 
                </View>
                )}
            </View>
        );
    }
}

export default withNavigationFocus(Profile);