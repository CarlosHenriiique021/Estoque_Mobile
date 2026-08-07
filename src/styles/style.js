import { StyleSheet } from 'react-native';

const colors = {
  primary: '#ffffff',
  accent: '#2563eb',
  border: '#d1d5db',
  textPrimary: '#000000',
  textSecondary: '#6b7280',
};

export const styles = StyleSheet.create({
  // --- ESTRUTURA GERAL ---
  viewPrincipal: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },

  // --- CABEÇALHO & HEADER DE CADASTRO ---
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
    color: colors.textPrimary,
    fontWeight: '300',
    fontFamily: 'sans-serif',
    textAlignVertical: 'center',
    lineHeight: 40,
  },

  // --- LOGO E TÍTULOS ---
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
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },
  textoCadastro: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: -10,
    paddingHorizontal: 20,
  },

  // --- INPUTS & TEXTOS ---
  texto: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    color: colors.textPrimary,
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#6b6b6be1',
    marginTop: 5,
  },
  textoLogin1: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.primary,
    marginBottom: 15,
  },
  textoCadastroInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.primary,
    marginBottom: 15,
  },

  // --- BOTÕES ---
  button: {
    width: '65%',
    backgroundColor: colors.accent,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  textoButton: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },

  // --- ÁREAS DE REDIRECIONAMENTO (CADASTRO / LOGIN) ---
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
    color: colors.textSecondary,
  },
  cadastro: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  login: {
    color: colors.accent,
    fontWeight: 'bold',
  },
});