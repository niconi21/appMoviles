import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigator from './src/utils/Navigator';
import AppContext from './src/context/carrito.contex';
import axios, {Axios} from 'axios';
const App = () => {
  return (
    <AppContext>
      <Navigator></Navigator>
    </AppContext>
  );
};


export default App;
