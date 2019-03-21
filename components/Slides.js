import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Slides extends React.Component {
    renderSlides() {
        return this.props.data.map((slide) => {
            return (
                <View key={slide.text} >
                    <Text>{slide.text}</Text>
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}
