import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styles } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroUsuario({navigation}) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('')

 async function cadastrar() {
    
    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Preencher tudo')
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não são iguais')
        return;
    }

    if (senha.length < 6) {
    alert('Erro: A senha deve ter pelo menos 6 caracteres.');
    return;
}
    else {
        alert('Cadastro realizado!')
        
        const usuario = {
        nome, email, senha
        }
       await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    }
     
    }

    async function mostrar() {
      const json = await AsyncStorage.getItem('usuario');
      const usuario = JSON.parse(json);
     alert(
    `Informações do Usuário\n\nNome: ${usuario.nome}\nEmail: ${usuario.email}\nSenha: ${usuario.senha}`
  );
}
    return (
    <View style={styles.viewPrincipal}>

        <View style = {styles.titulo} >
            <Text style = {styles.textotitulo}>
                Criar conta
            </Text>

        </View>

        <View style = {{width: 300}}>
            <Text style = {styles.texto}>Nome</Text>

            <TextInput
             style = {styles.input}   
            placeholder='Digite seu nome completo'
            placeholderTextColor = 'gray'
            value= {nome}
            onChangeText={setNome}
            />

            <Text style = {styles.texto}>E-mail</Text>

            <TextInput
            style = {styles.input}  
            placeholder='Digite seu e-mail'
            placeholderTextColor = 'gray'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            />

            <Text style = {styles.texto}>Senha</Text>

            <TextInput
            style = {styles.input}  
            placeholder='Mínimo 6 caracteres'
            placeholderTextColor = 'gray'
            secureTextEntry = {true}
            value = {senha}
            onChangeText={setSenha}
            />

            <Text style = {styles.texto}>Confirmar senha</Text>

            <TextInput
            style = {styles.input}  
            placeholder='Confirme sua senha'
            placeholderTextColor= 'gray'
            secureTextEntry = {true}
            value = {confirmarSenha}
            onChangeText={setConfirmarSenha}
            />
     </View>
        
            <TouchableOpacity  
            style = {styles.button}
            onPress={cadastrar}
            >

                <Text style = {styles.textoButton}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity  
            style = {styles.button}
            onPress={mostrar}
            >
                <Text style = {styles.textoButton}>
                    Mostrar usuario
                </Text>
            </TouchableOpacity>
   
            <View style = {styles.arealogin}>
                <Text style = {styles.textoConta}>
                    Já tem uma conta?
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

    </View>  
    )
};