import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import GenerMovie from '../Screens/GenerMovie';
import Movies from '../Screens/Movies';
import listamovies from '../Screens/listamovies';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <PaperProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="GenerMovies"
          component={GenerMovie}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Movies"
          component={Movies}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="film" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ListMovies"
          component={listamovies}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
            headerShown: false,
          }}/>


      </Tab.Navigator>
    </PaperProvider>
  );
}
