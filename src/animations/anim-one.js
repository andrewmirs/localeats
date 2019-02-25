import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

class AnimOne extends Component {

    componentWillMount(){
        // 1. Where does the animation start?
        this.redSquare = new Animated.ValueXY(0,0);

        // 2. Where will it end?
        Animated.spring(this.redSquare, {
            toValue:{x: 150, y: 150}
        }).start();

        // 3. Which component?

    }

    render(){
        return(
            <Animated.View
                style={this.redSquare.getLayout()}
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