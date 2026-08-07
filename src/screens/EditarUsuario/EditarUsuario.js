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


    const { index, produto } = route.params;


    const [nomeProduto, setNomeProduto] = useState(
        produto.nomeProduto
    );

    const [categoria, setCategoria] = useState(
        produto.categoria
    );

    const [quantidade, setQuantidade] = useState(
        String(produto.quantidade)
    );

    const [valor, setValor] = useState(
        String(produto.valor)
    );


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

            const produtos = json
                ? JSON.parse(json)
                : [];



            produtos[index] = {

                ...produtos[index],

                nomeProduto: nomeProduto,
                categoria: categoria,
                quantidade: novaQuantidade,
                valor: novoValor

            };



            await AsyncStorage.setItem(
                "produtos",
                JSON.stringify(produtos)
            );



            alert("Produto atualizado com sucesso!");

            navigation.goBack();


        } catch (error) {

            console.log(
                "Erro ao atualizar produto:",
                error
            );

        }

    }



    return (

        <View
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                padding: 20
            }}
        >


            <Text
                style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 30
                }}
            >
                Editar Produto
            </Text>



            <Text>
                Nome
            </Text>


            <TextInput

                style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 15
                }}

                value={nomeProduto}

                onChangeText={setNomeProduto}

            />




            <Text>
                Categoria
            </Text>


            <TextInput

                style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 15
                }}

                value={categoria}

                onChangeText={setCategoria}

            />




            <Text>
                Quantidade
            </Text>


            <TextInput

                style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 15
                }}

                keyboardType="numeric"

                value={quantidade}

                onChangeText={setQuantidade}

            />




            <Text>
                Valor
            </Text>


            <TextInput

                style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 25
                }}

                keyboardType="decimal-pad"

                value={valor}

                onChangeText={setValor}

            />




            <TouchableOpacity

                onPress={salvarAlteracao}

                style={{
                    backgroundColor: "#2563EB",
                    padding: 15,
                    borderRadius: 10,
                    alignItems: "center"
                }}

            >

                <Text
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16
                    }}
                >
                    SALVAR ALTERAÇÕES
                </Text>


            </TouchableOpacity>


        </View>

    );

}