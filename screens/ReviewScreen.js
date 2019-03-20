import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class ReviewScreen extends React.Component {
    static navigationOptions = {
        title: 'Review Jobs',
        headerRight: (
            <Button title="Settings" onPress={() => {}} />
        )
    }

    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}
