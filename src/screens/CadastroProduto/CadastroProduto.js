import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function CadastroProduto({ navigation }) {
    const [nomeProduto, setNomeProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const { isDark, toggleTheme } = useTheme();

    async function salvarProduto() {
        const erros = [];

        const qtd = Number(quantidade);
        const preco = parseFloat(valor?.toString().replace(',', '.'));

        if (nomeProduto.trim() === "") {
            erros.push("• Nome do produto inválido.");
        }

        if (categoria.trim() === "") {
            erros.push("• Categoria inválida.");
        }

        if (isNaN(qtd) || qtd <= 0) {
            erros.push("• Quantidade deve ser um número maior que zero.");
        }

        if (isNaN(preco) || preco <= 0) {
            erros.push("• Valor deve ser um número maior que zero.");
        }

        if (erros.length > 0) {
            alert("Foram encontrados os seguintes erros:\n\n" + erros.join("\n"));
            return;
        }

        const novoProduto = {
            id: Date.now(),
            nomeProduto: nomeProduto.trim(),
            categoria: categoria.trim(),
            quantidade: qtd,
            valor: preco
        };

        try {
            const json = await AsyncStorage.getItem("produtos");
            const produtos = json ? JSON.parse(json) : [];

            produtos.push(novoProduto);

            await AsyncStorage.setItem("produtos", JSON.stringify(produtos));

            alert("Produto cadastrado com sucesso!");

            setNomeProduto("");
            setCategoria("");
            setQuantidade("");
            setValor("");

            navigation.navigate('Produtos');

        } catch (error) {
            console.error(error);
        }
    }

    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const inputBgColor = isDark ? '#121212' : '#FFFFFF';
    const borderColor = isDark ? '#222222' : '#CCCCCC';

    return (
        <View style={[styles.CadastroProduto_container, { backgroundColor: bgColor }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                
                {/* CABEÇALHO DE CADASTRO */}
                <View style={[styles.headerSimplesTop, { marginBottom: 10 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltarTop}>
                        <Ionicons name="chevron-back" size={26} color={textColor} />
                    </TouchableOpacity>

                    <Text style={[styles.tituloCadastroTop, { color: textColor }]}>
                        Cadastro de Produto
                    </Text>

                    <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeTop}>
                        <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color={textColor} />
                    </TouchableOpacity>
                </View>

                {/* LOGO COMPACTA */}
                <View style={[styles.CadastroProduto_CotainerImagem, { marginVertical: 0 }]}>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                        style={[styles.CadastroProduto_logo, { width: 100, height: 100 }]}
                    />
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 8 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>Nome</Text>
                        <TextInput 
                            style={[styles.CadastroProduto_textoInput, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            placeholder='Nome do produto'
                            placeholderTextColor={isDark ? '#666666' : 'rgba(0, 0, 0, 0.3)'}
                            value={nomeProduto}
                            onChangeText={setNomeProduto}
                        />
                    </View>

                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 8 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>Categoria</Text>
                        <TextInput
                            style={[styles.CadastroProduto_textoInput, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            placeholder='Digite a categoria...'
                            placeholderTextColor={isDark ? '#666666' : 'rgba(0, 0, 0, 0.3)'}
                            value={categoria}
                            onChangeText={setCategoria}
                        />
                    </View>

                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 8 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>Quantidade</Text>
                        <TextInput 
                            style={[styles.CadastroProduto_textoInput, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            placeholder='Digite a quantidade...'
                            placeholderTextColor={isDark ? '#666666' : 'rgba(0, 0, 0, 0.3)'}
                            keyboardType="numeric"
                            value={quantidade}
                            onChangeText={setQuantidade}
                        />
                    </View>

                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 8 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>Valor</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.CadastroProduto_textoCifrao, { color: textColor, borderColor, backgroundColor: isDark ? '#1E1E1E' : '#E0E0E0' }]}>R$</Text>
                            <TextInput 
                                style={[styles.CadastroProduto_textoInputValor, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                                placeholder='Digite o valor...'
                                placeholderTextColor={isDark ? '#666666' : 'rgba(0, 0, 0, 0.3)'}
                                keyboardType="numeric"
                                value={valor}
                                onChangeText={setValor}
                            />
                        </View>
                    </View>

                    {/* BOTÃO SALVAR */}
                    <TouchableOpacity onPress={salvarProduto} style={{ marginTop: 15, marginBottom: 20 }}>
                        <View style={styles.CadastroProduto_btn_Salvar}>
                            <Text style={styles.CadastroProduto_btn_textoSalvarProdutos}> SALVAR </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}