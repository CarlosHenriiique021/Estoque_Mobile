import { StyleSheet } from 'react-native';

const colors = {
  primary: '#0D1b2A',
  secondary: '#364a66',
  button: '#1E88E5'
};

export const styles = StyleSheet.create({

  CadastroProduto_container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CadastroProduto_container2: {
    marginTop: -110,
    marginBottom: 30
  },

  CadastroProduto_logo: {
    width: 300,
    height: 300,
  },

  CadastroProduto_tituloCadastroProduto: {
    fontWeight: '700',
    color: 'white',
    fontSize: 33,
    marginTop: -90,
    marginBottom: -20
  },

  CadastroProduto_viewContainer: {
    width: 320,
    margin: 5,
  },

  CadastroProduto_textoPrincipal: {
    fontSize: 17,
    fontWeight: 500,
    color: 'white',
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
    color: 'white',
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
    color: 'white'
  },

  CadastroProduto_textoInputValor: {
    fontSize: 17,
    paddingVertical: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 2,
    paddingRight: 80,
    marginTop: 2,
    color: 'white',
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
    marginTop: 50
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

   viewPrincipal: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },

  logotipo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 5,
  },

  textoLogo: {
    fontSize: 30,
    color: '#0057b8',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },

  textoLogin: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },

  textoLogin1: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },

  textoCadastro: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },

  textoCadastroInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },

  texto: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    color: '#000',
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#6b6b6be1',
    marginTop: 5,
  },

  button: {
    width: '65%',
    backgroundColor: '#2563eb',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },

  textoButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  areaCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    gap: 5,
  },

  arealogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    gap: 5,
  },

  textoConta: {
    color: '#6b7280',
  },

  cadastro: {
    color: '#2563eb',
    fontWeight: 'bold',
  },

  login: {
    color: '#2563eb',
    fontWeight: 'bold',
  },

  subtitulo: {
    marginTop: -10,
    paddingHorizontal: 20,
  },
  headerCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
  },

  containerTextoHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCadastro: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  botaoVoltar: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  setaVoltar: {
    fontSize: 38,
    color: '#000000',
    fontWeight: '300',
    fontFamily: 'sans-serif',
    textAlignVertical: 'center',
    lineHeight: 40,
  },

  textoCadastro: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});