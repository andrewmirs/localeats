import React, { Component } from 'react';
import { Popup } from 'react-native-map-link';


class DirectionsPopup extends Component {

    constructor(props){
        super(props);

        this.state = {
            isVisible: false
        }
    }

    modalOpen = () => {
        this.setState({
            isVisible: true,
        });
    }

    render(){

        return(
            <Popup
                isVisible={this.state.isVisible}
                onCancelPressed={() => this.setState({ isVisible: false })}
                onAppPressed={() => this.setState({ isVisible: false })}
                onBackButtonPressed={() => this.setState({ isVisible: false })}
                modalProps={{ // you can put all react-native-modal props inside.
                    animationIn: 'slideInUp'
                }}
                appsWhiteList={[ /* Array of apps (apple-maps, google-maps, etc...) that you want
                to show in the popup, if is undefined or an empty array it will show all supported apps installed on device.*/ ]}
                options={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    title: this.props.name,
                    googlePlaceId: this.props.placeId
                }}
                style={{ /* Optional: you can override default style by passing your values. */ }}
            />
        );
    }
}

export default DirectionsPopup;