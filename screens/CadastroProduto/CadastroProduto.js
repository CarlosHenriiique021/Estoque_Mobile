import { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Button, TouchableOpacity, TextInput } from 'react-native';
import { Picker, ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CadastroProduto({ navigation }) {

    const [nomeProduto, setNomeProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    async function salvarProduto() {

        const novoProduto = {
            id: Date.now(),
            nomeProduto: nomeProduto,
            categoria: categoria,
            quantidade: quantidade,
            valor: valor
        };

        try {
            const json = await AsyncStorage.getItem('produtos');
            const produtos = json ? JSON.parse(json) : [];
            produtos.push(novoProduto);

            await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
            alert('Produto Registrado!');

            setNomeProduto('');
            setCategoria('');
            setQuantidade('');
            setValor('');
        } catch {
            console.error(Error)
        }
    };

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
                    <TextInput style={styles.textoInput}
                        placeholder='Nome do produto'
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={nomeProduto}
                        onChangeText={setNomeProduto}
                    ></TextInput>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Categoria</Text>
                    <TextInput
                        style={styles.textoInput}
                        placeholder='Digite a categoria...'
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={categoria}
                        onChangeText={setCategoria}
                    ></TextInput>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Quantidade</Text>
                    <TextInput style={styles.textoInput}
                        placeholder='Digite a quantidade...'
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={quantidade}
                        onChangeText={setQuantidade}
                    ></TextInput>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.textoPrincipal}>Valor</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textoCifrao}>R$</Text>
                        <TextInput style={styles.textoInputValor}
                            placeholder='Digite o valor...'
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={valor}
                            onChangeText={setValor}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={salvarProduto}
                >
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


