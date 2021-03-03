import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'; 
// Line above not working anymore

export default async () => {
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

    if (finalStatus !== 'status') {
        return;
    }

    let { data: token } = await Notifications.getExpoPushTokenAsync();
    // await axios.post(PUSH_ENDPOINT, { token: { token } }); 
    // Line above not working anymore with rallycoding backend
    AsyncStorage.setItem('pushToken', token);
};
