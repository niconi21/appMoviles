import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useReducer, useState} from 'react';
//import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/RootStackParam';
import axios from 'axios';
import {_url} from '../global/variables';
import {IArticulo} from '../models/IArticulo';
import {StackScreenProps} from '@react-navigation/stack';
import {EstiloDescripcionArticulo} from '../styles/Estilos';
import NumberFormat from 'react-number-format';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Contexto} from '../context/carrito.contex';
import {
  ReducerCarrito,
  OperacionesCarritoEnum,
} from '../utils/ReducerArticulos';

type Props = StackScreenProps<RootStackParamList, 'DescripcionArticulo'>;
const DescripcionArticulo = ({route, navigation}: Props) => {
  const appContext = useContext(Contexto);
  const {idArticulo} = route.params;
  const [articulo, setArticulo] = useState<IArticulo>();
  const [cantidad, setCantidad] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`${_url}api/Moviles/ObtenerArticuloPorId/${idArticulo}`)
      .then(res => {
        const articulo = res.data;
        setArticulo(articulo);
      });
  }, []);

  const sumar = () => {
    if (cantidad !== articulo?.stock!) {
      setCantidad(cantidad + 1);
    } else {
      Alert.alert(
        'Atención',
        'No puede pasar de la cantidad que hay en inventario',
      );
    }
  };

  const restar = () => {
    if (cantidad !== 0) {
      setCantidad(cantidad - 1);
    } else {
      Alert.alert('Atención', 'No puede seleccionar números negativos');
    }
  };

  return (
    <ScrollView contentContainerStyle={EstiloDescripcionArticulo.container}>
      <Text style={EstiloDescripcionArticulo.titulo}>{articulo?.nombre}</Text>
      <Image
        source={{uri: _url + articulo?.foto}}
        style={EstiloDescripcionArticulo.descripcionImagen}
      />
      <NumberFormat
        value={articulo?.precio}
        displayType="text"
        thousandSeparator
        prefix="$"
        decimalSeparator="."
        renderText={value => (
          <Text style={EstiloDescripcionArticulo.precio}>{value}</Text>
        )}
      />
      <Text style={EstiloDescripcionArticulo.titulo}>Descripción</Text>
      <Text style={EstiloDescripcionArticulo.descripcion}>
        {articulo?.descripcion}
      </Text>
      <Text style={EstiloDescripcionArticulo.textoCentrado}>
        Seleccione cantidad
      </Text>
      <View style={EstiloDescripcionArticulo.contenedorCantidad}>
        <Pressable
          style={[
            EstiloDescripcionArticulo.botonRedondo,
            {backgroundColor: 'orangered'},
          ]}
          onPress={restar}>
          <Icon name="minus" size={30} color={'white'}></Icon>
        </Pressable>
        <Text style={EstiloDescripcionArticulo.textoCantidad}>{cantidad}</Text>
        <Pressable
          style={[
            EstiloDescripcionArticulo.botonRedondo,
            {backgroundColor: 'green'},
          ]}
          onPress={sumar}>
          <Icon name="plus" size={30} color={'white'}></Icon>
        </Pressable>
      </View>
      <Pressable
        style={EstiloDescripcionArticulo.botonComprar}
        onPress={() => console.log('')}>
        <Text style={EstiloDescripcionArticulo.textoBotonComprar}>Comprar</Text>
      </Pressable>
      <Pressable
        style={EstiloDescripcionArticulo.botonCarrito}
        onPress={() => {
          articulo!.cantidad = cantidad;
          appContext.agregarCarrito(articulo!);
        }}>
        <Text style={EstiloDescripcionArticulo.textoBotoncarrito}>
          Agregar al carrito
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default DescripcionArticulo;
