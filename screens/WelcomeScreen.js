import React from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to this JobApp' },
    { text: 'Use this app to find a job of your dreams' },
    { text: 'Set your location, then swipe away' }
];

export default class WelcomeScreen extends React.Component {
    render() {
        return (
            <Slides data={SLIDE_DATA} />
        );
    }
}
