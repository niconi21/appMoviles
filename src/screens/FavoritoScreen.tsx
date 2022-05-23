import {FlatList, Text, View, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {IArticulo} from '../models/IArticulo';
import axios from 'axios';
import {_idUsuario, _url} from '../global/variables';
import {EstilosGlobales} from '../styles/Estilos';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from '@logvinme/react-native-action-button';
import ArticuloComponent from '../Components/ArticuloComponent';
import {RootStackParamList} from '../utils/RootStackParam';
import {StackScreenProps} from '@react-navigation/stack';
import {Contexto} from '../context/carrito.contex';

type Props = StackScreenProps<RootStackParamList, 'Principal'>;

const FavoritoScreen = ({route, navigation}: Props) => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const appContext = useContext(Contexto);
  useEffect(() => {
    axios
      .get<IArticulo[]>(`${_url}api/Moviles/GetFavoritos?idusuario=${_idUsuario}`)
      .then(resp => {
        let articulos = resp.data.map( element=>{
          element.favorito = true;
          return element;
        })
        setArticulos(resp.data);
      });
  }, []);

  const handle = (id: number | undefined) => {
    navigation.navigate('DescripcionArticulo', {idArticulo: id});
  };

  return (
    <View>
      <FlatList
        data={articulos}
        renderItem={articulo => (
          <View>
            <ArticuloComponent
              onClick={() => handle(articulo.item.id)}
              {...articulo.item}></ArticuloComponent>
            
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={EstilosGlobales.separador} />
        )}></FlatList>
    </View>
  );
};

export default FavoritoScreen;
