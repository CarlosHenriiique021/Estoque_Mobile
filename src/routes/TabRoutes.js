import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Contexto do Tema para alterar as cores da barra no Modo Dark (True Black)
import { useTheme } from '../contexts/ThemeContext'; 

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
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Associa cada aba ao seu ícone correspondente
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ProdutosTab') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'UsuariosTab') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Desenvolvedores') {
            iconName = focused ? 'code-slash' : 'code-slash-outline';
          } else if (route.name === 'FaleConosco') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0052CC',
        tabBarInactiveTintColor: isDark ? '#A0AEC0' : '#6B7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
          borderTopColor: isDark ? '#222222' : '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
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