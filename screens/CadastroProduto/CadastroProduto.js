import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Button, TouchableOpacity, TextInput } from 'react-native';
import { Picker, ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../style';

export default function CadastroProduto({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <View style={styles.container}>

                    <View style={styles.CotainerImagem}>
                        <Image
                            source={require('../../assets/local-logoTextBranco.png')}
                            style={styles.logo}
                        />
                    </View>

                    <Text style={styles.tituloCadastroProduto}>Cadastro de Produto</Text>
                </View>
            </View>

            <View>
                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Nome</Text>
                    <TextInput style={styles.textoInput} placeholder='Nome do produto' placeholderTextColor="rgba(255, 255, 255, 0.3)"></TextInput>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Categoria</Text>
                    <TextInput style={styles.textoInput} placeholder='Digite a categoria...' placeholderTextColor="rgba(255, 255, 255, 0.3)"></TextInput>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Quantidade</Text>
                    <TextInput style={styles.textoInput} placeholder='Digite a quantidade...' placeholderTextColor="rgba(255, 255, 255, 0.3)"></TextInput>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Valor</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textoCifrao}>R$</Text>
                        <TextInput style={styles.textoInputValor} placeholder='Digite o valor...' placeholderTextColor="rgba(255, 255, 255, 0.6)"></TextInput>
                    </View>
                </View>

                <TouchableOpacity>
                    <View style={styles.btn_Salvar}>
                        <Text style={styles.btn_SalvarText}> SALVAR </Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.viewEditarELista}>
                    <TouchableOpacity>
                        <Text style={styles.btn_editar}> EDITAR </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.btn_lista}> LISTAR </Text>

                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};


