import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/style';
import { Ionicons } from '@expo/vector-icons';
export default function Usuarios({navigation}) {
const [usuarios, setUsuarios] = useState ([])

    async function apagarUsuario (indexParaRemover) {
        const novaLista = usuarios.filter((_, index) => index !== indexParaRemover)

        setUsuarios(novaLista);
        
        await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista))
    }
     async function listaUsuario() {
        const json = await AsyncStorage.getItem('usuarios');
        
        if (json) {
            setUsuarios(JSON.parse(json));
        }
    }
    useEffect(() => {
        listaUsuario();
    }, []);
    return (
        
        
            <View style={{flex: 1, padding: 20, backgroundColor: '#ffff' }}>
            <FlatList
            data={usuarios}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                    <View style={{
                        padding: 15,
                        borderRadius: 10,
                        borderColor: '#000000',
                        marginBottom: 10,
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        shadowRadius: 2,
                        shadowOpacity: 1,
                        shadowColor: '#000000',
                        shadowOffset: { width: 1, height: 1 },
                }}>

                        <Text style = {{
                            color: '#000000',
                            fontSize: 28,
                            fontFamily: 'Montserrat',
                            fontWeight: 'bold'  
                        }}>
                            {item.nome} </Text>

                        <Text style = {{
                            color: '#6b7280',
                            fontSize: 20,
                            fontFamily: 'Montserrat'
                        }}>
                            {item.email}</Text>

                        <Text style = {{
                            color: '#6b7280',
                            fontSize: 20,
                            fontFamily: 'Montserrat'
                        }}>
                            {item.senha}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditarUsuario')}>
                            <Ionicons name="pencil" size={24} color="#3b82f6" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => apagarUsuario(index)}>
                                <Ionicons name="trash" size={24} color="#ef4444" />
                            </TouchableOpacity>
                   </View>
                    </View>
                )}
                />
            </View>
    
    )
};