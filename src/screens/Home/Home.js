import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/style';
import { ola } from '../../services/storage';

import { useTheme } from '../../contexts/ThemeContext';

export default function Home({ navigation }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <View style={[
            styles.viewPrincipal, 
            { backgroundColor: isDark ? '#121212' : '#FFFFFF', paddingHorizontal: 20 }
        ]}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: 40,
                marginBottom: 20
            }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: isDark ? '#FFFFFF' : '#000000'
                }}>
                    Painel Principal
                </Text>

                <TouchableOpacity 
                    onPress={toggleTheme}
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 20,
                        backgroundColor: isDark ? '#2C2C2C' : '#E0E0E0'
                    }}
                >
                    <Text style={{ fontSize: 14, color: isDark ? '#FFFFFF' : '#000000' }}>
                        {isDark ? '☀️' : '🌙'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{
                width: '100%',
                padding: 16,
                borderRadius: 8,
                backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5',
                marginTop: 10
            }}>
                <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '600', 
                    color: isDark ? '#FFFFFF' : '#333333' 
                }}>
                    Bem-vindo ao Estoque Mobile!
                </Text>
                <Text style={{ 
                    fontSize: 14, 
                    color: isDark ? '#AAAAAA' : '#666666',
                    marginTop: 6 
                }}>
                    Utilize o menu inferior para gerenciar produtos e usuários cadastrados.
                </Text>
            </View>

        </View>
    );
}