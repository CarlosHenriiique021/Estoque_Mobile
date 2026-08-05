import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from './src/contexts/ThemeContext';

import Routes from './src/routes/StackRoutes'; 

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Routes />
    </ThemeProvider>
  );
}