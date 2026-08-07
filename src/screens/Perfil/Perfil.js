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
import { Ionicons } from '@expo/vector-icons';
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
            quality: 0.3, // Qualidade reduzida para otimizar o armazenamento no AsyncStorage
            base64: true,  // Habilita a conversão da imagem para string Base64
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            try {
                const asset = result.assets[0];
                // Cria a URI no formato Data Base64
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

    const bgColor = isDark ? '#081225' : '#F5F7FB';
    const cardBgColor = isDark ? '#0F1C36' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#111827';
    const borderColor = isDark ? '#192A4A' : '#F0F2F5';
    const iconBlue = '#2563EB';

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            style={[styles.container, { backgroundColor: bgColor }]}
        >
            <View style={isDark ? styles.headerDark : styles.headerLight}>
                <View style={styles.topBar}>
                    <Text style={styles.tituloHeader}>Perfil</Text>
                    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                        <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#FFFFFF" style={{ marginVertical: 30 }} />
                ) : usuario ? (
                    <View style={styles.userInfoArea}>
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
                                <Ionicons name="camera" size={14} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.nomeUsuario}>{usuario.nome}</Text>
                        <Text style={styles.emailUsuario}>{usuario.email}</Text>
                    </View>
                ) : null}
            </View>

            {usuario ? (
                <View style={styles.menuContainer}>
                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <TouchableOpacity 
                            style={[styles.menuItem, { borderBottomColor: borderColor }]} 
                            onPress={() => setModalEditarVisible(true)}
                        >
                            <Ionicons name="person-outline" size={20} color={iconBlue} style={styles.menuIcon} />
                            <Text style={[styles.menuItemText, { color: textColor }]}>Editar Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, { borderBottomColor: borderColor }]} 
                            onPress={() => setModalSenhaVisible(true)}
                        >
                            <Ionicons name="lock-closed-outline" size={20} color={iconBlue} style={styles.menuIcon} />
                            <Text style={[styles.menuItemText, { color: textColor }]}>Alterar Senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, { borderBottomWidth: 0 }]} 
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

            <Modal visible={modalEditarVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: cardBgColor }]}>
                        <Text style={[styles.modalTitle, { color: textColor }]}>Editar Perfil</Text>

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Nome</Text>
                        <TextInput
                            style={[styles.modalInput, { color: textColor, borderColor: borderColor }]}
                            value={novoNome}
                            onChangeText={setNovoNome}
                            placeholder="Seu nome completo"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>E-mail</Text>
                        <TextInput
                            style={[styles.modalInput, { color: textColor, borderColor: borderColor }]}
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

            <Modal visible={modalSenhaVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: cardBgColor }]}>
                        <Text style={[styles.modalTitle, { color: textColor }]}>Alterar Senha</Text>

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Senha Atual</Text>
                        <TextInput
                            style={[styles.modalInput, { color: textColor, borderColor: borderColor }]}
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                            secureTextEntry
                            placeholder="Sua senha atual"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Nova Senha</Text>
                        <TextInput
                            style={[styles.modalInput, { color: textColor, borderColor: borderColor }]}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor={isDark ? '#888' : '#AAA'}
                        />

                        <Text style={[styles.inputLabel, { color: isDark ? '#CCC' : '#333' }]}>Confirmar Nova Senha</Text>
                        <TextInput
                            style={[styles.modalInput, { color: textColor, borderColor: borderColor }]}
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
    },
    headerLight: {
        backgroundColor: '#0052CC',
        paddingTop: 50,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 160,
        borderBottomRightRadius: 160,
        alignItems: 'center',
    },
    headerDark: {
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 15,
    },
    tituloHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    themeButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
    userInfoArea: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatarImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    avatarTextContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    badgeEdit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#2563EB',
        padding: 7,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    nomeUsuario: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    emailUsuario: {
        fontSize: 13,
        color: '#A0AEC0',
        marginTop: 2,
    },
    menuContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
    },
    card: {
        borderRadius: 16,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    menuIcon: {
        marginRight: 16,
    },
    menuItemText: {
        fontSize: 15,
        fontWeight: '600',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    loginRedirButton: {
        backgroundColor: '#0052CC',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    loginRedirText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        borderRadius: 16,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: 13,
        marginTop: 10,
        marginBottom: 4,
    },
    modalInput: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
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
        backgroundColor: '#0052CC',
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