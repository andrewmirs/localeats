import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

class AnimOne extends Component {

    state = {
        redSquare: new Animated.ValueXY(0,0),
    }

    componentWillMount(){

        Animated.timing(this.state.redSquare, {
            toValue:{x: 150, y: 150},
            duration: 2000,
            delay: 1000,
            easing:  Easing.bounce,
        }).start();

    }

    render(){
        return(
            <Animated.View
                style={this.state.redSquare.getLayout()}
            >
                <View style={styles.square}>
                    <Text>Animation</Text>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }

});


export default AnimOne;