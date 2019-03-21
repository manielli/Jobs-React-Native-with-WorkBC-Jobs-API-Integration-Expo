import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Slides extends React.Component {
    renderSlides() {
        return this.props.data.map((slide) => {
            return (
                <View key={slide.text} style={styles.slideStyle} >
                    <Text style={styles.slideText} >{slide.text}</Text>
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

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        aligItems: 'center'
    },
    slideText: {
        fontSize: 30
    }
};
