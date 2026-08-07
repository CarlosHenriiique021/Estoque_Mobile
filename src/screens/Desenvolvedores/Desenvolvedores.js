import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles, colors } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Desenvolvedores({ navigation }) {
    const { isDark, toggleTheme } = useTheme();

    const bgColor = isDark ? colors.black : colors.lightBg;
    const cardBgColor = isDark ? colors.darkCard : colors.lightCard;
    const textColor = isDark ? colors.textLight : colors.textDark;
    const subTextColor = isDark ? colors.textMutedDark : colors.textMuted;
    const borderColor = isDark ? colors.darkBorder : colors.lightBorder;

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                
                {/* CABEÇALHO RECUADO COM ALINHAMENTO PADRÃO */}
                <View style={styles.headerSimplesTop}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.btnVoltarTop}
                    >
                        <Ionicons name="chevron-back" size={26} color={textColor} />
                    </TouchableOpacity>

                    <Text style={[styles.tituloCadastroTop, { color: textColor }]}>
                        Desenvolvedores
                    </Text>

                    <TouchableOpacity onPress={toggleTheme} style={styles.btnThemeTop}>
                        <Ionicons 
                            name={isDark ? 'sunny-outline' : 'moon-outline'} 
                            size={22} 
                            color={textColor} 
                        />
                    </TouchableOpacity>
                </View>

                {/* CONTEÚDO / CARDS DOS DESENVOLVEDORES */}
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[
                        styles.card, 
                        { 
                            backgroundColor: cardBgColor, 
                            padding: 16, 
                            borderColor, 
                            borderWidth: isDark ? 1 : 0 
                        }
                    ]}>
                        <Text style={[styles.texto, { color: textColor, fontSize: 18, fontWeight: 'bold' }]}>
                            Equipe de Desenvolvimento
                        </Text>
                        <Text style={[styles.textoConta, { color: subTextColor, marginTop: 5 }]}>
                            Projeto desenvolvido para gerenciamento dinâmico de estoque e usuários.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}