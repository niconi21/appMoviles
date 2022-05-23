import React, {useReducer} from 'react';
import {View, Text} from 'react-native';
import {
  OperacionesCarritoEnum,
  ReducerCarrito,
} from '../utils/ReducerArticulos';
import {createContext} from 'react';
import {IArticulo} from '../models/IArticulo';

interface ContextProps {
  carrito: IArticulo[];
  agregarCarrito: (articulo: IArticulo) => void;
  eliminarCarrito: (articulo: IArticulo) => void;
}

export const Contexto = createContext<ContextProps>({} as ContextProps);

interface Props {
  children: JSX.Element;
}

export default function AppContext({children}: Props) {
  const [state, dispatch] = useReducer(ReducerCarrito, []);
  const agregarCarrito = (articulo: IArticulo) => {
    dispatch({type: OperacionesCarritoEnum.Agregar, payload: articulo});
  };
  const eliminarCarrito = (articulo: IArticulo) => {
    dispatch({type: OperacionesCarritoEnum.Eliminar, payload: articulo});
  };
  return (
    <Contexto.Provider
      value={{
        carrito: state,
        agregarCarrito,
        eliminarCarrito
      }}>
      {children}
    </Contexto.Provider>
  );
}
