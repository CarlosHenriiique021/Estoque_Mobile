import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/style';

// 1. Import do Hook do Tema
import { useTheme } from '../../contexts/ThemeContext';

export default function FaleConosco({ navigation }) {
    // 2. Resgate de isDark e toggleTheme do contexto
    const { isDark, toggleTheme } = useTheme();

    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');

    function enviarMensagem() {
        if (!nome || !mensagem) {
            alert('Preencha todos os campos antes de enviar!');
            return;
        }

        alert('Sua mensagem foi enviada com sucesso! Entraremos em contato.');
        setNome('');
        setMensagem('');
        navigation.goBack();
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
                    Fale Conosco
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
                Seu Nome
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
                placeholder="Digite seu nome"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Mensagem
            </Text>
            <TextInput 
                style={[
                    styles.textoLogin1,
                    { 
                        height: 100,
                        textAlignVertical: 'top',
                        paddingTop: 10,
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderColor: isDark ? '#444444' : '#CCCCCC',
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF'
                    }
                ]}
                placeholder="Como podemos te ajudar?"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                multiline={true}
                numberOfLines={4}
                value={mensagem}
                onChangeText={setMensagem}
            />

            <TouchableOpacity 
                onPress={enviarMensagem} 
                style={styles.button}
            >
                <Text style={styles.textoButton}> 
                    Enviar Mensagem
                </Text>
            </TouchableOpacity>

        </View>
    );
}