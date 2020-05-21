import React, { Component } from 'react';
import { SafeAreaView, StatusBar, Alert } from 'react-native'
import AppContainer from './src/startUp';
// import { Provider } from 'react-redux';
import { Provider as StoreProvider } from 'react-redux';
import { STORE, PERSISTOR } from './src/store/storeConfig';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import * as Util from './src/services';
import messaging, { firebase } from "@react-native-firebase/messaging"
import SplashScreen from 'react-native-splash-screen';
import { enableScreens } from 'react-native-screens';
// const { store, persistor } = configureStore()
// passwordforkeystore = 'instantsolutions'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#000',
  },
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.requestUserPermission()
  }
  async requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      // console.log('Permission status:', authorizationStatus);
    }
  }

  componentDidMount = async () => {
    SplashScreen.hide()
    // enableScreens();
    const FCM = firebase.messaging();

    FCM.hasPermission().then((enabled) => {
      if (enabled) {
        // console.log('permission =========:', enabled);
      } else {
        // request permissions from the user
        FCM.requestPermission().then(() => {
          //  this._setPermission(true);
        }).catch(e => {
          console.log(e);
        });
      }
    });
    FCM.getToken().then(fcmToken => {
      if (fcmToken) {
        console.log('token is  --------------', fcmToken);
      } else {
        console.log('token is  -------------- not foudndddd');

      }
    });
    // FCM.onTokenRefresh(fcmToken => {
    //   if (fcmToken) {
    //     console.log('token is  -------------- not', fcmToken);
    //   }
    // });
    FCM.onMessage((message) => {
      console.log(message, "message");
    });
    FCM.getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      alert('BACKGROUND', JSON.stringify(remoteMessage));
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle='dark-content' />
        <StoreProvider store={STORE}>
          <PersistGate persistor={PERSISTOR}>
            <PaperProvider theme={theme}>
              <AppContainer
                ref={navigatorRef => {
                  Util.setTopLevelNavigator(navigatorRef);
                }}
              />
            </PaperProvider>
          </PersistGate>
        </StoreProvider>
      </SafeAreaView>
    );
  }
}
