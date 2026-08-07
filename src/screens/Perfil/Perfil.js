import React, { useState, useCallback } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    StyleSheet, 
    ActivityIndicator, 
    Image, 
    Modal, 
    TextInput,
    ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../contexts/ThemeContext'; // Ajuste o caminho conforme seu projeto

export default function Perfil({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDark, toggleTheme } = useTheme();

    // Modais
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [modalSenhaVisible, setModalSenhaVisible] = useState(false);

    // Estados do Formulário - Editar Perfil
    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');

    // Estados do Formulário - Alterar Senha
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

    // Carrega o usuário ao entrar na tela
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

    // --- SELEÇÃO DE FOTO ---
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
            quality: 0.5,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uriFoto = result.assets[0].uri;
            await salvarAtualizacaoUsuario({ ...usuario, foto: uriFoto });
        }
    }

    // --- SALVAR ALTERAÇÕES GERAIS NO ASYNCSTORAGE ---
    async function salvarAtualizacaoUsuario(usuarioAtualizado) {
        try {
            // 1. Atualiza no estado local
            setUsuario(usuarioAtualizado);

            // 2. Atualiza a chave usuarioLogado
            await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

            // 3. Atualiza a lista geral 'usuarios'
            const jsonUsuarios = await AsyncStorage.getItem('usuarios');
            if (jsonUsuarios) {
                const listaUsuarios = JSON.parse(jsonUsuarios);
                const listaAtualizada = listaUsuarios.map((u) => {
                    // Busca pelo email antigo ou atual para atualizar a conta correta
                    if (u.email.toLowerCase() === usuario.email.toLowerCase()) {
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

    // --- SALVAR EDITAR PERFIL ---
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

    // --- ALTERAR SENHA ---
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
        
        // Limpa os campos
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setModalSenhaVisible(false);

        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    }

    // --- LOGOUT ---
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

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}
        >
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={[styles.titulo, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    Meu Perfil
                </Text>
                
                <TouchableOpacity 
                    onPress={toggleTheme} 
                    style={[styles.themeButton, { backgroundColor: isDark ? '#2C2C2C' : '#E0E0E0' }]}
                >
                    <Text style={{ fontSize: 16 }}>{isDark ? '☀️' : '🌙'}</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={{ color: isDark ? '#FFFFFF' : '#000000', marginTop: 10 }}>
                        Carregando dados...
                    </Text>
                </View>
            ) : usuario ? (
                <View style={styles.infoArea}>
                    {/* Foto do Perfil */}
                    <TouchableOpacity onPress={selecionarFoto} style={styles.avatarContainer}>
                        {usuario.foto ? (
                            <Image source={{ uri: usuario.foto }} style={styles.avatarImage} />
                        ) : (
                            <View style={styles.avatarTextContainer}>
                                <Text style={styles.avatarText}>
                                    {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U'}
                                </Text>
                            </View>
                        )}
                        <View style={styles.badgeEdit}>
                            <Text style={styles.badgeText}>📷</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={[styles.dicaFoto, { color: isDark ? '#AAAAAA' : '#666666' }]}>
                        Toque para alterar a foto
                    </Text>

                    {/* Exibição dos Dados */}
                    <View style={styles.dadosContainer}>
                        <Text style={[styles.label, { color: isDark ? '#888888' : '#666666' }]}>Nome</Text>
                        <Text style={[styles.valor, { color: isDark ? '#FFFFFF' : '#000000' }]}>{usuario.nome}</Text>

                        <Text style={[styles.label, { color: isDark ? '#888888' : '#666666' }]}>E-mail</Text>
                        <Text style={[styles.valor, { color: isDark ? '#FFFFFF' : '#000000' }]}>{usuario.email}</Text>
                    </View>

                    {/* Botões de Ação */}
                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={() => setModalEditarVisible(true)}
                    >
                        <Text style={styles.actionButtonText}>✏️ Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={() => setModalSenhaVisible(true)}
                    >
                        <Text style={styles.actionButtonText}>🔒 Alterar Senha</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.center}>
                    <Text style={{ color: isDark ? '#FFFFFF' : '#000000', marginBottom: 15 }}>
                        Nenhum usuário conectado.
                    </Text>
                    <TouchableOpacity 
                        style={styles.loginRedirButton} 
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginRedirText}>Ir para o Login</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Botão Sair */}
            {usuario && (
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            )}

            {/* MODAL 1: EDITAR PERFIL */}
            <Modal visible={modalEditarVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
                        <Text style={[styles.modalTitle, { color: isDark ? '#FFF' : '#000' }]}>
                            Editar Perfil
                        </Text>

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Nome</Text>
                        <TextInput
                            style={[styles.modalInput, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#444' : '#CCC' }]}
                            value={novoNome}
                            onChangeText={setNovoNome}
                            placeholder="Seu nome completo"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>E-mail</Text>
                        <TextInput
                            style={[styles.modalInput, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#444' : '#CCC' }]}
                            value={novoEmail}
                            onChangeText={setNovoEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Seu e-mail"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity 
                                style={[styles.modalBtn, styles.modalBtnCancelar]} 
                                onPress={() => setModalEditarVisible(false)}
                            >
                                <Text style={styles.modalBtnTextCancelar}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.modalBtn, styles.modalBtnSalvar]} 
                                onPress={handleSalvarPerfil}
                            >
                                <Text style={styles.modalBtnTextSalvar}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL 2: ALTERAR SENHA */}
            <Modal visible={modalSenhaVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
                        <Text style={[styles.modalTitle, { color: isDark ? '#FFF' : '#000' }]}>
                            Alterar Senha
                        </Text>

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Senha Atual</Text>
                        <TextInput
                            style={[styles.modalInput, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#444' : '#CCC' }]}
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                            secureTextEntry
                            placeholder="Sua senha atual"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Nova Senha</Text>
                        <TextInput
                            style={[styles.modalInput, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#444' : '#CCC' }]}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Confirmar Nova Senha</Text>
                        <TextInput
                            style={[styles.modalInput, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#444' : '#CCC' }]}
                            value={confirmarNovaSenha}
                            onChangeText={setConfirmarNovaSenha}
                            secureTextEntry
                            placeholder="Repita a nova senha"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity 
                                style={[styles.modalBtn, styles.modalBtnCancelar]} 
                                onPress={() => setModalSenhaVisible(false)}
                            >
                                <Text style={styles.modalBtnTextCancelar}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.modalBtn, styles.modalBtnSalvar]} 
                                onPress={handleSalvarSenha}
                            >
                                <Text style={styles.modalBtnTextSalvar}>Salvar Senha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    themeButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoArea: {
        alignItems: 'center',
        marginTop: 10,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarTextContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 40,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    badgeEdit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#2C2C2C',
        padding: 6,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    badgeText: {
        fontSize: 12,
    },
    dicaFoto: {
        fontSize: 12,
        marginBottom: 15,
    },
    dadosContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        marginTop: 10,
    },
    valor: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },
    actionButton: {
        width: '100%',
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginRedirButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    loginRedirText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    /* Estilos dos Modais */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 4,
    },
    modalInput: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modalBtnCancelar: {
        backgroundColor: '#E0E0E0',
    },
    modalBtnSalvar: {
        backgroundColor: '#007AFF',
    },
    modalBtnTextCancelar: {
        color: '#333333',
        fontWeight: 'bold',
    },
    modalBtnTextSalvar: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});