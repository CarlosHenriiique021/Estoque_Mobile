import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/style';

// 1. Import do Hook do Tema
import { useTheme } from '../../contexts/ThemeContext';

export default function Perfil({ navigation }) {
    // 2. Resgate de isDark e toggleTheme do contexto
    const { isDark, toggleTheme } = useTheme();

    // Estados de exemplo para o perfil do usuário
    const [nome, setNome] = useState('Carlos Henrique');
    const [email, setEmail] = useState('carlos@exemplo.com');

    function salvarPerfil() {
        alert('Perfil atualizado com sucesso!');
    }

    return (
        <View style={[
            styles.viewPrincipal, 
            { backgroundColor: isDark ? '#121212' : '#FFFFFF', paddingHorizontal: 20 }
        ]}>
            
            {/* CABEÇALHO COM TÍTULO E BOTÃO DE TEMA */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: 20,
                marginBottom: 20
            }}>
                <Text style={[
                    styles.textoCadastro, 
                    { color: isDark ? '#FFFFFF' : '#000000', textAlign: 'left' }
                ]}>
                    Meu Perfil
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

            {/* FORMULÁRIO DO PERFIL */}
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
                placeholder="Seu nome completo"
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
                placeholder="seuemail@exemplo.com"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity 
                onPress={salvarPerfil} 
                style={styles.button}
            >
                <Text style={styles.textoButton}> 
                    Salvar Alterações
                </Text>
            </TouchableOpacity>

        </View>
    );
}