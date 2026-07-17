import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../style';

export default function Usuarios({navigation}) {
const [usuarios, setUsuarios] = useState ([])

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
        
        
            <View style={{ flex: 1, padding: 20 }}>
            <FlatList
            data={usuarios}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                    <View style={{
                        padding: 15,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10
                    }}>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Senha: {item.senha}</Text>
                    </View>
                )}
                />
            </View>
    
    )
};
