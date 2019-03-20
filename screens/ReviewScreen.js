import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class ReviewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return { 
            headerTitle: 'Review Jobs',
            headerRight: (
                <Button 
                    title="Settings" 
                    onPress={() => navigation.navigate('settings')} 
                    type="clear"
                    titleStyle={{color: 'rgba(0, 122, 255, 1)'}}
                />
            )
        };
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
