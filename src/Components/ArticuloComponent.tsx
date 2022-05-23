import {Image, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/FontAwesome';
import {_url, _idUsuario} from '../global/variables';
import {ProductosPrincipal, EstilosGlobales} from '../styles/Estilos';
import {IArticulo} from '../models/IArticulo';
import axios from 'axios';

const ArticuloComponent = (articulo: IArticulo) => {
  const [favorito, setFavorito] = useState<boolean>(articulo.favorito!);

  return (
    <Pressable onPress={articulo.onClick}>
      <View style={ProductosPrincipal.productoContainer}>
        <Image
          source={{uri: _url + articulo.foto}}
          style={ProductosPrincipal.ImagenesPrincipal}
        />
        <View style={ProductosPrincipal.contenedorFavorito}>
          <Pressable
            onPress={async e => {
              let resp = await axios.post(
                `${_url}api/Moviles/GuardarFavorito`,
                {
                  idUsuario: _idUsuario,
                  idArticulo: articulo.id,
                },
              );
              console.log(resp.data);
              setFavorito(!favorito);
            }}>
            <Icon
              name="heart"
              style={EstilosGlobales.actionButtonIcon}
              color={!favorito ? '#2C3E50' : 'red'}
            />
          </Pressable>
        </View>
        <View style={ProductosPrincipal.informacionProducto}>
          <Text style={ProductosPrincipal.tituloProducto}>
            {articulo.nombre}
          </Text>
          <Text style={ProductosPrincipal.descripcion}>
            {articulo.descripcion}
          </Text>
          <NumberFormat
            value={articulo.precio}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalSeparator="."
            renderText={value => (
              <Text style={ProductosPrincipal.precio}>{value}</Text>
            )}
          />
          
          {articulo.cantidad != undefined ? (
            <Text style={ProductosPrincipal.descripcion}>
              Cantidad en el carrito: {articulo.cantidad}
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ArticuloComponent;
