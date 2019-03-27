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
        this.onAuthComplete(this.props);
        // This could be unnecessary beacuse
        // we have already used the componentWilReceiveProps
        // lifecycle method and that should take care of it
        // In some cases it may be needed.
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View />
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);