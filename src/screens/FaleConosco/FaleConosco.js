import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Linking 
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function FaleConosco({ navigation }) {

  const handleOpenWhatsApp = () => {
    const phoneNumber = '5521985588439';
    const message = 'Olá! Gostaria de tirar algumas dúvidas.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://api.whatsapp.com/send?phone=${phoneNumber}`);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fale Conosco</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.iconBoxContainer}>
            <Ionicons name="cube" size={60} color="#2B50ED" />
          </View>
          <Text style={styles.title}>Estoque Mobile</Text>
          <Text style={styles.subtitle}>Soluções inteligentes para gestão de estoque</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-sharp" size={20} color="#2B50ED" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTextBold}>Rua São Francisco Xavier, 417</Text>
              <Text style={styles.infoTextSub}>Rio de Janeiro - RJ</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="call" size={18} color="#2B50ED" />
            </View>
            <Text style={styles.infoTextBold}>(21) 985588439</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="mail" size={18} color="#2B50ED" />
            </View>
            <Text style={styles.infoTextBold}>contato@estoquemobile.com</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="time" size={20} color="#2B50ED" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTextBold}>Segunda a Sexta</Text>
              <Text style={styles.infoTextSub}>08:00 às 18:00</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleOpenWhatsApp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" style={styles.whatsappIcon} />
          <Text style={styles.whatsappButtonText}>Conversar no WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconBoxContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B50ED',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
  },
  infoSection: {
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    justifyContent: 'center',
  },
  infoTextBold: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  infoTextSub: {
    fontSize: 13,
    color: '#777777',
    marginTop: 2,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  whatsappIcon: {
    marginRight: 10,
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});