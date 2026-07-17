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
        
        
            <View style={{padding: 20, backgroundColor: '#01071b' }}>
            <FlatList
            data={usuarios}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                    <View style={{
                        padding: 15,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                        backgroundColor: '#010322'
                    }}>
                        <Text style = {{
                            color: '#ffff',
                            fontSize: 23,
                            fontFamily: 'Montserrat'    }}>
                                {item.nome}</Text>

                        <Text style = {{
                            color: '#6b7280',
                            fontSize: 20,
                            fontFamily: 'Montserrat'
                        }}>{item.email}</Text>

                        <Text style = {{
                            color: '#6b7280',
                            fontSize: 20,
                            fontFamily: 'Montserrat'
                        }}>Senha: {item.senha}</Text>
                    </View>
                )}
                />
            </View>
    
    )
};
