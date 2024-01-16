import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import DetailsScreen from './src/pages/detail';
import HomeScreen from './src/pages/home';
import NavBar from './src/components/navbar';

export type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{title: 'Details'}}
          />
        </Stack.Navigator>
        <NavBar />
      </NavigationContainer>
    </GluestackUIProvider>
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

export default App;
