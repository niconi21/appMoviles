import {
  FlatList,
  Text,
  View,
  Pressable,
  StyleSheet,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {IArticulo} from '../models/IArticulo';
import axios from 'axios';
import {_url, _idUsuario} from '../global/variables';
import {EstilosGlobales} from '../styles/Estilos';
import ArticuloComponent from '../Components/ArticuloComponent';
import {RootStackParamList} from '../utils/RootStackParam';
import {StackScreenProps} from '@react-navigation/stack';
import {Contexto} from '../context/carrito.contex';
import {ICarrito} from '../models/ICarrito';

type Props = StackScreenProps<RootStackParamList, 'Principal'>;

const CarritoScreen = ({route, navigation}: Props) => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const appContext = useContext(Contexto);
  const [bandera, setBandera] = useState(false);
  useEffect(() => {
    setArticulos(appContext.carrito);
  }, [bandera]);

  const handle = (id: number | undefined) => {
    navigation.navigate('DescripcionArticulo', {idArticulo: id});
  };

  return (
    <View>
      {/* <TextInput style={EstilosGlobales.textinput}></TextInput> */}
      <FlatList
        data={articulos}
        renderItem={articulo => (
          <View>
            <ArticuloComponent
              onClick={() => handle(articulo.item.id)}
              {...articulo.item}></ArticuloComponent>
            <Pressable
              onPress={() => {
                appContext.eliminarCarrito(articulo.item);
                setArticulos(appContext.carrito);
                setBandera(!bandera);
              }}>
              <Text>Eliminar</Text>
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={EstilosGlobales.separador} />
        )}></FlatList>
      <Pressable
        style={styles.btn}
        onPress={async () => {
          let carrito: ICarrito = {idUsuario: _idUsuario, detalleVenta: []};
          appContext.carrito.forEach(articulo => {
            if (articulo.cantidad! < articulo.stock)
              carrito.detalleVenta!.push({
                idArticulo: articulo.id!,
                nombre: articulo.nombre,
                cantidad: articulo.cantidad!,
                precio: articulo.precio!,
              });
          });
          await axios.post(`${_url}api/Moviles/GuardarCompra`, carrito);
          let productosComprados = carrito.detalleVenta?.map(
            articulo => `${articulo.nombre} - ${articulo.cantidad} unidades`,
          );
          Alert.alert(
            'Carrito comprado',
            `El carrito fué comprado con éxito.\nArticulos:\n${productosComprados?.join(
              ',\n',
            )}`,
          );
          appContext.carrito.forEach(appContext.eliminarCarrito);
          setBandera(!bandera);
        }}>
        <Text style={styles.textBtn}>Comprar carrito</Text>
      </Pressable>
    </View>
  );
};

export default CarritoScreen;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
