import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/style';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function trataLogin() {
        console.log("1. Clicou no botão de login");

        if (!email || !senha) {
            alert('Preencha todos os campos!');
            return;
        }

        try {
            const dados = await AsyncStorage.getItem('usuarios');

            if (!dados) {
                alert('Nenhum usuário cadastrado no sistema!');
                return;
            }

            const listaUsuarios = JSON.parse(dados);

            const usuarioValido = listaUsuarios.find(
                (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase() && user.senha === senha
            );

            if (usuarioValido) {
                alert(`Bem-vindo!`);
                navigation.replace('MainTabs');
            } else {
                alert('E-mail ou senha incorretos!');
            }

        } catch (error) {
            alert('Ocorreu um erro ao tentar fazer login.');
        }
    }

    return (
        <View style={styles.viewPrincipal}>

            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logotipo}
            />
            <Text style={styles.textoLogo}>Estoque Mobile</Text>

            <Text style={styles.textoLogin}>Faça login para continuar</Text>

            <Text style={styles.texto}>E-mail</Text>

            <TextInput
                style={styles.textoLogin1}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor='gray'
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.texto}>Senha</Text>

            <TextInput
                style={styles.textoLogin1}
                placeholder="Digite sua senha"
                placeholderTextColor='gray'
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={trataLogin}>
                <Text style={styles.textoButton}>
                    Entrar
                </Text>
            </TouchableOpacity>

            <View style={styles.areaCadastro}>
                <Text style={styles.textoConta}>
                    Não tem uma conta?
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
                    <Text style={styles.cadastro}>
                        Criar conta
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}