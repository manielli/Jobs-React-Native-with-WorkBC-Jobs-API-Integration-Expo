import React from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    Dimensions 
} from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends React.Component {
    renderLastSlide(index, slide) {
        if (index === this.props.data.length - 1) { 
            return (
                <Button 
                    title="Onwards!"
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                    style={{ backgroundColor: slide.color }}
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]} >
                    <Text style={styles.slideText} >{slide.text}</Text>
                    {this.renderLastSlide(index, slide)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
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
        aligItems: 'center',
        width: SCREEN_WIDTH
    },
    slideText: {
        fontSize: 30, 
        alignSelf: 'center',
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        width: 200,
        alignSelf: 'center'
    }
};
