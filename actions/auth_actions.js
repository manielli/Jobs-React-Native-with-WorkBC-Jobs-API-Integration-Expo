import { FACEBOOK_LOGIN_SUCCESS } from './types';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // Start up FB Login process
        doFacebookLogin();
    }
};

const doFacebookLogin = async () => {
    let result = await Facebook.logInWithReadPermissionsAsync('2422058358062134', {
        permission: ['public_profile'];
    });
};