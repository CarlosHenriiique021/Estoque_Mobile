import { useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import do Estilo na raiz do projeto (3 níveis para fora)
import { styles } from '../../../style'; 

export default function CadastroProduto({ navigation }) {
    const [nomeProduto, setNomeProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    async function salvarProduto() {
        const erros = [];

        const qtd = Number(quantidade);
        const preco = parseFloat(valor.replace(',', '.'));

        if (nomeProduto.trim() === "") {
            erros.push("• Nome do produto inválido.");
        }

        if (categoria.trim() === "") {
            erros.push("• Categoria inválida.");
        }

        if (isNaN(qtd) || qtd <= 0) {
            erros.push("• Quantidade deve ser um número maior que zero.");
        }

        if (isNaN(preco) || preco <= 0) {
            erros.push("• Valor deve ser um número maior que zero.");
        }

        if (erros.length > 0) {
            alert(
                "Foram encontrados os seguintes erros:\n\n" +
                erros.join("\n")
            );
            return;
        }

        const novoProduto = {
            id: Date.now(),
            nomeProduto: nomeProduto.trim(),
            categoria: categoria.trim(),
            quantidade: qtd,
            valor: preco
        };

        try {
            const json = await AsyncStorage.getItem("produtos");
            const produtos = json ? JSON.parse(json) : [];

            produtos.push(novoProduto);

            await AsyncStorage.setItem("produtos", JSON.stringify(produtos));

            alert("Produto cadastrado com sucesso!");

            setNomeProduto("");
            setCategoria("");
            setQuantidade("");
            setValor("");

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar produto.");
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.CadastroProduto_container}>

                <View style={styles.CadastroProduto_container2}>
                    <View style={styles.CadastroProduto_container}>

                        <View style={styles.CadastroProduto_CotainerImagem}>
                            <Image
                                /* 3 níveis para fora para alcançar a pasta assets na raiz */
                                source={require('../../../assets/local-logoTextBranco.png')}
                                style={styles.CadastroProduto_logo}
                            />
                        </View>

                        <Text style={styles.CadastroProduto_tituloCadastroProduto}>Cadastro de Produto</Text>
                    </View>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={styles.CadastroProduto_viewContainer}>
                        <Text style={styles.CadastroProduto_textoPrincipal}>Nome</Text>
                        <TextInput 
                            style={styles.CadastroProduto_textoInput}
                            placeholder='Nome do produto'
                            placeholderTextColor="rgba(255, 255, 255, 0.3)"
                            value={nomeProduto}
                            onChangeText={setNomeProduto}
                        />
                    </View>

                    <View style={styles.CadastroProduto_viewContainer}>
                        <Text style={styles.CadastroProduto_textoPrincipal}>Categoria</Text>
                        <TextInput
                            style={styles.CadastroProduto_textoInput}
                            placeholder='Digite a categoria...'
                            placeholderTextColor="rgba(255, 255, 255, 0.3)"
                            value={categoria}
                            onChangeText={setCategoria}
                        />
                    </View>

                    <View style={styles.CadastroProduto_viewContainer}>
                        <Text style={styles.CadastroProduto_textoPrincipal}>Quantidade</Text>
                        <TextInput 
                            style={styles.CadastroProduto_textoInput}
                            placeholder='Digite a quantidade...'
                            placeholderTextColor="rgba(255, 255, 255, 0.3)"
                            keyboardType="numeric"
                            value={quantidade}
                            onChangeText={setQuantidade}
                        />
                    </View>

                    <View style={styles.CadastroProduto_viewContainer}>
                        <Text style={styles.CadastroProduto_textoPrincipal}>Valor</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.CadastroProduto_textoCifrao}>R$</Text>
                            <TextInput 
                                style={[styles.CadastroProduto_textoInputValor, { flex: 1 }]}
                                placeholder='Digite o valor...'
                                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                keyboardType="decimal-pad"
                                value={valor}
                                onChangeText={setValor}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={salvarProduto}>
                        <View style={styles.CadastroProduto_btn_Salvar}>
                            <Text style={styles.CadastroProduto_btn_SalvarText}> SALVAR </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.CadastroProduto_viewEditarELista}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditarProduto')}>
                            <Text style={styles.CadastroProduto_btn_editar}> EDITAR </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => navigation.navigate('ListaProdutos')}>
                            <Text style={styles.CadastroProduto_btn_lista}> LISTAR </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
}