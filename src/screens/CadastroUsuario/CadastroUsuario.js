import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';

export default function CadastroUsuario({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const { isDark, toggleTheme } = useTheme();

    async function cadastrar() {
        if (!nome || !email || !senha || !confirmarSenha) {
            alert('Todos os campos devem ser preenchidos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        if (senha.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        try {
            const novoUsuario = {
                nome: nome,
                email: email,
                senha: senha
            };

            const json = await AsyncStorage.getItem('usuarios');
            const usuarios = json ? JSON.parse(json) : [];
            usuarios.push(novoUsuario);

            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Cadastro realizado com sucesso!');

            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');

            navigation.navigate('Login');
        } catch (error) {
            alert('Erro ao realizar o cadastro.');
        }
    }

    return (
        <View style={[
            styles.viewPrincipal, 
            { backgroundColor: isDark ? '#121212' : '#FFFFFF', paddingHorizontal: 20 }
        ]}>
            {/* CABEÇALHO COM 3 COLUNAS ALINHADAS */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 40,
                marginBottom: 20,
            }}>
                {/* 1. Botão Voltar */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        paddingRight: 10,
                        paddingVertical: 5,
                        zIndex: 10
                    }}
                >
                    <Text style={{ 
                        fontSize: 32, 
                        fontWeight: 'bold', 
                        lineHeight: 32,
                        color: isDark ? '#FFFFFF' : '#000000' 
                    }}>
                        ‹
                    </Text>
                </TouchableOpacity>

                {/* 2. Título Centralizado */}
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: isDark ? '#FFFFFF' : '#000000',
                    textAlign: 'center',
                    flex: 1
                }}>
                    Criar conta
                </Text>

                {/* 3. Botão do Tema */}
                <TouchableOpacity 
                    onPress={toggleTheme} 
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 16,
                        backgroundColor: isDark ? '#2C2C2C' : '#E0E0E0',
                        zIndex: 10
                    }}
                >
                    <Text style={{ fontSize: 16 }}>
                        {isDark ? '☀️' : '🌙'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* FORMULÁRIO */}
            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>Nome</Text>
            <TextInput
                style={[
                    styles.textoCadastroInput,
                    { 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder='Digite seu nome completo'
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>E-mail</Text>
            <TextInput
                style={[
                    styles.textoCadastroInput,
                    { 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder='Digite seu e-mail'
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                keyboardType='email-address'
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>Senha</Text>
            <TextInput
                style={[
                    styles.textoCadastroInput,
                    { 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder='Mínimo 6 caracteres'
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>Confirmar senha</Text>
            <TextInput
                style={[
                    styles.textoCadastroInput,
                    { 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder='Confirme sua senha'
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
            />

            <TouchableOpacity style={styles.button} onPress={cadastrar}>
                <Text style={styles.textoButton}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={styles.arealogin}>
                <Text style={[styles.textoConta, { color: isDark ? '#CCCCCC' : '#333333' }]}>
                    Já tem uma conta?
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}