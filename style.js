import { StyleSheet } from 'react-native';

const colors = {
  primary: '#01071b',    // Azul Escuro Profissional
};

export const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },

  texto: {
    color: 'white',
    fontFamily: 'poppins',
    fontWeight: 'semibold',
    padding: 5,
    marginTop: 5
  },
  input: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#6b6b6be1',
  },
  button: {
 backgroundColor: '#2563eb',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textoButton: {
    color: 'whitesmoke',
    textAlign: 'center',
    fontFamily: 'poppins',
    fontSize: 25
  },
  arealogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    gap: 5,
  },
  login: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  textoConta: {
    color: 'whitesmoke',
  },
  textosubtitulo: {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: -10,
    paddingHorizontal: 20,
  }
});