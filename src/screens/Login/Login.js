import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { isDark, toggleTheme } = useTheme();

    async function trataLogin() {
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
                await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
                alert('Bem-vindo!');
                navigation.replace('MainTabs');
            } else {
                alert('E-mail ou senha incorretos!');
            }

        } catch (error) {
            alert('Ocorreu um erro ao tentar fazer login.');
        }
    }

    // Variações dinâmicas de cores de acordo com o tema
    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const inputBgColor = isDark ? '#121212' : '#F9FAFB';
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const subTextColor = isDark ? '#A0AEC0' : '#6B7280';
    const borderColor = isDark ? '#222222' : '#E5E7EB';

    return (
        <View style={[styles.container, styles.viewPrincipalLogin, { backgroundColor: bgColor }]}>

            {/* Botão de Tema no topo direito */}
            <TouchableOpacity 
                onPress={toggleTheme} 
                style={styles.themeButtonTopRight}
            >
                <Ionicons 
                    name={isDark ? 'sunny-outline' : 'moon-outline'} 
                    size={22} 
                    color={textColor} 
                />
            </TouchableOpacity>

            <View style={styles.contentCenter}>
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logotipoLogin}
                />
                
                <Text style={[styles.textoLogo, { color: textColor }]}>
                    Estoque Mobile
                </Text>

                <Text style={[styles.textoLogin, { color: subTextColor }]}>
                    Faça login para continuar
                </Text>

                {/* Campo E-mail */}
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: textColor }]}>E-mail</Text>
                    <TextInput
                        style={[
                            styles.input, 
                            { 
                                color: textColor,
                                borderColor: borderColor,
                                backgroundColor: inputBgColor
                            }
                        ]}
                        placeholder="seu@email.com"
                        placeholderTextColor={isDark ? '#666666' : '#9CA3AF'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Campo Senha */}
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: textColor }]}>Senha</Text>
                    <TextInput
                        style={[
                            styles.input, 
                            { 
                                color: textColor,
                                borderColor: borderColor,
                                backgroundColor: inputBgColor
                            }
                        ]}
                        placeholder="Digite sua senha"
                        placeholderTextColor={isDark ? '#666666' : '#9CA3AF'}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />
                </View>

                {/* Botão Entrar */}
                <TouchableOpacity style={styles.button} onPress={trataLogin}>
                    <Text style={styles.textoButton}>Entrar</Text>
                </TouchableOpacity>

                {/* Footer Criar Conta */}
                <View style={styles.areaCadastro}>
                    <Text style={[styles.textoConta, { color: subTextColor }]}>
                        Não tem uma conta?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
                        <Text style={styles.cadastro}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}