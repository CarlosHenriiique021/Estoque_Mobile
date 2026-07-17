import { StyleSheet } from 'react-native';

const colors = {
  primary: '#0D1b2A',
  secondary: '#364a66',
  button: '#1E88E5'
};

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container2: {
    marginTop: -110,
    marginBottom: 30
  },

  logo: {
    width: 300,
    height: 300,
  },

  tituloCadastroProduto: {
    fontWeight: '700',
    color: 'white',
    fontSize: 33,
    marginTop: -90,
    marginBottom: -20
  },

  viewContainer: {
    width: 320,
    margin: 5,
  },

  textoPrincipal: {
    fontSize: 17,
    fontWeight: 500,
    color: 'white',
    paddingLeft: 2,
    marginBottom: 3,
    paddingTop: 10
  },



  textoInput: {
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

  textoCifrao: {
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

  textoInputValor: {
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

  btn_Salvar: {
    backgroundColor: colors.button,
    width: 320,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 50
  },

  btn_SalvarText: {
    fontSize: 15,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white'
  },

  viewEditarELista: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center'
  },

  btn_editar: {
    backgroundColor: 'gray',
    fontSize: 15,
    fontWeight: 700,
    paddingVertical: 10,
    paddingHorizontal: 49,
    borderRadius: 8,
    color: 'white'
  },

  btn_lista: {
    backgroundColor: 'gray',
    fontSize: 15,
    fontWeight: 700,
    paddingVertical: 10,
    paddingHorizontal: 49,
    borderRadius: 8,
    color: 'white'
  }
});