import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Button, TouchableOpacity, TextInput } from 'react-native';
import { Picker, ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../style';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Produtos({ navigation }) {
    const [produtos, setProdutos] = useState([])

    async function apagarProdutos(indexParaRemover) {
        const novaLista = produtos.filter((_, index) => index !== indexParaRemover)

        setProdutos(novaLista);

        await AsyncStorage.setItem('produtos', JSON.stringify(novaLista))
    }
    async function listaProdutos() {
        const json = await AsyncStorage.getItem('produtos');

        if (json) {
            setProdutos(JSON.parse(json));
        }
    }
    useEffect(() => {
        listaProdutos();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#ffff'}}>
            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (

                    <View style={{
                        backgroundColor: 'yellow',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingVertical: 15,
                        width: '95%',
                        marginHorizontal: 10}}>

                        <Text style={{
                            color: '#000000',
                            fontSize: 15,
                            fontFamily: 'Montserrat',
                            fontWeight: 'bold'
                        }}>
                            Produto: {item.nomeProduto} </Text>

                        <Text style={{
                            color: '#6b7280',
                            fontSize: 15,
                            fontFamily: 'Montserrat'
                        }}>
                            Categoria: {item.categoria} </Text>

                        <View style={{
                        backgroundColor: 'Blue',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}> 
                            <Text style={{
                                color: '#6b7280',
                                fontSize: 15,
                                fontFamily: 'Montserrat'
                            }}>
                                {item.quantidade}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('CadastroProduto')}>
                                    <Ionicons name="pencil" size={24} color="#3b82f6" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => apagarProdutos(index)}>
                                    <Ionicons name="trash" size={24} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};


