import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/style';
import { Ionicons } from '@expo/vector-icons';
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
        
        
            <View style={{flex: 1, padding: 20, backgroundColor: '#01071b' }}>
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
                        }}>{item.senha}</Text>
                
                        <TouchableOpacity>
                            <Ionicons name="pencil" size={24} color="#3b82f6" />
                        </TouchableOpacity>

                        <TouchableOpacity >
                                <Ionicons name="trash" size={24} color="#ef4444" />
                            </TouchableOpacity>
                   
                    </View>
                )}
                />
            </View>
    
    )
};