import React, { Component } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Header, Overlay } from 'react-native-elements';
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

                    <Overlay
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={this.closeModal}
                        windowBackgroundColor="rgba(0,0,0,0.7)"
                        onBackdropPress={() => this.setState({ modalVisible: false })}
                        containerStyle={{ padding: 0 }}
                    >
                    <View style={{ flex: 1 }}>
                        <View style={{ width: '100%', height: 60, backgroundColor: '#b23f2e', flex: -1, alignItems: 'center', justifyContent: 'center', borderRadiusTop: 5 }}>
                            <Text style={{ fontFamily: 'horizon', fontSize: 26, color: 'white' }}>Add Your Local Pick</Text>
                        </View>
                    </View>
                    </Overlay>

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
