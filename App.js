import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';
import { PeopleScreen } from './PeopleScreen';
import { ChatScreen } from './ChatScreen';
import { CameraScreen } from './CameraScreen';
import { HomeScreen } from './HomeScreen';
import { PostDetailScreen } from './PostDetailScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"   
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;