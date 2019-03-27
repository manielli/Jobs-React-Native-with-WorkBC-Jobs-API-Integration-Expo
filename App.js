import React from 'react';
import { StyleSheet } from 'react-native';
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createStackNavigator 
} from 'react-navigation';

import { Provider } from 'react-redux';
import store from './store';

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
        })
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
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
