import { StyleSheet } from 'react-native';

const colors = {
  primary: '#ffffff',
};

export const styles = StyleSheet.create({
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
    fontSize: 16,
  },

  areaCadastro: {
    marginTop: 25,
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

  textotitulo: {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    marginTop: -10,
    paddingHorizontal: 20,
  },
});