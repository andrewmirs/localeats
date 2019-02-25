import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getReviews } from '../Store/actions';
import { bindActionCreators } from 'redux';

class Reviews extends Component {
    
    componentDidMount(){
        this.props.getReviews()
    }
    
    render(){
        return(
            <Text>Reviews</Text>
        );
    }
}

function mapStateToProps(state){
    console.log("Current state:", state);
    return {
        reviews: state.reviews
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getReviews}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);