import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Home({ navigation }) {
    const { isDark, toggleTheme } = useTheme();

    const [usuario, setUsuario] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            carregarDadosHome();
        }, [])
    );

    async function carregarDadosHome() {
        try {
            setLoading(true);

            // Usuario Logado
            const userJson = await AsyncStorage.getItem('usuarioLogado');
            if (userJson) {
                setUsuario(JSON.parse(userJson));
            }

            // Total de Usuarios
            const usuariosJson = await AsyncStorage.getItem('usuarios');
            if (usuariosJson) {
                const listaU = JSON.parse(usuariosJson);
                setTotalUsuarios(Array.isArray(listaU) ? listaU.length : 0);
            }

            // Lista de Produtos
            const produtosJson = await AsyncStorage.getItem('produtos');
            if (produtosJson) {
                const listaP = JSON.parse(produtosJson);
                setProdutos(Array.isArray(listaP) ? listaP : []);
            } else {
                setProdutos([]);
            }

        } catch (error) {
            console.log('Erro ao carregar dados da Home:', error);
        } finally {
            setLoading(false);
        }
    }

    // Cálculo seguro do valor total em estoque (Trata tanto números quanto strings)
    const valorTotalEstoque = (produtos || []).reduce((acc, item) => {
        const rawValor = item.valor ?? item.preco ?? 0;
        let preco = 0;

        if (typeof rawValor === 'number') {
            preco = rawValor;
        } else if (typeof rawValor === 'string') {
            preco = parseFloat(rawValor.replace(',', '.')) || 0;
        }

        const qtd = Number(item.quantidade ?? item.qtd ?? 0);
        return acc + (preco * qtd);
    }, 0);

    const bgColor = isDark ? colors.black : colors.lightBg;
    const cardBgColor = isDark ? colors.darkCard : colors.lightCard;
    const textColor = isDark ? colors.textLight : colors.textDark;
    const subTextColor = isDark ? colors.textMutedDark : colors.textMuted;
    const borderColor = isDark ? colors.darkBorder : colors.lightBorder;
    const bluePrimary = '#2563EB';

    const primeiroNome = usuario?.nome ? usuario.nome.split(' ')[0] : 'Carlos';

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: bgColor }]}
            showsVerticalScrollIndicator={false}
        >
            {/* CABEÇALHO AZUL CURVO */}
            <View style={[styles.headerHomeCurvo, { backgroundColor: isDark ? '#001D4A' : '#0052CC' }]}>
                <View style={styles.topBarHome}>
                    <View>
                        <Text style={styles.saudacaoHome}>
                            Olá, {primeiroNome}! 👋
                        </Text>
                        <Text style={styles.subSaudacaoHome}>
                            Bem-vindo ao Estoque Mobile
                        </Text>
                    </View>

                    <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeHome}>
                        <Ionicons
                            name={isDark ? 'sunny-outline' : 'moon-outline'}
                            size={22}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* PAINEL E MÉTRICAS */}
            <View style={styles.contentContainerHome}>

                {/* METRICAS */}
                <View style={styles.metricsRow}>
                    <View style={[styles.metricCardDark, { backgroundColor: cardBgColor, borderColor, borderWidth: isDark ? 1 : 0 }]}>
                        <Text style={[styles.metricNumber, { color: bluePrimary }]}>
                            {produtos.length}
                        </Text>
                        <Text style={[styles.metricLabel, { color: subTextColor }]}>
                            Produtos cadastrados
                        </Text>
                    </View>

                    <View style={[styles.metricCardDark, { backgroundColor: cardBgColor, borderColor, borderWidth: isDark ? 1 : 0 }]}>
                        <Text style={[styles.metricNumber, { color: bluePrimary }]}>
                            {totalUsuarios}
                        </Text>
                        <Text style={[styles.metricLabel, { color: subTextColor }]}>
                            Usuários cadastrados
                        </Text>
                    </View>
                </View>

                {/* VALOR TOTAL DO ESTOQUE */}
                <View style={[styles.totalCardDark, { backgroundColor: cardBgColor, borderColor, borderWidth: isDark ? 1 : 0 }]}>
                    <Text style={[styles.totalValue, { color: bluePrimary }]}>
                        R$ {valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                    <Text style={[styles.totalLabel, { color: subTextColor }]}>
                        Valor total do estoque
                    </Text>
                </View>

                {/* ULTIMOS PRODUTOS */}
                <View style={styles.sectionHeaderHome}>
                    <Text style={[styles.sectionTitleHome, { color: textColor }]}>
                        Últimos produtos
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProdutosTab', { screen: 'ListaProdutos' })}>
                        <Text style={[styles.verTodosHome, { color: bluePrimary }]}>
                            Ver todos
                        </Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={bluePrimary} style={{ marginTop: 20 }} />
                ) : produtos.length === 0 ? (
                    <View style={[styles.card, { backgroundColor: cardBgColor, borderColor, borderWidth: 1, padding: 20, alignItems: 'center' }]}>
                        <Ionicons name="cube-outline" size={38} color={subTextColor} style={{ marginBottom: 8 }} />
                        <Text style={{ color: subTextColor, textAlign: 'center' }}>
                            Nenhum produto cadastrado no momento.
                        </Text>
                    </View>
                ) : (
                    produtos.slice(0, 4).map((item, index) => {
                        const nomeProd = item.nomeProduto || item.nome || 'Produto';
                        const precoProd = Number(item.valor ?? item.preco ?? 0);
                        const qtdProd = Number(item.quantidade ?? item.qtd ?? 0);

                        return (
                            <View
                                key={index}
                                style={[
                                    styles.cardItemHome,
                                    {
                                        backgroundColor: cardBgColor,
                                        borderColor,
                                        borderWidth: isDark ? 1 : 0
                                    }
                                ]}
                            >
                                <View style={styles.iconBgHome}>
                                    <Ionicons name="cube-outline" size={22} color={bluePrimary} />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.nomeProdutoHome, { color: textColor }]}>
                                        {nomeProd}
                                    </Text>
                                    <Text style={[styles.subProdutoHome, { color: subTextColor }]}>
                                        {item.categoria || 'Geral'}
                                    </Text>
                                </View>

                                <Text style={[styles.qtdHome, { color: subTextColor }]}>
                                    {qtdProd} un.
                                </Text>

                                <Text style={[styles.precoHome, { color: textColor }]}>
                                    R$ {precoProd.toFixed(2)}
                                </Text>
                            </View>
                        );
                    })
                )}

            </View>
        </ScrollView>
    );
}