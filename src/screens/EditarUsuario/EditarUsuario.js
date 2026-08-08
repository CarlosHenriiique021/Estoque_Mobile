import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function EditarUsuario({ navigation, route }) {
    console.log("DADOS CHEGANDO:", route.params);

    const usuario = route.params?.usuario || {};
    const index = route.params?.index;

    const [nome, setNome] = useState(usuario.nome || '');
    const [email, setEmail] = useState(usuario.email || '');
    const [senha, setSenha] = useState(usuario.senha || '');

    const { isDark, toggleTheme } = useTheme();

    async function salvarEdicao() {
        try {
            const json = await AsyncStorage.getItem('usuarios');
            const lista = json ? JSON.parse(json) : [];

            lista[index] = { ...lista[index], nome, email, senha };

            await AsyncStorage.setItem('usuarios', JSON.stringify(lista));
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
        }
    }

    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const inputBgColor = isDark ? '#121212' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const borderColor = isDark ? '#222222' : '#CCCCCC';

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                
                {/* CABEÇALHO SUPERIOR */}
                <View style={[styles.headerSimplesTop, { marginBottom: 15 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltarTop}>
                        <Ionicons name="chevron-back" size={26} color={textColor} />
                    </TouchableOpacity>

                    <Text style={[styles.tituloCadastroTop, { color: textColor }]}>
                        Editar Usuário
                    </Text>

                    <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeTop}>
                        <Ionicons 
                            name={isDark ? 'sunny-outline' : 'moon-outline'} 
                            size={22} 
                            color={textColor} 
                        />
                    </TouchableOpacity>
                </View>

                {/* FORMULÁRIO */}
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 12 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>Nome</Text>
                        <TextInput
                            style={[
                                styles.CadastroProduto_textoInput,
                                { color: textColor, borderColor, backgroundColor: inputBgColor }
                            ]}
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 12 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>E-mail</Text>
                        <TextInput
                            style={[
                                styles.CadastroProduto_textoInput,
                                { color: textColor, borderColor, backgroundColor: inputBgColor }
                            ]}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.CadastroProduto_viewContainer, { marginBottom: 12 }]}>
                        <Text style={[styles.CadastroProduto_textoPrincipal, { color: textColor }]}>Senha</Text>
                        <TextInput
                            style={[
                                styles.CadastroProduto_textoInput,
                                { color: textColor, borderColor, backgroundColor: inputBgColor }
                            ]}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={true}
                        />
                    </View>

                    {/* BOTÃO SALVAR ALTERAÇÕES */}
                    <TouchableOpacity onPress={salvarEdicao} style={{ marginTop: 20 }}>
                        <View style={styles.CadastroProduto_btn_Salvar}>
                            <Text style={styles.CadastroProduto_btn_textoSalvarProdutos}>Salvar Alterações</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}