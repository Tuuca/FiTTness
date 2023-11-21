import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import HomeInicial from './src/pages/home_inicial';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import Home from './src/pages/home';
import Dieta from './src/pages/dieta';
import AlimentosCrud from './src/pages/alimentos_crud';
import Perfil from './src/pages/perfil';
import Mercados from './src/pages/mercados';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeInicial" component={HomeInicial} options={{ title: 'HomeInicial' }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />

          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dieta" component={Dieta} />
          <Stack.Screen name="AlimentosCrud" component={AlimentosCrud} />
          <Stack.Screen name="Mercados" component={Mercados} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;