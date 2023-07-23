import React from 'react';
import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useFonts } from 'expo-font';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/redux/store';

import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import MapScreen from './src/screens/MapScreen';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const MainStack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="LoginScreen">
            <MainStack.Screen
              options={{ headerShown: false }}
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <MainStack.Screen
              options={{ title: 'Comments', headerTitleAlign: 'center' }}
              name="CommentsScreen"
              component={CommentsScreen}
            />
            <MainStack.Screen
              options={{ title: 'Map', headerTitleAlign: 'center' }}
              name="MapScreen"
              component={MapScreen}
            />
          </MainStack.Navigator>

          {/* <StatusBar style="auto" />  */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

// { fontFamily: 'Inter-Black', fontSize: 30 }
