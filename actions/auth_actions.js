import { FACEBOOK_LOGIN_SUCCESS } from './types';
import { AsyncStorage } from 'react-native';

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            // Dispatch an action saying FB login is done
        } else {
            // Start up FB Login process
        }
    }
}