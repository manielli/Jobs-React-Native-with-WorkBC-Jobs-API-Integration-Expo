import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createStackNavigator 
} from 'react-navigation';

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
