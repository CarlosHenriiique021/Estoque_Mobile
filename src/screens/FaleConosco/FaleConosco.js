import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Linking,
  ScrollView 
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { styles, colors } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function FaleConosco({ navigation }) {
  const { isDark, toggleTheme } = useTheme();

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

  const bgColor = isDark ? colors.black : colors.lightBg;
  const cardBgColor = isDark ? colors.darkCard : '#EEF2FF';
  const textColor = isDark ? colors.textLight : colors.textDark;
  const subTextColor = isDark ? colors.textMutedDark : colors.textMuted;
  const iconBlue = '#0052CC';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* CABEÇALHO SUPERIOR PADRONIZADO */}
        <View style={styles.headerSimplesTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltarTop}>
            <Ionicons name="chevron-back" size={26} color={textColor} />
          </TouchableOpacity>

          <Text style={[styles.tituloCadastroTop, { color: textColor }]}>
            Fale Conosco
          </Text>

          <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeTop}>
            <Ionicons 
              name={isDark ? 'sunny-outline' : 'moon-outline'} 
              size={22} 
              color={textColor} 
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 24, paddingBottom: 24, justifyContent: 'space-between', flex: 1 }}>
          
          {/* LOGO & TÍTULO */}
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <View style={{ marginBottom: 12 }}>
              <Ionicons name="cube" size={60} color={iconBlue} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: iconBlue, marginBottom: 6 }}>
              Estoque Mobile
            </Text>
            <Text style={{ fontSize: 13, color: subTextColor, textAlign: 'center' }}>
              Soluções inteligentes para gestão de estoque
            </Text>
          </View>

          {/* INFORMAÇÕES DE CONTATO */}
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: cardBgColor, justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Ionicons name="location-sharp" size={20} color={iconBlue} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: textColor }}>Rua São Francisco Xavier, 417</Text>
                <Text style={{ fontSize: 13, color: subTextColor, marginTop: 2 }}>Rio de Janeiro - RJ</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: cardBgColor, justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Ionicons name="call" size={18} color={iconBlue} />
              </View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: textColor }}>(21) 985588439</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: cardBgColor, justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Ionicons name="mail" size={18} color={iconBlue} />
              </View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: textColor }}>contato@estoquemobile.com</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: cardBgColor, justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Ionicons name="time" size={20} color={iconBlue} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: textColor }}>Segunda a Sexta</Text>
                <Text style={{ fontSize: 13, color: subTextColor, marginTop: 2 }}>08:00 às 18:00</Text>
              </View>
            </View>
          </View>

          {/* BOTÃO WHATSAPP */}
          <TouchableOpacity 
            style={{
              backgroundColor: '#25D366',
              flexDirection: 'row',
              height: 50,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }} 
            onPress={handleOpenWhatsApp}
          >
            <FontAwesome name="whatsapp" size={24} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
              Conversar no WhatsApp
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}