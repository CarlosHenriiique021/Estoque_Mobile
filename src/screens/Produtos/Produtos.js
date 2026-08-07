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
            style={{
                flex: 1,
                backgroundColor: "#c6c6c7",
                padding: 12,
            }}
        >

            <ScrollView>
                <FlatList
                    data={produtos}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 80,
                            }}
                        >
                            <Ionicons
                                name="cube-outline"
                                size={70}
                                color="#9ca3af"
                            />

                            <Text
                                style={{
                                    marginTop: 15,
                                    fontSize: 18,
                                    color: "#6b7280",
                                    fontWeight: "600",
                                }}
                            >
                                Nenhum produto cadastrado
                            </Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (

                        <View
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 18,
                                padding: 16,
                                marginBottom: 15,

                                elevation: 4,

                                shadowColor: "#000",
                                shadowOpacity: 0.08,
                                shadowRadius: 6,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                            }}
                        >

                            {/* Cabeçalho */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 18,
                                }}
                            >

                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            color: "#111827",
                                        }}
                                    >
                                        {item.nomeProduto}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        backgroundColor: "#DBEAFE",
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 20,
                                    }}
                                >
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 18,
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: "#374151",
                                    }}
                                >
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
                                        style={{
                                            width: 38,
                                            height: 38,
                                            backgroundColor: "#EF4444",
                                            borderRadius: 19,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Ionicons
                                            name="remove"
                                            size={22}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>

                                    <Text
                                        style={{
                                            marginHorizontal: 20,
                                            fontSize: 22,
                                            fontWeight: "bold",
                                            color: "#111827",
                                        }}
                                    >
                                        {item.quantidade}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => alterarQuantidade(index, "somar")}
                                        style={{
                                            width: 38,
                                            height: 38,
                                            backgroundColor: "#22C55E",
                                            borderRadius: 19,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
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
                            <View
                                style={{
                                    borderTopWidth: 1,
                                    borderColor: "#E5E7EB",
                                    paddingTop: 15,
                                }}
                            >

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#6B7280",
                                            fontSize: 15,
                                        }}
                                    >
                                        Valor Unitário
                                    </Text>

                                    <Text
                                        style={{
                                            fontWeight: "600",
                                            fontSize: 15,
                                        }}
                                    >
                                        R$ {Number(item.valor).toFixed(2)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Valor Total
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#16A34A",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        R$ {(Number(item.valor) * Number(item.quantidade)).toFixed(2)}
                                    </Text>

                                </View>

                            </View>

                            {/* Botões */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    marginTop: 22,
                                }}
                            >

                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("EditarProduto", {
                                            index: index,
                                            produto: item
                                        })}
                                    style={{
                                        backgroundColor: "#3B82F6",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Ionicons
                                        name="pencil"
                                        size={18}
                                        color="#fff"
                                    />

                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "600",
                                            marginLeft: 8,
                                        }}
                                    >
                                        Editar
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => apagarProdutos(index)}
                                    style={{
                                        backgroundColor: "#EF4444",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Ionicons
                                        name="trash"
                                        size={18}
                                        color="#fff"
                                    />

                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "600",
                                            marginLeft: 8,
                                        }}
                                    >
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