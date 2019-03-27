import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

export default class MapScreen extends React.Component {
    state = { 
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <MapView 
                    region={this.state.region}
                    style={{ flex: 1 }} 
                />
            </View>
        );
    }
}
