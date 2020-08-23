import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AudioComponent from "./src/components/radio";
import LoginScreen from './src/screens/login/login';
import MainScreen from './src/screens/game/main';

export const CurrentUser = React.createContext('user')

const Stack = createStackNavigator();


const App = () => {
  return (
    <CurrentUser.Provider value='something'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </CurrentUser.Provider>
  )
}

export default App