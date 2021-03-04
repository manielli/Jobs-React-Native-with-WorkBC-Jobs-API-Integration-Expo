import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Constants from 'expo-constants';
import { Platform } from 'react-native';
// import axios from 'axios';

// const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'; 
// Line above not working anymore

export default async () => {
    if (Constants.isDevice) {    
        let previousToken = await AsyncStorage.getItem('pushToken');

        if (previousToken) {
            return;
        }

        let { status: existingStatus } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            let { status } = await Permissions.askAsync(
                Permissions.NOTIFICATIONS
            );
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('***** Failed to get push token for push notifications! *****');
            alert('Failed to get push token for push notifications!');
            return;
        }

        let { data: token } = await Notifications.getExpoPushTokenAsync();
        // await axios.post(PUSH_ENDPOINT, { token: { token } }); 
        // Line above not working anymore with rallycoding backend
        AsyncStorage.setItem('pushToken', token);
    } else {
        console.log("***** Must use physical device for push notifications! *****")
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        });
    }

    return token;
};
