import React from 'react';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
    { text: 'Welcome to this JobApp', color: '#03A9F4' },
    { text: 'Use this app to find a job of your dreams', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

export default class WelcomeScreen extends React.Component {
    state = { token: null }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        this.setState({ token });
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
