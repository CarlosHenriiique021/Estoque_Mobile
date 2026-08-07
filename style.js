import { StyleSheet } from 'react-native';
import EditarProduto from './screens/EditarProduto/EditarProduto';

const colors = {
  primary: '#0D1b2A',
  secondary: '#FFFFFF',
  button: '#1E88E5',
  text: '#000000',
  background: '#FFFFFF',
  backgroundInput: '#FFFFFF'
};

export const styles = StyleSheet.create({

  CadastroProduto_container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },


  CadastroProduto_logo: {
    width: 300,
    height: 300,
  },

  CadastroProduto_tituloCadastroProduto: {
    fontWeight: '700',
    color: colors.text,
    fontSize: 33,
    marginTop: -110,

  },

  CadastroProduto_viewContainer: {
    width: 320,
    margin: 5,
  },

  CadastroProduto_textoPrincipal: {
    fontSize: 17,
    fontWeight: 500,
    color: colors.text,
    paddingLeft: 2,
    marginBottom: 3,
    paddingTop: 10
  },

  CadastroProduto_textoInput: {
    fontSize: 17,
    paddingVertical: 10,
    borderRadius: 5,
    paddingLeft: 2,
    marginTop: 2,
    color: colors.text,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: 'black',
  },

  CadastroProduto_textoCifrao: {
    fontSize: 17,
    padding: 10,
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    marginTop: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderColor: 'black',
    color: colors.text
  },

  CadastroProduto_textoInputValor: {
    fontSize: 17,
    paddingVertical: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 2,
    paddingRight: 80,
    marginTop: 2,
    color: colors.text,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: 'black',
  },

  CadastroProduto_btn_Salvar: {
    backgroundColor: colors.button,
    width: 320,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20
  },

  CadastroProduto_btn_SalvarText: {
    fontSize: 15,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white'
  },

  CadastroProduto_viewEditarELista: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center'
  },

  CadastroProduto_btn_editar: {
    backgroundColor: 'gray',
    fontSize: 15,
    fontWeight: 700,
    paddingVertical: 10,
    paddingHorizontal: 49,
    borderRadius: 8,
    color: 'white'
  },

  CadastroProduto_btn_lista: {
    backgroundColor: 'gray',
    fontSize: 15,
    fontWeight: 700,
    paddingVertical: 10,
    paddingHorizontal: 49,
    borderRadius: 8,
    color: 'white'
  },

  CadastroProduto_produtosView: {
    backgroundColor: 'yellow',
    width: 300,
    height: 100
  },

  editarProduto_View: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },

  editarProduto_Titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: 'center'
  },

  editarProduto_InputBox: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
  },

  editarProduto_Text: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },

  editarProduto_Salvar: {
    backgroundColor: colors.button,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  editarProduto_TextoSalvar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }
});