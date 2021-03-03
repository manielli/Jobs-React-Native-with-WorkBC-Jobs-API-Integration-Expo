import React from 'react';
// import { useState, useEffect, useRef } from 'react';
// import { Platform } from 'react-native';
import { StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from 'expo';
import configureStore from './store';
import registerForNotifications from './services/push_notifications';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import * as Facebook from 'expo-facebook';

// import  Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      reviews: {
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen }
        }),
        navigationOptions: {
          tabBarLabel: 'Review',
          tabBarIcon: ({ tintColor }) => {
            return <Icon name='favorite' size={30} color={tintColor} />;
          }
        }
      }
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  }  
}, {
  // lazy: true,
  defaultNavigationOptions: {
    tabBarVisible: false
  }
});
// In newer react navigation lazy is set to true by default
// so we don't need to use it

const AppContainer = createAppContainer(MainNavigator);

const { store, persistor } = configureStore();

export default class App extends React.Component {
  componentDidMount() {
    Facebook.initializeAsync({appId: '2422058358062134', appName: 'jobapp'})
    registerForNotifications();

    // https://expo.io/dashboard/notifications
    // At the link above in the Expo Push Token
    // we enter token value
    // And at the JSON Data field we enter the following
    // JSON object:
    // { 
    //   "to": "token value", 
    //   "sound": "default", 
    //   "text": "Hello world!" 
    // }
    // Also in iOS Section for Message Subtitle you can 
    // put Message Subtitle, and for Message Category
    // you can put Message Category and give badge count 1

    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [
            { text: 'Okay', style: 'cancel' }, 
            { text: 'Cancel', style: 'destructive' },
            { text: 'Ask Me Later!'}
          ]
        );
      }
    });
  }

  render() {
    return (
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true
//   })
// })

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     Facebook.initializeAsync({appId: '2422058358062134', appName: 'jobapp'})
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

//     notificationListener.current = Notifcations.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     })

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
//       console.log(response)
//     })

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     }
//   }, [])

//   return (
//     <Provider store={store} >
//       <PersistGate loading={null} persistor={persistor} >
//         <AppContainer />
//       </PersistGate>
//     </Provider>

//   );
// }

// async function registerForPushNotificationsAsync() {
//   let token;
  
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync().data);
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications!');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got notifications!",
//       body: "Here is the notification body",
//       data: { data: 'data goes here'},
//     },
//     trigger: { seconds: 5 }
//   })
// }
