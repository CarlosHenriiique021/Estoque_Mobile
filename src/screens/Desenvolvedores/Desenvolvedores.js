import React from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    Linking 
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { styles, colors } from '../../styles/style';
import { useTheme } from '../../contexts/ThemeContext';

export default function Desenvolvedores({ navigation }) {
    const { isDark, toggleTheme } = useTheme();

    // Lista com os dados dos desenvolvedores baseada na imagem
    const desenvolvedores = [
      {
            id: '1',
            nome: 'Kayo Dantas',
            cargo: 'Desenvolvedor Mobile',
            descricao: ' ',
            foto: require('../../../assets/images/kayo.jpeg'), 
            github: 'https://github.com/Kayo-Dantas',
            linkedin: 'https://www.linkedin.com/in/kayodantas/',
        },
        {
            id: '2',
            nome: 'Matheus de Matos',
            cargo: 'Desenvolvedor Mobile',
            descricao: ' ',
            foto: require('../../../assets/images/matheus.jpeg'), 
            github: 'https://github.com/MatheusDev0705',
            linkedin: 'https://www.linkedin.com/in/matheus-de-matos-986101263/',
        },
        {
            id: '3',
            nome: 'Flávio Lima',
            cargo: 'Desenvolvedor Mobile',
            descricao: ' ',
            foto: require('../../../assets/images/flavio.jpeg'), 
            github: 'https://github.com/agregor2012',
            linkedin: 'https://www.linkedin.com/in/flaviocezar/',
        },
        
         {
            id: '4',
            nome: 'Carlos Henrique',
            cargo: 'Desenvolvedor Mobile',
            descricao: ' ',
            foto: require('../../../assets/images/carlos_henrique.jpeg'),
            github: 'https://github.com/CarlosHenriiique021',
            linkedin: 'https://www.linkedin.com/in/carlos-henriiique/',
        },
        
    ];

    const abrirLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Erro ao abrir link:", err));
    };

    const bgColor = isDark ? colors.black : colors.lightBg;
    const cardBgColor = isDark ? colors.darkCard : '#FFFFFF';
    const textColor = isDark ? colors.textLight : '#111827';
    const subTextColor = isDark ? colors.textMutedDark : '#4B5563';
    const descColor = isDark ? '#A0AEC0' : '#6B7280';
    const borderColor = isDark ? colors.darkBorder : '#E5E7EB';

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                
                {/* CABEÇALHO RECUADO PADRÃO */}
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

                {/* LISTA DE CARDS DOS DEVS */}
                <View style={{ paddingHorizontal: 20 }}>
                    {desenvolvedores.map((dev) => (
                        <View 
                            key={dev.id}
                            style={{
                                backgroundColor: cardBgColor,
                                borderRadius: 16,
                                padding: 16,
                                flexDirection: 'row',
                                marginBottom: 14,
                                borderWidth: 1,
                                borderColor: borderColor,
                                elevation: isDark ? 0 : 2,
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.05,
                                shadowRadius: 6,
                            }}
                        >
                            {/* FOTO CIRCULAR */}
                            <Image 
                                source={dev.foto}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 35,
                                    marginRight: 14,
                                    backgroundColor: isDark ? '#222' : '#E5E7EB',
                                }}
                            />

                            {/* INFORMAÇÕES DO DEV */}
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>
                                    {dev.nome}
                                </Text>

                                <Text style={{ fontSize: 13, fontWeight: '600', color: subTextColor, marginTop: 2 }}>
                                    {dev.cargo}
                                </Text>

                                <Text style={{ fontSize: 12, color: descColor, marginTop: 4, lineHeight: 16 }}>
                                    {dev.descricao}
                                </Text>

                                {/* BOTOES REDES SOCIAIS */}
                                <View style={{ flexDirection: 'row', marginTop: 10, gap: 12 }}>
                                    <TouchableOpacity onPress={() => abrirLink(dev.github)}>
                                        <FontAwesome name="github" size={22} color={textColor} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => abrirLink(dev.linkedin)}>
                                        <FontAwesome name="linkedin-square" size={22} color="#0A66C2" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}