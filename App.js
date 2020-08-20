import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AudioComponent from "./src/components/audio";

export const CurrentUser = React.createContext('user')

const Stack = createStackNavigator();


const App = () => {
  return (
    <CurrentUser.Provider value='something'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home"
            component={AudioComponent}
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