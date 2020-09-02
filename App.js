import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AudioComponent from "./src/components/radio";
import LoginScreen from './src/screens/login/login';
import LoadingScreen from './src/screens/login/loading';
import MainScreen from './src/screens/game/main';
import GameScreen from './src/screens/game/game';
import RegisterScreen from './src/screens/login/register';
import AppProvider, {AppContext} from './src/context/provider'


const Stack = createStackNavigator();


const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Loading'>
          <Stack.Screen name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen name="Loading"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Register"
            component={RegisterScreen}
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
          <Stack.Screen name="Game"
            component={GameScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </AppProvider>
  )
}

export default App