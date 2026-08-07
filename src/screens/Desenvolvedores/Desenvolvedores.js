import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../styles/style';

// 1. Import do Hook do Tema
import { useTheme } from '../../contexts/ThemeContext';

export default function Desenvolvedores({ navigation }) {
    // 2. Resgate de isDark e toggleTheme do contexto
    const { isDark, toggleTheme } = useTheme();

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
                    Desenvolvedores
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

            {/* CONTEÚDO / CARDS DOS DESENVOLVEDORES */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    width: '100%',
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5',
                    borderWidth: 1,
                    borderColor: isDark ? '#374151' : '#E5E7EB',
                    marginBottom: 15
                }}>
                    <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000', fontSize: 18, fontWeight: 'bold' }]}>
                        Equipe de Desenvolvimento
                    </Text>
                    <Text style={[styles.textoConta, { color: isDark ? '#9CA3AF' : '#6b7280', marginTop: 5 }]}>
                        Projeto desenvolvido para gerenciamento dinâmico de estoque e usuários.
                    </Text>
                </View>
            </ScrollView>

        </View>
    );
}