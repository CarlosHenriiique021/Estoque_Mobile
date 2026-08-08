import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function EditarProduto({ navigation, route }) {
    const { index, produto } = route.params;

    const [nomeProduto, setNomeProduto] = useState(produto.nomeProduto || produto.nome || '');
    const [categoria, setCategoria] = useState(produto.categoria || '');
    const [quantidade, setQuantidade] = useState(String(produto.quantidade || produto.qtd || 0));
    const [valor, setValor] = useState(String(produto.valor || produto.preco || 0));

    const { isDark, toggleTheme } = useTheme();

    async function salvarAlteracao() {
        const erros = [];
        const novaQuantidade = Number(quantidade);
        const novoValor = parseFloat(valor?.toString().replace(',', '.'));

        if (nomeProduto.trim() === "") {
            erros.push("• Nome do produto inválido.");
        }

        if (categoria.trim() === "") {
            erros.push("• Categoria inválida.");
        }

        if (isNaN(novaQuantidade) || novaQuantidade <= 0) {
            erros.push("• Quantidade inválida.");
        }

        if (isNaN(novoValor) || novoValor <= 0) {
            erros.push("• Valor inválido.");
        }

        if (erros.length > 0) {
            alert("Corrija os seguintes campos:\n\n" + erros.join("\n"));
            return;
        }

        try {
            const json = await AsyncStorage.getItem("produtos");
            const produtos = json ? JSON.parse(json) : [];

            produtos[index] = {
                ...produtos[index],
                nomeProduto: nomeProduto.trim(),
                categoria: categoria.trim(),
                quantidade: novaQuantidade,
                valor: novoValor
            };

            await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
            alert("Produto atualizado com sucesso!");
            navigation.navigate('Produtos');

        } catch (error) {
            console.log("Erro ao atualizar produto:", error);
        }
    }

    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const inputBgColor = isDark ? '#121212' : '#FFFFFF';
    const borderColor = isDark ? '#222222' : '#CCCCCC';

    return (
        <ScrollView style={[styles.editarProduto_View, { backgroundColor: bgColor }]}>
            
            {/* CABEÇALHO */}
            <View style={styles.headerSimplesTop}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltarTop}>
                    <Ionicons name="chevron-back" size={26} color={textColor} />
                </TouchableOpacity>

                <Text style={[styles.tituloCadastroTop, { color: textColor }]}>
                    Editar Produto
                </Text>

                <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeTop}>
                    <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color={textColor} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <Text style={[styles.editarProduto_Text, { color: textColor }]}>Nome</Text>
                <TextInput
                    style={[styles.editarProduto_InputBox, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                    value={nomeProduto}
                    onChangeText={setNomeProduto}
                />

                <Text style={[styles.editarProduto_Text, { color: textColor }]}>Categoria</Text>
                <TextInput
                    style={[styles.editarProduto_InputBox, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                    value={categoria}
                    onChangeText={setCategoria}
                />

                <Text style={[styles.editarProduto_Text, { color: textColor }]}>Quantidade</Text>
                <TextInput
                    style={[styles.editarProduto_InputBox, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                    keyboardType="numeric"
                    value={quantidade}
                    onChangeText={setQuantidade}
                />

                <Text style={[styles.editarProduto_Text, { color: textColor }]}>Valor</Text>
                <TextInput
                    style={[styles.editarProduto_InputBox, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                />

                <TouchableOpacity onPress={salvarAlteracao} style={styles.editarProduto_Salvar}>
                    <Text style={styles.editarProduto_TextoSalvar}>SALVAR ALTERAÇÕES</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}