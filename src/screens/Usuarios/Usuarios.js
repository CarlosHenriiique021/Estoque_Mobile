import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Usuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');
  const { isDark, toggleTheme } = useTheme();

  async function carregarUsuarios() {
    try {
      const json = await AsyncStorage.getItem('usuarios');
      if (json) {
        setUsuarios(JSON.parse(json));
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarUsuarios();
    }, [])
  );

  async function apagarUsuario(indexParaRemover) {
    const novaLista = usuarios.filter((_, index) => index !== indexParaRemover);
    setUsuarios(novaLista);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
  }

  const usuariosFiltrados = usuarios.filter(user => 
    user.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    user.email?.toLowerCase().includes(busca.toLowerCase())
  );

  const bgColor = isDark ? '#000000' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const cardBgColor = isDark ? '#121212' : '#F5F5F5';
  const subTextColor = isDark ? '#A0AEC0' : '#6B7280';
  const borderColor = isDark ? '#222222' : '#E5E7EB';
  const inputBg = isDark ? '#121212' : '#FFFFFF';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      
      {/* CABEÇALHO SUPERIOR */}
      <View style={styles.headerSimplesTop}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltarTop}>
          <Ionicons name="chevron-back" size={26} color={textColor} />
        </TouchableOpacity>

        <Text style={[styles.tituloHeaderProdutos, { color: textColor }]}>
          Usuários
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeTop}>
            <Ionicons 
              name={isDark ? 'sunny-outline' : 'moon-outline'} 
              size={22} 
              color={textColor} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnAdicionarProdutoHeader}
            onPress={() => navigation.navigate('CadastroUsuario')}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.btnAdicionarProdutoTexto}>Novo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CAMPO DE PESQUISA */}
      <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
        <View style={[styles.searchContainerUsuarios, { backgroundColor: inputBg, borderColor }]}>
          <Ionicons name="search-outline" size={20} color={subTextColor} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInputUsuarios, { color: textColor }]}
            placeholder="Buscar usuários..."
            placeholderTextColor={isDark ? '#666666' : '#9CA3AF'}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      {/* LISTAGEM */}
      <FlatList
        data={usuariosFiltrados}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Ionicons name="people-outline" size={60} color={subTextColor} />
            <Text style={[styles.emptyTextUsuarios, { color: subTextColor }]}>
              Nenhum usuário encontrado.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={[styles.cardUsuario, { backgroundColor: cardBgColor, borderColor }]}>
            
            <View style={styles.avatarContainerUsuario}>
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.avatarImageUsuario} />
              ) : (
                <View style={[styles.avatarPlaceholderUsuario, { backgroundColor: isDark ? '#222222' : '#E5E7EB' }]}>
                  <Text style={[styles.avatarTextUsuario, { color: isDark ? '#FFFFFF' : '#4B5563' }]}>
                    {item.nome ? item.nome.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainerUsuario}>
              <Text style={[styles.nomeTextUsuario, { color: textColor }]}>
                {item.nome || 'Sem Nome'}
              </Text>
              <Text style={[styles.emailTextUsuario, { color: subTextColor }]}>
                {item.email || 'sem-email@exemplo.com'}
              </Text>
              <Text style={styles.cargoTextUsuario}>
                {item.cargo || 'Usuário'}
              </Text>
            </View>

            <View style={styles.actionsContainerUsuario}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('EditarUsuario', { usuario: item, index })}
                style={styles.actionBtnUsuario}
              >
                <Ionicons name="pencil-outline" size={20} color="#0052CC" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => apagarUsuario(index)}
                style={styles.actionBtnUsuario}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>

          </View>
        )}
      />
    </SafeAreaView>
  );
}