import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-web';
import { styles } from '../../style';

export default function Produtos({ navigation }) {

    const [produtos, setProdutos] = useState([]);

    async function apagarProdutos(indexParaRemover) {
        const novaLista = produtos.filter((_, index) => index !== indexParaRemover);

        setProdutos(novaLista);
        await AsyncStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    async function alterarQuantidade(index, operacao) {
        const novaLista = [...produtos];

        if (operacao === "somar") {
            novaLista[index].quantidade =
                Number(novaLista[index].quantidade) + 1;
        } else if (operacao === "subtrair") {
            if (Number(novaLista[index].quantidade) > 0) {
                novaLista[index].quantidade =
                    Number(novaLista[index].quantidade) - 1;
            }
        }

        setProdutos(novaLista);
        await AsyncStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    async function listaProdutos() {
        const json = await AsyncStorage.getItem("produtos");

        if (json) {
            setProdutos(JSON.parse(json));
        }
    }

    useEffect(() => {
        listaProdutos();
    }, []);

    return (
        <View
            style={styles.produtos_Container}
        >

            <ScrollView>
                <FlatList
                    data={produtos}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={{
                            alignItems: "center",
                            marginTop: 80,
                        }}>
                            <Ionicons
                                name="cube-outline"
                                size={70}
                                color="#9ca3af"
                            />

                            <Text style={styles.produtos_Texto}>Nenhum produto cadastrado</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (

                        <View
                            style={styles.produtos_View}
                        >

                            {/* Cabeçalho */}
                            <View style={styles.produtos_CabecalhoView}>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.produtos_CabecalhoTexto}>
                                        {item.nomeProduto}
                                    </Text>
                                </View>

                                <View style={styles.produtos_CabecalhoCategoriaView}>

                                    <Text
                                        style={{
                                            color: "#2563EB",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {item.categoria}
                                    </Text>
                                </View>

                            </View>

                            {/* Quantidade */}
                            <View style={styles.produtos_QuantidadeView}>

                                <Text style={styles.produtos_QuantidadeTexto}>
                                    Quantidade
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >

                                    <TouchableOpacity
                                        onPress={() => alterarQuantidade(index, "subtrair")}
                                        style={styles.produtos_TouchableSubtrair}
                                    >
                                        <Ionicons
                                            name="remove"
                                            size={22}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>

                                    <Text style={styles.produtos_TouchableSubtrairTexto}>
                                        {item.quantidade}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => alterarQuantidade(index, "somar")}
                                        style={styles.produtos_TouchableSomar}
                                    >
                                        <Ionicons
                                            name="add"
                                            size={22}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>

                            {/* Valores */}
                            <View style={styles.produtos_ValoresCotainer}>

                                <View style={styles.produtos_ValoresView}>

                                    <Text style={styles.produtos_ValoresTextoUnitario}>
                                        Valor Unitário
                                    </Text>

                                    <Text style={styles.produtos_ValoresCifrao}>
                                        R$ {Number(item.valor).toFixed(2)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text style={styles.produtos_ValoresTextoTotal}>
                                        Valor Total
                                    </Text>

                                    <Text style={styles.produtos_ValoresCifraoTotal}>
                                        R$ {(Number(item.valor) * Number(item.quantidade)).toFixed(2)}
                                    </Text>

                                </View>

                            </View>

                            {/* Botões */}
                            <View
                                style={styles.produtos_BotaoView}
                            >

                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("EditarProduto", {
                                            index: index,
                                            produto: item
                                        })}
                                    style={styles.produtos_BotaoEditar}
                                >
                                    <Ionicons
                                        name="pencil"
                                        size={18}
                                        color="#fff"
                                    />

                                    <Text style={styles.produtos_BotaoTextoEditarExcluir}>
                                        Editar
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => apagarProdutos(index)}
                                    style={styles.produtos_BotaoExcluir}
                                >
                                    <Ionicons
                                        name="trash"
                                        size={18}
                                        color="#fff"
                                    />

                                    <Text style={styles.produtos_BotaoTextoEditarExcluir}>
                                        Excluir
                                    </Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    )}
                />

            </ScrollView>
        </View>
    );
}