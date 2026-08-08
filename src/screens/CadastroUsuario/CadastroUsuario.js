import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

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

    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const inputBgColor = isDark ? '#121212' : '#FFFFFF';
    const borderColor = isDark ? '#222222' : '#CCCCCC';
    const placeholderColor = isDark ? '#666666' : 'gray';

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: bgColor }}
        >
            <View style={[styles.viewPrincipal, { backgroundColor: bgColor, paddingHorizontal: 20 }]}>
                
                {/* CABEÇALHO RECUADO COM 3 COLUNAS */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingTop: 50,
                    marginBottom: 20,
                }}>
                    {/* 1. Botão Voltar */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{ paddingRight: 10, paddingVertical: 5, zIndex: 10 }}
                    >
                        <Ionicons name="chevron-back" size={28} color={textColor} />
                    </TouchableOpacity>

                    {/* 2. Título Centralizado */}
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: textColor,
                        textAlign: 'center',
                        flex: 1
                    }}>
                        Criar conta
                    </Text>

                    {/* 3. Botão do Tema */}
                    <TouchableOpacity 
                        onPress={toggleTheme} 
                        style={{ padding: 5, zIndex: 10 }}
                    >
                        <Ionicons 
                            name={isDark ? 'sunny-outline' : 'moon-outline'} 
                            size={22} 
                            color={textColor} 
                        />
                    </TouchableOpacity>
                </View>

                {/* FORMULÁRIO */}
                <Text style={[styles.texto, { color: textColor }]}>Nome</Text>
                <TextInput
                    style={[
                        styles.textoCadastroInput,
                        { 
                            color: textColor,
                            borderColor: borderColor,
                            backgroundColor: inputBgColor
                        }
                    ]}
                    placeholder='Digite seu nome completo'
                    placeholderTextColor={placeholderColor}
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={[styles.texto, { color: textColor }]}>E-mail</Text>
                <TextInput
                    style={[
                        styles.textoCadastroInput,
                        { 
                            color: textColor,
                            borderColor: borderColor,
                            backgroundColor: inputBgColor
                        }
                    ]}
                    placeholder='Digite seu e-mail'
                    placeholderTextColor={placeholderColor}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={[styles.texto, { color: textColor }]}>Senha</Text>
                <TextInput
                    style={[
                        styles.textoCadastroInput,
                        { 
                            color: textColor,
                            borderColor: borderColor,
                            backgroundColor: inputBgColor
                        }
                    ]}
                    placeholder='Mínimo 6 caracteres'
                    placeholderTextColor={placeholderColor}
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                <Text style={[styles.texto, { color: textColor }]}>Confirmar senha</Text>
                <TextInput
                    style={[
                        styles.textoCadastroInput,
                        { 
                            color: textColor,
                            borderColor: borderColor,
                            backgroundColor: inputBgColor
                        }
                    ]}
                    placeholder='Confirme sua senha'
                    placeholderTextColor={placeholderColor}
                    secureTextEntry={true}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                {/* BOTÃO CADASTRAR */}
                <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <Text style={styles.textoButton}>Cadastrar</Text>
                </TouchableOpacity>

                {/* ÁREA DO LOGIN */}
                <View style={styles.arealogin}>
                    <Text style={[styles.textoConta, { color: isDark ? '#A0AEC0' : '#333333' }]}>
                        Já tem uma conta?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.login}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}