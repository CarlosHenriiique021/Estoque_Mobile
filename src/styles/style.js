import { StyleSheet } from 'react-native';

// Paleta de cores padronizada do projeto
export const colors = {
  primary: '#0D1b2A',
  secondary: '#FFFFFF',
  botaoFundo: '#1E88E5',
  botaoTexto: '#FFFFFF',
  text: '#000000',
  background: '#FFFFFF',
  backgroundInput: '#FFFFFF',
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
    backgroundColor: colors.botaoFundo,
    width: 320,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20
  },

  CadastroProduto_btn_textoSalvarProdutos: {
    fontSize: 15,
    fontWeight: 700,
    textAlign: 'center',
    color: colors.botaoTexto
  },

  CadastroProduto_btn_produtos: {
    backgroundColor: 'gray',
    width: 320,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
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
    backgroundColor: colors.botaoFundo,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  editarProduto_TextoSalvar: {
    color: colors.botaoTexto,
    fontWeight: "bold",
    fontSize: 16,
  },

  produtos_Container: {
    flex: 1,
    backgroundColor: "#c6c6c7",
    padding: 12,
  },

  produtos_Texto: {
    marginTop: 15,
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "600",
  },

  produtos_View: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  produtos_CabecalhoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  produtos_CabecalhoTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  produtos_CabecalhoCategoriaView: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  produtos_QuantidadeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  produtos_QuantidadeTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151"
  },

  produtos_TouchableSubtrair: {
    width: 38,
    height: 38,
    backgroundColor: "#EF4444",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  produtos_TouchableSubtrairTexto: {
    marginHorizontal: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  produtos_TouchableSomar: {
    width: 38,
    height: 38,
    backgroundColor: "#22C55E",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  produtos_ValoresCotainer: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 15,
  },

  produtos_ValoresView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  produtos_ValoresTextoUnitario: {
    color: "#6B7280",
    fontSize: 15,
  },

  produtos_ValoresCifrao: {
    fontWeight: "600",
    fontSize: 15,
  },

  produtos_ValoresTextoTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },

  produtos_ValoresCifraoTotal: {
    color: "#16A34A",
    fontSize: 18,
    fontWeight: "bold",
  },

  produtos_BotaoView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 22,
  },

  produtos_BotaoEditar: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  produtos_BotaoExcluir: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  produtos_BotaoTextoEditarExcluir: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  }
});