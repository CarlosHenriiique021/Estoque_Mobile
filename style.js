import { StyleSheet } from 'react-native';

const colors = {
  primary: '#01071b',    // Azul Escuro Profissional
};

export const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

  texto: {
    color: 'white',
    fontFamily: 'poppins',
    fontSize: 20,
    padding: 5,
    marginTop: 8
  },
  input: {
    color: '#ffff',
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#6b6b6be1',
    marginTop: 5
  },

  button: {
    width: '65%',
    backgroundColor: '#2563eb',
    height: 50,
    borderRadius: 20,
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
  textotitulo: {
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