import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';

class MapScreen extends React.Component {
    state = { 
        mapLoaded: false,
        region: {
            latitude: 49.28883325048375,
            latitudeDelta: 0.28942351176355174,
            longitude: -123.13505564733309,
            longitudeDelta: 0.23888898445666484,
          }
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = (region) => {
        console.log(region);
        this.setState({ region });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }} >
                <MapView 
                    region={this.state.region}
                    style={{ flex: 1 }} 
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
            </View>
        );
    }
}

export default connect(null, actions)(MapScreen);