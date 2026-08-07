import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/style';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../contexts/ThemeContext';

export default function Usuarios({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);
    // 1. Desestruturado o toggleTheme do hook
    const { isDark, toggleTheme } = useTheme();

    async function apagarUsuario(indexParaRemover) {
        const novaLista = usuarios.filter((_, index) => index !== indexParaRemover);
        setUsuarios(novaLista);
        await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
    }

    async function listaUsuario() {
        const json = await AsyncStorage.getItem('usuarios');
        if (json) {
            setUsuarios(JSON.parse(json));
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            listaUsuario();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={[
            styles.viewPrincipal, 
            { backgroundColor: isDark ? '#121212' : '#ffffff', padding: 20 }
        ]}>
            {/* CABEÇALHO COM TÍTULO E BOTÃO DE TEMA */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20
            }}>
                <Text style={[
                    styles.textoCadastro, 
                    { 
                        color: isDark ? '#ffffff' : '#000000', 
                        textAlign: 'left' 
                    }
                ]}>
                    Usuários Cadastrados
                </Text>

                {/* BOTÃO DE TEMA */}
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

            <FlatList
                data={usuarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 10,
                        backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                        borderWidth: 1,
                        borderColor: isDark ? '#374151' : '#d1d5db',
                        shadowRadius: 2,
                        shadowOpacity: isDark ? 0.3 : 1,
                        shadowColor: isDark ? '#000000' : '#000000',
                        shadowOffset: { width: 1, height: 1 },
                    }}>
                        <Text style={{
                            color: isDark ? '#ffffff' : '#000000',
                            fontSize: 28,
                            fontWeight: 'bold'
                        }}>
                            {item.nome}
                        </Text>

                        <Text style={{
                            color: isDark ? '#9CA3AF' : '#6b7280',
                            fontSize: 20,
                            marginTop: 4
                        }}>
                            {item.email}
                        </Text>

                        <Text style={{
                            color: isDark ? '#9CA3AF' : '#6b7280',
                            fontSize: 20,
                            marginTop: 2
                        }}>
                            {item.senha}
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditarUsuario', { usuario: item, index: index })}>
                                <Ionicons name="pencil" size={24} color={isDark ? '#60A5FA' : '#3b82f6'} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => apagarUsuario(index)}>
                                <Ionicons name="trash" size={24} color={isDark ? '#F87171' : '#ef4444'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}