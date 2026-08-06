import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/style';

// 1. Import do Hook do Tema
import { useTheme } from '../../contexts/ThemeContext';

export default function CadastroProduto({ navigation }) {
    // 2. Resgate de isDark e toggleTheme do contexto
    const { isDark, toggleTheme } = useTheme();

    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    async function cadastrarProduto() {
        if (!nome || !quantidade || !preco) {
            alert('Preencha todos os campos!');
            return;
        }

        try {
            const novoProduto = { nome, quantidade, preco };
            const json = await AsyncStorage.getItem('produtos');
            const produtos = json ? JSON.parse(json) : [];
            produtos.push(novoProduto);

            await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
            alert('Produto cadastrado com sucesso!');
            
            setNome('');
            setQuantidade('');
            setPreco('');
            
            navigation.goBack();
        } catch (error) {
            alert('Erro ao cadastrar produto.');
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
                    Cadastrar Produto
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
                Nome do Produto
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
                placeholder="Ex: Teclado Mecânico"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Quantidade
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
                placeholder="Ex: 10"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
            />

            <Text style={[styles.texto, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Preço (R$)
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
                placeholder="Ex: 150.00"
                placeholderTextColor={isDark ? '#888888' : 'gray'}
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
            />

            <TouchableOpacity 
                onPress={cadastrarProduto} 
                style={styles.button}
            >
                <Text style={styles.textoButton}> 
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>
    );
}