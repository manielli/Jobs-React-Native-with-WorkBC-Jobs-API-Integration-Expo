import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

export default class ReviewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return { 
            title: 'Review Jobs',
            headerRight: (
                <Button 
                    title="Settings" 
                    onPress={() => navigation.navigate('settings')} 
                    type="clear"
                    titleStyle={{ color: 'rgba(0, 122, 255, 1)' }}
                />
            ),
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 10 : 0
            }
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
