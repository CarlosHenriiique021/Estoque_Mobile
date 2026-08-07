import React, { useState } from 'react';
// 1. Adicionado TextInput no import do react-native
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'; 
// 2. Adicionado import do AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { styles } from '../../styles/style';

export default function EditarUsuario({navigation, route}) {

console.log("DADOS CHEGANDO:", route.params);

const usuario = route.params?.usuario || {};
const index = route.params?.index;

const [nome, setNome] = useState(usuario.nome || '');
const [email, setEmail] = useState(usuario.email || '');
const [senha, setSenha] = useState(usuario.senha || '');

async function salvarEdicao() {
    try {
    const json = await AsyncStorage.getItem('usuarios');
    const lista = json ? JSON.parse(json) : [];

    lista[index] = { nome, email, senha };

    await AsyncStorage.setItem('usuarios', JSON.stringify(lista));
    navigation.goBack();
    } catch (error) {
        console.error('Erro ao salvar edição:', error);
    }
};
    return (
        <View style={styles.viewPrincipal}>

    <Text style={styles.texto}>Nome</Text>        
    <TextInput
    style={styles.textoLogin1}
    value={nome}
    onChangeText={setNome}
     />

<Text style={styles.texto}>E-mail</Text>
    <TextInput 
    style={styles.textoLogin1}
    value={email}
    onChangeText={setEmail}
     />

    <Text style={styles.texto}>Senha</Text>
        <TextInput 
        style={styles.textoLogin1}
        value={senha}
        onChangeText={setSenha} 
        secureTextEntry={true}
         />

        <TouchableOpacity onPress={salvarEdicao} 
        style={styles.button}>
            <Text style={styles.textoButton}> 
                Salvar Alterações
            </Text>
        </TouchableOpacity>
        </View>
    );
}