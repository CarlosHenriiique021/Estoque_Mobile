import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/style';

import { useTheme } from '../../contexts/ThemeContext';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { isDark, toggleTheme } = useTheme();

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
        // 3. Aplica cor de fundo dinâmica na View principal
        <View style={[
            styles.viewPrincipal, 
            { backgroundColor: isDark ? '#121212' : '#FFFFFF' }
        ]}>

            {/* 4. Botão Flutuante de Tema no topo */}
            <TouchableOpacity 
                onPress={toggleTheme} 
                style={{
                    position: 'absolute',
                    top: 40,
                    right: 20,
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: isDark ? '#2C2C2C' : '#E0E0E0',
                    zIndex: 10
                }}
            >
                <Text style={{ fontSize: 16 }}>
                    {isDark ? '☀️' : '🌙'}
                </Text>
            </TouchableOpacity>

            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logotipo}
            />
            
            {/* Ajuste de cores dos textos para garantir legibilidade */}
            <Text style={[styles.textoLogo, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Estoque Mobile
            </Text>

            <Text style={[styles.textoLogin, { color: isDark ? '#AAAAAA' : '#666666' }]}>
                Faça login para continuar
            </Text>

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                E-mail
            </Text>

            <TextInput
                style={[
                    styles.textoLogin1, 
                    { 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Senha
            </Text>

            <TextInput
                style={[
                    styles.textoLogin1, 
                    { 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
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
                <Text style={[styles.textoConta, { color: isDark ? '#CCCCCC' : '#333333' }]}>
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