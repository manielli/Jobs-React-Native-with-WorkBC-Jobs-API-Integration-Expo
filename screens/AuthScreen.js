import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { facebookLogin } from '../actions';
// We can also just import facebookLogin action
// creator rather than importing all action creators

class AuthScreen extends React.Component {
    componentDidMount() {
        this.props.facebookLogin();
        AsyncStorage.removeItem('fb_token');
    }

    render() {
        return (
            <View>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
            </View>
        );
    }
}

export default connect(null, actions)(AuthScreen);