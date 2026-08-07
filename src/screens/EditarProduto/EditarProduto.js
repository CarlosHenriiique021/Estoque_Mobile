import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../style';

export default function EditarProduto({ navigation, route }) {

    const { index, produto, onAtualizar } = route.params;

    const [nomeProduto, setNomeProduto] = useState(produto.nomeProduto);
    const [categoria, setCategoria] = useState(produto.categoria);
    const [quantidade, setQuantidade] = useState(String(produto.quantidade));
    const [valor, setValor] = useState(String(produto.valor));

    async function salvarAlteracao() {

        const erros = [];
        const novaQuantidade = Number(quantidade);
        const novoValor = parseFloat(valor);

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
            alert(
                "Corrija os seguintes campos:\n\n" +
                erros.join("\n")
            );
            return;
        }

        try {
            const json = await AsyncStorage.getItem("produtos");
            const produtos = json ? JSON.parse(json) : [];

            produtos[index] = {
                ...produtos[index],
                nomeProduto: nomeProduto,
                categoria: categoria,
                quantidade: novaQuantidade,
                valor: novoValor
            };

            await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
            alert("Produto atualizado com sucesso!");
            navigation.navigate('Produtos')

        } catch (error) {

            console.log(
                "Erro ao atualizar produto:",
                error
            );

        }

    }

    return (

        <View style={styles.editarProduto_View}>

            <Text style={styles.editarProduto_Titulo}>Editar Produto</Text>

            <Text style={styles.editarProduto_Text}>Nome</Text>

            <TextInput
                style={styles.editarProduto_InputBox}
                value={nomeProduto}
                onChangeText={setNomeProduto}
            />

            <Text style={styles.editarProduto_Text}>Categoria</Text>

            <TextInput
                style={styles.editarProduto_InputBox}
                value={categoria}
                onChangeText={setCategoria}
            />

            <Text style={styles.editarProduto_Text}>Quantidade</Text>


            <TextInput
                style={styles.editarProduto_InputBox}
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
            />

            <Text style={styles.editarProduto_Text}>Valor</Text>

            <TextInput
                style={styles.editarProduto_InputBox}
                keyboardType="decimal-pad"
                value={valor}
                onChangeText={setValor}
            />

            <TouchableOpacity
                onPress={salvarAlteracao}
                style={styles.editarProduto_Salvar}>

                <Text style={styles.editarProduto_TextoSalvar}>SALVAR ALTERAÇÕES</Text>

            </TouchableOpacity>

        </View>

    );

}