import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';
import Produtos from '../screens/Produtos/Produtos';
import CadastroProduto from '../screens/CadastroProduto/CadastroProduto';
import EditarProduto from '../screens/EditarProduto/EditarProduto';
import Perfil from '../screens/Perfil/Perfil';
import Usuarios from '../screens/Usuarios/Usuarios';
import EditarUsuario from '../screens/EditarUsuario/EditarUsuario';
import Desenvolvedores from '../screens/Desenvolvedores/Desenvolvedores';
import FaleConosco from '../screens/FaleConosco/FaleConosco';

const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

function StackProdutos() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ListaProdutos" component={Produtos} />
      <ProductStack.Screen name="CadastroProduto" component={CadastroProduto} />
      <ProductStack.Screen name="EditarProduto" component={EditarProduto} />
    </ProductStack.Navigator>
  );
}

function StackUsuarios() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="ListaUsuarios" component={Usuarios} />
      <UserStack.Screen name="EditarUsuario" component={EditarUsuario} />
    </UserStack.Navigator>
  );
}


export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ProdutosTab" component={StackProdutos} options={{ title: 'Produtos' }} />
      <Tab.Screen name="UsuariosTab" component={StackUsuarios} options={{ title: 'Usuários' }} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Desenvolvedores" component={Desenvolvedores} />
      <Tab.Screen name="FaleConosco" component={FaleConosco} options={{ title: 'Fale Conosco' }} />
    </Tab.Navigator>
  );
}