import { StyleSheet, Text, View, Image, FlatList, FlatListComponent } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import CadastroUsuario from './screens/CadastroUsuario/CadastroUsuario';
import CadastroProduto from './screens/CadastroProduto/CadastroProduto';
import Desenvolvedores from './screens/Desenvolvedores/Desenvolvedores';
import EditarProduto from './screens/EditarProduto/EditarProduto';
import EditarUsuario from './screens/EditarUsuario/EditarUsuario';
import FaleConosco from './screens/FaleConosco/FaleConosco';
import Perfil from './screens/Perfil/Perfil';
import Produtos from './screens/Produtos/Produtos';
import Usuario from './screens/Usuarios/Usuarios';
import Usuarios from './screens/Usuarios/Usuarios';


const Tab = createBottomTabNavigator();


export default function App() {

  return (

    <NavigationContainer>

      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={Home}
        />

        <Tab.Screen
          name='Login'
          component={Login}
        />

        <Tab.Screen
          name='CadastroUsuario'
          component={CadastroUsuario}
        />

        <Tab.Screen
          name='CadastroProduto'
          component={CadastroProduto}
        />

        <Tab.Screen
          name='Desenvolvedores'
          component={Desenvolvedores}
        />

        <Tab.Screen
          name='EditarProduto'
          component={EditarProduto}
        />

        <Tab.Screen
          name='EditarUsuario'
          component={EditarUsuario}
        />

        <Tab.Screen
          name='FaleConosco'
          component={FaleConosco}
        />

        <Tab.Screen
          name='Perfil'
          component={Perfil}
        />

        <Tab.Screen
          name='Produtos'
          component={Produtos}
        />

        <Tab.Screen
          name='Usuarios'
          component={Usuarios}
        />
      </Tab.Navigator>


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
