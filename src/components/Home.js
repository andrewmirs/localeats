import React, { Component } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import AddPick from './AddPick';
import Feed from './Feed';


class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    render() {

        const { height, width } = Dimensions.get('window');

        return (
                <View style={styles.homepage}>
                    <Header
                        leftComponent={{ color: '#fff' }}
                        centerComponent={{ text: 'Local Picks', style: { color: '#fff', fontFamily: 'horizon', fontSize: 30 } }}
                        rightComponent={{ icon: 'add', color: '#fff', onPress: () => this.setState({modalVisible: true}) }}
                        containerStyle={{
                            backgroundColor: '#b23f2e',
                          }}
                    />
                    <Feed />

                    <AddPick
                        animationType="slide"
                        transparent={false}
                        isVisible={this.state.modalVisible}
                        onBackdropPress={() => this.setState({ modalVisible: false })}
                        onRequestClose={() => this.setState({ modalVisible: false })}
                        cancelModal={() => this.setState({ modalVisible: false })}
                    />

                </View>
        );
    }
}

const styles = StyleSheet.create({
    homepage: {
        flex: 1,
        backgroundColor: '#C7CEDB',
    },
    text: {
        color: '#7E7F9A',
    },
    textContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

export default Home;
