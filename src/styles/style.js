import { StyleSheet } from 'react-native';

// Paleta de cores padronizada do projeto
export const colors = {
  primaryBlue: '#0052CC',
  accentBlue: '#2563EB',
  black: '#000000',
  darkCard: '#121212',
  darkBorder: '#222222',
  lightBg: '#FFFFFF',
  lightCard: '#F5F7FB',
  lightBorder: '#E5E7EB',
  textDark: '#111827',
  textLight: '#FFFFFF',
  textMuted: '#6B7280',
  textMutedDark: '#A0AEC0',
  danger: '#EF4444',
  success: '#25D366',
};

export const styles = StyleSheet.create({
  // ==========================================
  // 1. ESTRUTURA GERAL E CONTAINERS
  // ==========================================
  container: {
    flex: 1,
  },
  viewPrincipal: {
    flex: 1,
    backgroundColor: colors.lightBg,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ==========================================
  // 2. CABEÇALHO AZUL CURVO (PADRÃO PROTO)
  // ==========================================
  headerCurvo: {
    backgroundColor: colors.primaryBlue,
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  tituloHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  themeButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },

  // ==========================================
  // 3. CABEÇALHOS SIMPLES & VOLTAR
  // ==========================================
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
    color: colors.textDark,
    fontWeight: '300',
    textAlignVertical: 'center',
    lineHeight: 40,
  },

  // ==========================================
  // 4. LOGO, TÍTULOS E SUBTÍTULOS
  // ==========================================
  logotipo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain',
  },
  textoLogo: {
    fontSize: 30,
    color: colors.primaryBlue,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  textoLogin: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },
  textoCadastro: {
    fontSize: 22,
    color: colors.textDark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: -10,
    paddingHorizontal: 20,
  },

  // ==========================================
  // 5. INPUTS E FORMULÁRIOS
  // ==========================================
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  texto: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textDark,
    backgroundColor: colors.lightBg,
    marginBottom: 15,
  },
  textoLogin1: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textDark,
    backgroundColor: colors.lightBg,
    marginBottom: 15,
  },
  textoCadastroInput: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textDark,
    backgroundColor: colors.lightBg,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  // ==========================================
  // 6. BOTÕES
  // ==========================================
  button: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primaryBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  textoButton: {
    color: colors.textLight,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ==========================================
  // 7. CARDS, LISTAS E ITENS
  // ==========================================
  card: {
    borderRadius: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // ==========================================
  // 8. ÁREAS DE LINK E REDIRECIONAMENTO
  // ==========================================
  areaCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: 5,
  },
  arealogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: 5,
  },
  textoConta: {
    fontSize: 14,
    color: colors.textMuted,
  },
  cadastro: {
    fontSize: 14,
    color: colors.primaryBlue,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 14,
    color: colors.primaryBlue,
    fontWeight: 'bold',
  },

  // ==========================================
  // 9. COMPONENTES ESPECÍFICOS DE PRODUTOS
  // ==========================================
  CadastroProduto_container2: {
    marginTop: -110,
    marginBottom: 30,
  },
  CadastroProduto_viewContainer: {
    width: '100%',
    marginVertical: 5,
  },
  CadastroProduto_textoCifrao: {
    fontSize: 15,
    padding: 12,
    backgroundColor: colors.lightCard,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    color: colors.textDark,
  },
  CadastroProduto_textoInputValor: {
    flex: 1,
    fontSize: 15,
    height: 48,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 12,
    color: colors.textDark,
    backgroundColor: colors.lightBg,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: colors.lightBorder,
  },
  CadastroProduto_viewEditarELista: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 15,
  },
  CadastroProduto_btn_editar: {
    backgroundColor: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: colors.textLight,
    textAlign: 'center',
  },
  CadastroProduto_btn_lista: {
    backgroundColor: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: colors.textLight,
    textAlign: 'center',
  },

  // ==========================================
  // 10. ESPECÍFICOS DE LOGIN
  // ==========================================
  viewPrincipalLogin: {
    paddingHorizontal: 20,
  },
  themeButtonTopRight: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 8,
    zIndex: 10,
  },
contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -50, // 👈 Puxa todo o bloco (logo, nome, inputs) para cima
  },
  logotipoLogin: {
    width: 380,
    height: 220,
    marginBottom: -10, // 👈 Aproxima o nome da logo como estava antes
    resizeMode: 'contain',
  },
});