import React from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to this JobApp', color: '#03A9F4' },
    { text: 'Use this app to find a job of your dreams', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false
    }
    
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <Slides 
                data={SLIDE_DATA} 
                onComplete={this.onSlidesComplete}    
            />
        );
    }
}
