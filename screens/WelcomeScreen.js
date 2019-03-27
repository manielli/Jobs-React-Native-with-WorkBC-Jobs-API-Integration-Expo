import React from 'react';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';

const SLIDE_DATA = [
    { text: 'Welcome to this JobApp', color: '#03A9F4' },
    { text: 'Use this app to find a job of your dreams', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

export default class WelcomeScreen extends React.Component {
    state = { token: null }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        // this.setState({ token });
        // We really only want to know if the token
        // already exists or not and if yes we can 
        // just navigate the user to map screen, and so:
        if (token) {
            this.props.navigation.navigate('map');
        } else {
            this.setState({ token });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />
        }

        return (
            <Slides 
                data={SLIDE_DATA} 
                onComplete={this.onSlidesComplete}    
            />
        );
    }
}
