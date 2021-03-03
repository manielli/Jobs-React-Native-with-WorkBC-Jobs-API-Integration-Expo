import { 
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL 
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';

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
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync({ 
        appId: '2422058358062134', 
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem('fb_token', token);
    // AsyncStorage.setItem('fb_token', token); could work too, 
    // because there is no reason for the AsyncStorage.setItem('fb_token', token)
    // doesn't do its job
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};