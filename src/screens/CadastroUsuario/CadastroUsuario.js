import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,

} from 'react-native';
import { styles } from '../../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroUsuario({navigation}) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('')

 async function cadastrar() {
    
    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');  
        return;
    }

    if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres.');
    return;
}

        

        const novoUsuario  = {
    nome: nome,
    email: email,
    senha: senha
};
        const json = await AsyncStorage.getItem('usuarios');
        const usuarios = json ? JSON.parse(json) : [];
         usuarios.push(novoUsuario);
         
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));  

        alert('Cadastro realizado!');

    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
    
    }

    return (
        <View style={styles.viewPrincipal}>
            <View style={styles.titulo}>
                <View style={styles.headerCadastro}>
                    <TouchableOpacity
                        style={styles.botaoVoltar}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.setaVoltar}>‹</Text>
                    </TouchableOpacity>

                    <View style={styles.containerTextoHeader}>
                        <Text style={styles.textoCadastro}>Criar conta</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.texto}>Nome</Text>
            <TextInput
                style={styles.textoCadastroInput}
                placeholder='Digite seu nome completo'
                placeholderTextColor='gray'
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.texto}>E-mail</Text>
            <TextInput
                style={styles.textoCadastroInput}
                placeholder='Digite seu e-mail'
                placeholderTextColor='gray'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.texto}>Senha</Text>
            <TextInput
                style={styles.textoCadastroInput}
                placeholder='Mínimo 6 caracteres'
                placeholderTextColor='gray'
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
            />

            <Text style={styles.texto}>Confirmar senha</Text>
            <TextInput
                style={styles.textoCadastroInput}
                placeholder='Confirme sua senha'
                placeholderTextColor='gray'
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
            />

            {/* REMOVIDO: </View> */}

            <TouchableOpacity style={styles.button} onPress={cadastrar}>
                <Text style={styles.textoButton}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={styles.arealogin}>
                <Text style={styles.textoConta}>
                    Já tem uma conta?
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};