import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Usuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');

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

  return (
    <SafeAreaView style={styles.container}>
      
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Usuários</Text>
        <View style={{ width: 24 }} /> {/* Espaçador para centralizar o título */}
      </View>

     
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuários..."
            placeholderTextColor="#9CA3AF"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

    
      <FlatList
        data={usuariosFiltrados}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            
          
            <View style={styles.avatarContainer}>
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {item.nome ? item.nome.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
              )}
            </View>

           
            <View style={styles.infoContainer}>
              <Text style={styles.nomeText}>{item.nome || 'Sem Nome'}</Text>
              <Text style={styles.emailText}>{item.email || 'sem-email@exemplo.com'}</Text>
              <Text style={styles.cargoText}>{item.cargo || 'Usuário'}</Text>
            </View>

            
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('EditarUsuario', { usuario: item, index })}
                style={styles.actionBtn}
              >
                <Ionicons name="pencil-outline" size={20} color="#0052CC" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => apagarUsuario(index)}
                style={styles.actionBtn}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },

  // Pesquisa
  searchRow: {
    marginBottom: 20,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  // Card de Usuário
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  avatarPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B5563',
  },

  infoContainer: {
    flex: 1,
  },
  nomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  emailText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cargoText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBtn: {
    padding: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#9CA3AF',
    fontSize: 15,
  },
});