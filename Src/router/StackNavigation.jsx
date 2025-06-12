import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login'; // importe diretamente em vez de usar `require`
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
      />
      
      <Stack.Screen
        name="pagina acesso"
        component={TabNavigation} // Use TabNavigation como componente para a tela DrawNavigation
        options={{ headerShown: false }} // Oculta o cabeçalho da stack na área do Drawer
      />

    </Stack.Navigator>
  );
}