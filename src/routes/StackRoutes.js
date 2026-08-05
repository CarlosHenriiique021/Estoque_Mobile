import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';

import Login from '../screens/Login/Login';
import CadastroUsuario from '../screens/CadastroUsuario/CadastroUsuario';

import TabRoutes from './TabRoutes';

import CadastroProduto from '../screens/CadastroProduto/CadastroProduto';
import EditarProduto from '../screens/EditarProduto/EditarProduto';
import EditarUsuario from '../screens/EditarUsuario/EditarUsuario';
import Desenvolvedores from '../screens/Desenvolvedores/Desenvolvedores';
import FaleConosco from '../screens/FaleConosco/FaleConosco';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { isDark } = useTheme();

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* FLUXO DE AUTENTICAÇÃO */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />

        {/* FLUXO PRINCIPAL DO APP LOGADO (TAB NAVIGATOR) */}
        <Stack.Screen name="MainTabs" component={TabRoutes} />

        {/* TELAS INTERNAS ADICIONAIS DA STACK */}
        <Stack.Screen name="CadastroProduto" component={CadastroProduto} />
        <Stack.Screen name="EditarProduto" component={EditarProduto} />
        <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
        <Stack.Screen name="Desenvolvedores" component={Desenvolvedores} />
        <Stack.Screen name="FaleConosco" component={FaleConosco} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}