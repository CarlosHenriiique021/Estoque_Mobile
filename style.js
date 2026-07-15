import { StyleSheet } from 'react-native';

const colors = {
  primary: '#01071b',    // Azul Escuro Profissional
};

export const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center'
  },

  texto1: {
    color: 'red',
    fontSize: 90
  },

   texto2: {
    color: 'white',
    fontFamily: 'GoogleSans_500Medium '
  }
});