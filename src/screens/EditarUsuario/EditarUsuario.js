import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { styles } from '../../styles/style';

// 1. Import do Hook do Tema
import { useTheme } from '../../contexts/ThemeContext';

export default function EditarUsuario({ navigation, route }) {
    // 2. Resgate de isDark e toggleTheme do contexto
    const { isDark, toggleTheme } = useTheme();

    const usuario = route.params?.usuario || {};
    const index = route.params?.index;

    const [nome, setNome] = useState(usuario.nome || '');
    const [email, setEmail] = useState(usuario.email || '');
    const [senha, setSenha] = useState(usuario.senha || '');

    async function salvarEdicao() {
        if (!nome || !email || !senha) {
            alert('Todos os campos devem ser preenchidos!');
            return;
        }

        try {
            const json = await AsyncStorage.getItem('usuarios');
            const lista = json ? JSON.parse(json) : [];

            lista[index] = { nome, email, senha };

            await AsyncStorage.setItem('usuarios', JSON.stringify(lista));
            alert('Usuário atualizado com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
            alert('Erro ao salvar as alterações.');
        }
    }

    return (
        <View style={[
            styles.viewPrincipal, 
            { backgroundColor: isDark ? '#121212' : '#FFFFFF', paddingHorizontal: 20 }
        ]}>
            
            {/* CABEÇALHO COM BOTÃO VOLTAR E BOTÃO DE TEMA */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 20,
                marginBottom: 20,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        paddingRight: 10,
                        paddingVertical: 5,
                        zIndex: 10
                    }}
                >
                    <Text style={[styles.setaVoltar, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                        ‹
                    </Text>
                </TouchableOpacity>

                <Text style={[
                    styles.textoCadastro, 
                    { color: isDark ? '#FFFFFF' : '#000000', flex: 1, textAlign: 'center' }
                ]}>
                    Editar Usuário
                </Text>

                {/* BOTÃO DE TEMA (SOL / LUA) */}
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
            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Nome
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
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                value={nome}
                onChangeText={setNome}
            />

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
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
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
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                value={senha}
                onChangeText={setSenha} 
                secureTextEntry={true}
            />

            <TouchableOpacity 
                onPress={salvarEdicao} 
                style={styles.button}
            >
                <Text style={styles.textoButton}> 
                    Salvar Alterações
                </Text>
            </TouchableOpacity>

        </View>
    );
}