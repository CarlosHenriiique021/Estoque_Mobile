import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Produtos({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const { isDark, toggleTheme } = useTheme();

    async function apagarProdutos(indexParaRemover) {
        const novaLista = produtos.filter((_, index) => index !== indexParaRemover);
        setProdutos(novaLista);
        await AsyncStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    async function alterarQuantidade(index, operacao) {
        const novaLista = [...produtos];

        if (operacao === "somar") {
            novaLista[index].quantidade = Number(novaLista[index].quantidade || 0) + 1;
        } else if (operacao === "subtrair") {
            if (Number(novaLista[index].quantidade || 0) > 0) {
                novaLista[index].quantidade = Number(novaLista[index].quantidade || 0) - 1;
            }
        }

        setProdutos(novaLista);
        await AsyncStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    async function listaProdutos() {
        try {
            const json = await AsyncStorage.getItem("produtos");
            if (json) {
                const dados = JSON.parse(json);
                setProdutos(Array.isArray(dados) ? dados : []);
            } else {
                setProdutos([]);
            }
        } catch (error) {
            console.log("Erro ao carregar produtos:", error);
            setProdutos([]);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            listaProdutos();
        });
        return unsubscribe;
    }, [navigation]);

    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const cardBgColor = isDark ? '#121212' : '#F5F5F5';
    const borderColor = isDark ? '#222222' : '#E5E7EB';

    return (
        <View style={[styles.produtos_Container, { backgroundColor: bgColor }]}>
            
            {/* CABEÇALHO RECUADO COM MARGEM TOP */}
            <View style={styles.headerSimplesTop}>
                <Text style={[styles.tituloHeaderProdutos, { color: textColor }]}>
                    Produtos
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity 
                        onPress={toggleTheme} 
                        style={styles.btnThemeTop}
                    >
                        <Ionicons 
                            name={isDark ? 'sunny-outline' : 'moon-outline'} 
                            size={22} 
                            color={textColor} 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.btnAdicionarProdutoHeader}
                        onPress={() => navigation.navigate('CadastroProduto')}
                    >
                        <Ionicons name="add" size={20} color="#FFFFFF" />
                        <Text style={styles.btnAdicionarProdutoTexto}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={produtos}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: "center", marginTop: 80 }}>
                            <Ionicons
                                name="cube-outline"
                                size={70}
                                color={isDark ? "#555555" : "#9ca3af"}
                            />
                            <Text style={[styles.produtos_Texto, { color: isDark ? "#AAAAAA" : "#6b7280" }]}>
                                Nenhum produto cadastrado
                            </Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => {
                        const valor = Number(item.valor || item.preco || 0);
                        const qtd = Number(item.quantidade || item.qtd || 0);

                        return (
                            <View style={[styles.produtos_View, { backgroundColor: cardBgColor, borderColor, borderWidth: isDark ? 1 : 0 }]}>

                                {/* Cabeçalho */}
                                <View style={styles.produtos_CabecalhoView}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.produtos_CabecalhoTexto, { color: textColor }]}>
                                            {item.nomeProduto || item.nome || 'Sem nome'}
                                        </Text>
                                    </View>

                                    <View style={styles.produtos_CabecalhoCategoriaView}>
                                        <Text style={{ color: "#2563EB", fontWeight: "600" }}>
                                            {item.categoria || 'Geral'}
                                        </Text>
                                    </View>
                                </View>

                                {/* Quantidade */}
                                <View style={styles.produtos_QuantidadeView}>
                                    <Text style={[styles.produtos_QuantidadeTexto, { color: textColor }]}>
                                        Quantidade
                                    </Text>

                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={() => alterarQuantidade(index, "subtrair")}
                                            style={styles.produtos_TouchableSubtrair}
                                        >
                                            <Ionicons name="remove" size={22} color="#fff" />
                                        </TouchableOpacity>

                                        <Text style={[styles.produtos_TouchableSubtrairTexto, { color: textColor }]}>
                                            {qtd}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => alterarQuantidade(index, "somar")}
                                            style={styles.produtos_TouchableSomar}
                                        >
                                            <Ionicons name="add" size={22} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Valores */}
                                <View style={styles.produtos_ValoresCotainer}>
                                    <View style={styles.produtos_ValoresView}>
                                        <Text style={[styles.produtos_ValoresTextoUnitario, { color: textColor }]}>
                                            Valor Unitário
                                        </Text>
                                        <Text style={[styles.produtos_ValoresCifrao, { color: textColor }]}>
                                            R$ {valor.toFixed(2)}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={[styles.produtos_ValoresTextoTotal, { color: textColor }]}>
                                            Valor Total
                                        </Text>
                                        <Text style={styles.produtos_ValoresCifraoTotal}>
                                            R$ {(valor * qtd).toFixed(2)}
                                        </Text>
                                    </View>
                                </View>

                                {/* Botões */}
                                <View style={styles.produtos_BotaoView}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("EditarProduto", {
                                                index: index,
                                                produto: item
                                            })}
                                        style={styles.produtos_BotaoEditar}
                                    >
                                        <Ionicons name="pencil" size={18} color="#fff" />
                                        <Text style={styles.produtos_BotaoTextoEditarExcluir}>
                                            Editar
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => apagarProdutos(index)}
                                        style={styles.produtos_BotaoExcluir}
                                    >
                                        <Ionicons name="trash" size={18} color="#fff" />
                                        <Text style={styles.produtos_BotaoTextoEditarExcluir}>
                                            Excluir
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        );
                    }}
                />
            </ScrollView>
        </View>
    );
}