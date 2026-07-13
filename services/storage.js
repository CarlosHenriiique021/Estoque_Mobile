import { StyleSheet, Text, View, Image, FlatList, FlatListComponent, Touchable, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ScrollView } from 'react-native-web';

export default function ComponentStorage() {

    const [nome, setNome] = useState('');
    const [pedido, setPedido] = useState('');
    const [telefone, setTelefone] = useState('');
    const [valor, setValor] = useState('');
    const [usuario, setUsuario] = useState([]);

    async function salvarUsuario() {

        try {
            const novoUsuario = {
                id: Date.now().toString,
                nome,
                pedido,
                telefone,
                valor
            };

            const dados = await
                AsyncStorage.getItem("usuario");
            let lista = [];

            if (dados != null) {
                lista = JSON.parse(dados)
            }

            lista.push(novoUsuario);

            await AsyncStorage.setItem(

                "usuario",
                JSON.stringify(lista)
            );

            setNome("");
            setPedido("");
            setTelefone("");
            setValor("");

            alert("Pedido salvo com sucesso!")
        } catch (error) {
            console.log("Erro: " + error)
        }
    }

    async function carregarUsuarios() {
        try {

            const dados = await
                AsyncStorage.getItem("usuario");

            if (dados != null) {
                setUsuario(JSON.parse(dados))
            } else {
                setUsuario([]);
            }

        } catch (error) {
            console.log("Erro: " + error)

        }
    }

    async function removerUsuario(id) {
        try {
            const novaLista = usuario.filter(
                usuario => usuario.id !== id
            );

            await AsyncStorage.setItem(
                "usuario",
                JSON.stringify(novaLista)
            );

            setUsuario(novaLista);

        } catch (error) {
            console.log("Erro: " + error)

        }

    }

    async function limparStorage() {
        try {
            await AsyncStorage.clear();
            setUsuario([]);
            alert("AsyncStorage Limpo!")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>

                <Text>Cadastro</Text>

                <TextInput
                    placeholder="nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <TextInput
                    placeholder="pedido"
                    value={pedido}
                    onChangeText={setPedido}
                />

                <TextInput
                    placeholder="telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                />

                <TextInput
                    placeholder="valor"
                    value={valor}
                    onChangeText={setValor}
                />

                <TouchableOpacity onPress={salvarUsuario}>
                    <Text>Salvar Usuário</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={carregarUsuarios}>
                    <Text>Exibir Usuario</Text>

                    {usuario.map((usuario) => (
                        <View>
                            <View>
                                <Text>Nome: {usuario.nome}</Text>
                            </View>

                            <View>
                                <Text>Pedido: {usuario.pedido}</Text>
                            </View>

                            <View>
                                <Text>Telefone: {usuario.telefone}</Text>
                            </View>

                            <View>
                                <Text>Valor: {usuario.valor}</Text>
                            </View>

                        </View>
                    ))}
                </TouchableOpacity>


                <TouchableOpacity onPress={() => removerUsuario(usuario.id)}>
                    <Text>Apagar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={limparStorage}>
                    <Text>Apagar Tudo</Text>
                </TouchableOpacity>



            </ScrollView>

        </View>
    );
}
