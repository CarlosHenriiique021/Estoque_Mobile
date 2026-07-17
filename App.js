import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import CadastroUsuario from './src/screens/CadastroUsuario/CadastroUsuario';
import CadastroProduto from './src/screens/CadastroProduto/CadastroProduto';
import Desenvolvedores from './src/screens/Desenvolvedores/Desenvolvedores';
import EditarProduto from './src/screens/EditarProduto/EditarProduto';
import EditarUsuario from './src/screens/EditarUsuario/EditarUsuario';
import FaleConosco from './src/screens/FaleConosco/FaleConosco';
import Perfil from './src/screens/Perfil/Perfil';
import Produtos from './src/screens/Produtos/Produtos';
import Usuarios from './src/screens/Usuarios/Usuarios';



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
