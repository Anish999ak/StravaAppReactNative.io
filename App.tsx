import {StyleSheet, Text, View,Button} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Activities from './screens/Activities';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CreateActivity from './screens/CreateActivity';

const Stack = createNativeStackNavigator();

const App = () => {
  const linking = {
    prefixes: ['stravaapp://', 'https://myapp.com'],
    config: {
      screens: {
        Login: {
          path: 'Login',
          parse: {
            state: (state: string) => `-${state}`,
            code: (code: string) => `-${code}`,
            scope: (scope: string) => `-${scope}`,
          },
        },
        Activities: {
          path: 'Activities',
          parse: {
            code: (code: string) => `-${code}`,
          },
        },
      },
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Activities" component={Activities} options={({ navigation }) => ({
            headerBackVisible:false,
              headerRight: () => (
                <Button title='Create Activity' color="lightblue" onPress={()=>navigation.navigate("CreateActivity")}></Button>
              ),
            })}  />
            <Stack.Screen name="CreateActivity" component={CreateActivity}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
