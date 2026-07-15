import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Button, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../style';

export default function CadastroUsuario({navigation}) {

    return (
    <View style={styles.viewPrincipal}>

        <View style = {styles.subtitulo} >
            <Text style = {styles.textosubtitulo}>
                Criar conta
            </Text>
        </View>
            <Text style = {styles.texto}>Nome</Text>

            <TextInput
             style = {styles.input}   
            placeholder='Digite seu nome completo'
            placeholderTextColor= 'gray'
            />

            <Text style = {styles.texto}>E-mail</Text>

            <TextInput
            style = {styles.input}  
            placeholder='Digite seu e-mail'
            placeholderTextColor= 'gray'
          
            />

            <Text style = {styles.texto}>Senha</Text>

            <TextInput
            style = {styles.input}  
            placeholder='Mínimo 6 caracteres'
            placeholderTextColor= 'gray'
            />

            <Text style = {styles.texto}>Confirmar senha</Text>

            <TextInput
            style = {styles.input}  
            placeholder='Confirme sua senha'
            placeholderTextColor= 'gray'
            />
     
        
            <TouchableOpacity style = {styles.button}>
                <Text style = {styles.textoButton}>
                    Cadastrar
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