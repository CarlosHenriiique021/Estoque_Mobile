import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Button, TouchableOpacity, TextInput } from 'react-native';
import { Picker, ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/style';


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={styles.viewPrincipal}>

            <Image style={styles.logotipo}
                source={require('../../../assets/images/logo.png')}

                style={styles.logotipo}
            />
            <Text style={styles.textoLogo}>Estoque Mobile</Text>

            <Text style={styles.textoLogin}>Faça login para continuar</Text>

            <Text style={styles.texto}>E-mail</Text>

            <TextInput
                style={styles.textoLogin1}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor='gray'
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.texto}>Senha</Text>

            <TextInput
                style={styles.textoLogin1}
                placeholder="Digite sua senha"
                placeholderTextColor='gray'
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textoButton}>
                    Entrar
                </Text>
            </TouchableOpacity>

            <View style={styles.areaCadastro}>
                <Text style={styles.textoConta}>
                    Não tem uma conta?
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
                    <Text style={styles.cadastro}>
                        Criar conta
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
};

