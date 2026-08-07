import React, { useState, useCallback } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator, 
    Image, 
    Modal, 
    TextInput,
    ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { styles, colors } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Perfil({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDark, toggleTheme } = useTheme();

    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [modalSenhaVisible, setModalSenhaVisible] = useState(false);

    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');

    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

    useFocusEffect(
        useCallback(() => {
            carregarDadosUsuario();
        }, [])
    );

    async function carregarDadosUsuario() {
        try {
            setLoading(true);
            const json = await AsyncStorage.getItem('usuarioLogado');
            if (json) {
                const userObj = JSON.parse(json);
                setUsuario(userObj);
                setNovoNome(userObj.nome || '');
                setNovoEmail(userObj.email || '');
            } else {
                setUsuario(null);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
        } finally {
            setLoading(false);
        }
    }

    async function salvarAtualizacaoUsuario(usuarioAtualizado) {
        try {
            setUsuario(usuarioAtualizado);
            await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

            const jsonUsuarios = await AsyncStorage.getItem('usuarios');
            if (jsonUsuarios) {
                const listaUsuarios = JSON.parse(jsonUsuarios);
                const listaAtualizada = listaUsuarios.map((u) => {
                    if (u.email?.toLowerCase() === usuarioAtualizado.email?.toLowerCase()) {
                        return usuarioAtualizado;
                    }
                    return u;
                });
                await AsyncStorage.setItem('usuarios', JSON.stringify(listaAtualizada));
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
        }
    }

    async function selecionarFoto() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso às suas fotos para alterar o perfil.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.3,
            base64: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            try {
                const asset = result.assets[0];
                const fotoBase64 = `data:image/jpeg;base64,${asset.base64}`;

                const usuarioComNovaFoto = { ...usuario, foto: fotoBase64 };
                await salvarAtualizacaoUsuario(usuarioComNovaFoto);
                Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
            } catch (error) {
                Alert.alert('Erro', 'Falha ao processar a foto.');
            }
        }
    }

    async function handleSalvarPerfil() {
        if (!novoNome.trim() || !novoEmail.trim()) {
            Alert.alert('Atenção', 'Nome e e-mail não podem ficar vazios.');
            return;
        }

        const usuarioAtualizado = {
            ...usuario,
            nome: novoNome.trim(),
            email: novoEmail.trim(),
        };

        await salvarAtualizacaoUsuario(usuarioAtualizado);
        setModalEditarVisible(false);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    }

    async function handleSalvarSenha() {
        if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
            Alert.alert('Atenção', 'Preencha todos os campos de senha.');
            return;
        }

        if (senhaAtual !== usuario.senha) {
            Alert.alert('Erro', 'A senha atual está incorreta.');
            return;
        }

        if (novaSenha.length < 6) {
            Alert.alert('Atenção', 'A nova senha deve ter no mínimo 6 caracteres.');
            return;
        }

        if (novaSenha !== confirmarNovaSenha) {
            Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
            return;
        }

        const usuarioAtualizado = {
            ...usuario,
            senha: novaSenha,
        };

        await salvarAtualizacaoUsuario(usuarioAtualizado);
        
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setModalSenhaVisible(false);

        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    }

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem('usuarioLogado');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível encerrar a sessão.');
        }
    }

    const bgColor = isDark ? colors.black : colors.lightBg;
    const cardBgColor = isDark ? colors.darkCard : colors.lightCard;
    const textColor = isDark ? colors.textLight : colors.textDark;
    const borderColor = isDark ? colors.darkBorder : colors.lightBorder;
    const inputBgColor = isDark ? colors.darkCard : colors.lightCard;
    const iconBlue = '#0052CC';

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            style={[styles.container, { backgroundColor: bgColor }]}
            showsVerticalScrollIndicator={false}
        >
            {/* CABEÇALHO COMPACTO */}
            <View style={{
                backgroundColor: isDark ? '#001D4A' : '#0052CC',
                paddingTop: 45,
                paddingBottom: 20,
                paddingHorizontal: 20,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
            }}>
                <View style={styles.topBarHome}>
                    <Text style={[styles.saudacaoHome, { fontSize: 20 }]}>Perfil</Text>

                    <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeHome}>
                        <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" style={{ marginVertical: 10 }} />
                ) : usuario ? (
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={selecionarFoto} style={{ position: 'relative', marginBottom: 6 }}>
                            {usuario.foto ? (
                                <Image source={{ uri: usuario.foto }} style={{ width: 64, height: 64, borderRadius: 32 }} />
                            ) : (
                                <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>
                                        {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U'}
                                    </Text>
                                </View>
                            )}
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: '#2563EB',
                                padding: 4,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: '#FFFFFF',
                            }}>
                                <Ionicons name="camera" size={10} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>{usuario.nome}</Text>
                        <Text style={{ fontSize: 12, color: '#E0E7FF', marginTop: 1 }}>{usuario.email}</Text>
                    </View>
                ) : null}
            </View>

            {/* OPÇÕES DO MENU */}
            {usuario ? (
                <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                    <View style={[styles.card, { backgroundColor: cardBgColor, borderColor, borderWidth: isDark ? 1 : 0 }]}>
                        <TouchableOpacity 
                            style={[styles.menuItem, { borderBottomColor: borderColor, paddingVertical: 14 }]} 
                            onPress={() => setModalEditarVisible(true)}
                        >
                            <Ionicons name="person-outline" size={20} color={iconBlue} style={styles.menuIcon} />
                            <Text style={[styles.menuItemText, { color: textColor }]}>Editar Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, { borderBottomColor: borderColor, paddingVertical: 14 }]} 
                            onPress={() => setModalSenhaVisible(true)}
                        >
                            <Ionicons name="lock-closed-outline" size={20} color={iconBlue} style={styles.menuIcon} />
                            <Text style={[styles.menuItemText, { color: textColor }]}>Alterar Senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, { borderBottomWidth: 0, paddingVertical: 14 }]} 
                            onPress={handleLogout}
                        >
                            <Ionicons name="log-out-outline" size={20} color="#EF4444" style={styles.menuIcon} />
                            <Text style={[styles.menuItemText, { color: '#EF4444', fontWeight: 'bold' }]}>
                                Sair da Conta
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : !loading && (
                <View style={styles.center}>
                    <Text style={{ color: textColor, marginBottom: 15 }}>
                        Nenhum usuário conectado.
                    </Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.textoButton}>Ir para o Login</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* MODAL EDITAR PERFIL */}
            <Modal visible={modalEditarVisible} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', paddingHorizontal: 20 }}>
                    <View style={[styles.card, { backgroundColor: cardBgColor, padding: 20, borderColor, borderWidth: isDark ? 1 : 0 }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: textColor }}>
                            Editar Perfil
                        </Text>

                        <Text style={[styles.label, { color: textColor }]}>Nome</Text>
                        <TextInput
                            style={[styles.input, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            value={novoNome}
                            onChangeText={setNovoNome}
                            placeholder="Seu nome completo"
                            placeholderTextColor={isDark ? '#666' : '#AAA'}
                        />

                        <Text style={[styles.label, { color: textColor }]}>E-mail</Text>
                        <TextInput
                            style={[styles.input, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            value={novoEmail}
                            onChangeText={setNovoEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Seu e-mail"
                            placeholderTextColor={isDark ? '#666' : '#AAA'}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 }}>
                            <TouchableOpacity 
                                style={[styles.button, { flex: 1, backgroundColor: isDark ? '#333333' : '#E0E0E0' }]} 
                                onPress={() => setModalEditarVisible(false)}
                            >
                                <Text style={{ color: isDark ? '#FFFFFF' : '#333333', fontWeight: 'bold' }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.button, { flex: 1 }]} 
                                onPress={handleSalvarPerfil}
                            >
                                <Text style={styles.textoButton}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL ALTERAR SENHA */}
            <Modal visible={modalSenhaVisible} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', paddingHorizontal: 20 }}>
                    <View style={[styles.card, { backgroundColor: cardBgColor, padding: 20, borderColor, borderWidth: isDark ? 1 : 0 }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: textColor }}>
                            Alterar Senha
                        </Text>

                        <Text style={[styles.label, { color: textColor }]}>Senha Atual</Text>
                        <TextInput
                            style={[styles.input, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                            secureTextEntry
                            placeholder="Sua senha atual"
                            placeholderTextColor={isDark ? '#666' : '#AAA'}
                        />

                        <Text style={[styles.label, { color: textColor }]}>Nova Senha</Text>
                        <TextInput
                            style={[styles.input, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor={isDark ? '#666' : '#AAA'}
                        />

                        <Text style={[styles.label, { color: textColor }]}>Confirmar Nova Senha</Text>
                        <TextInput
                            style={[styles.input, { color: textColor, borderColor, backgroundColor: inputBgColor }]}
                            value={confirmarNovaSenha}
                            onChangeText={setConfirmarNovaSenha}
                            secureTextEntry
                            placeholder="Repita a nova senha"
                            placeholderTextColor={isDark ? '#666' : '#AAA'}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 }}>
                            <TouchableOpacity 
                                style={[styles.button, { flex: 1, backgroundColor: isDark ? '#333333' : '#E0E0E0' }]} 
                                onPress={() => setModalSenhaVisible(false)}
                            >
                                <Text style={{ color: isDark ? '#FFFFFF' : '#333333', fontWeight: 'bold' }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.button, { flex: 1 }]} 
                                onPress={handleSalvarSenha}
                            >
                                <Text style={styles.textoButton}>Salvar Senha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}