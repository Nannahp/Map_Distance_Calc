import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Dashboard from './Dashboard'; 
import AddEntry from './AddEntry';
import EntryDetail from './EntryDetail'
import MapComponent from './MapComponent';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddEntry" component={AddEntry}/>
        <Stack.Screen name="EntryDetail" component={EntryDetail}/>
        <Stack.Screen name="MapComponent" component={MapComponent}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
