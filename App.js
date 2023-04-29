import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Principal from './src/components/Principal';
import Detalhes from './src/components/Detalhes';
import Gastos from './src/components/Gastos';
import Proposicoes from './src/components/Proposicoes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="Gastos" component={Gastos} />
        <Stack.Screen name="Proposicoes" component={Proposicoes} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
