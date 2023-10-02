import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {App} from './App';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro de Produto">
        <Stack.Screen name="Cadastro de Produto" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
