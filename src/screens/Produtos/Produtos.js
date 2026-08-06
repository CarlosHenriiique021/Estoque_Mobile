import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../../styles/style';

// 1. Import do Hook do Tema
import { useTheme } from '../../contexts/ThemeContext';

export default function Produtos({ navigation }) {
    // 2. Resgate de isDark e toggleTheme do contexto
    const { isDark, toggleTheme } = useTheme();

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
                    Produtos
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

            {/* BOTÃO PARA CADASTRAR NOVO PRODUTO */}
            <TouchableOpacity 
                style={[styles.button, { marginBottom: 20, width: '100%' }]}
                onPress={() => navigation.navigate('CadastroProduto')}
            >
                <Text style={styles.textoButton}>
                    + Cadastrar Novo Produto
                </Text>
            </TouchableOpacity>

            {/* CONTAINER / LISTA DE PRODUTOS */}
            <View style={{
                width: '100%',
                padding: 16,
                borderRadius: 10,
                backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5',
                borderWidth: 1,
                borderColor: isDark ? '#374151' : '#E5E7EB',
            }}>
                <Text style={[
                    styles.textoConta, 
                    { color: isDark ? '#9CA3AF' : '#6b7280', textAlign: 'center' }
                ]}>
                    Nenhum produto cadastrado no momento.
                </Text>
            </View>

        </View>
    );
}