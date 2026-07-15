import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Touchable, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from 'react';

export function fonte() {

    let [fontsLoaded] = useFonts({
    GoogleSans_400Regular,
    GoogleSans_500Medium,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  };
}

async function salvarUsuario() {

    try {
        const novoUsuario = {
            id: Date.now().toString,
            nome,
            pedido,
            telefone,
            valor
        };

        const dados = await
            AsyncStorage.getItem("usuario");
        let lista = [];

        if (dados != null) {
            lista = JSON.parse(dados)
        }

        lista.push(novoUsuario);

        await AsyncStorage.setItem(

            "usuario",
            JSON.stringify(lista)
        );

        setNome("");
        setPedido("");
        setTelefone("");
        setValor("");

        alert("Pedido salvo com sucesso!")
    } catch (error) {
        console.log("Erro: " + error)
    }
}

async function carregarUsuarios() {
    try {

        const dados = await
            AsyncStorage.getItem("usuario");

        if (dados != null) {
            setUsuario(JSON.parse(dados))
        } else {
            setUsuario([]);
        }

    } catch (error) {
        console.log("Erro: " + error)

    }
}

async function removerUsuario(id) {
    try {
        const novaLista = usuario.filter(
            usuario => usuario.id !== id
        );

        await AsyncStorage.setItem(
            "usuario",
            JSON.stringify(novaLista)
        );

        setUsuario(novaLista);

    } catch (error) {
        console.log("Erro: " + error)

    }

}

async function limparStorage() {
    try {
        await AsyncStorage.clear();
        setUsuario([]);
        alert("AsyncStorage Limpo!")
    } catch (error) {
        console.log(error)
    }
}

export function ola(){
    console.log("Hello World")
}

