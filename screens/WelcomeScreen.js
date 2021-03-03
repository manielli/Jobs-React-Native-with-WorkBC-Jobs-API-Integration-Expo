import _ from 'lodash';
import React from 'react';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to this JobApp', color: '#03A9F4' },
    { text: 'Use this app to find a job of your dreams', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

export default class WelcomeScreen extends React.Component {
    state = { token: null }

    async UNSAFE_componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        // this.setState({ token });
        // We really only want to know if the token
        // already exists or not and if yes we can 
        // just navigate the user to map screen, and so:
        if (token) {
            this.props.navigation.navigate('map');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }

        return (
            <Slides 
                data={SLIDE_DATA} 
                onComplete={this.onSlidesComplete}    
            />
        );
    }
}
