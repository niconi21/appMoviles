import {IArticulo} from '../models/IArticulo';

export enum OperacionesCarritoEnum {
  Agregar = 'AGREGAR',
  Eliminar = 'ELIMINAR',
  Actualizar = 'ACTUALIZAR',
}

type Action = {
  type: OperacionesCarritoEnum;
  payload: IArticulo;
};

export function ReducerCarrito(
  state: IArticulo[],
  action: Action,
): IArticulo[] {
  const {type, payload} = action;
  switch (type) {
    case OperacionesCarritoEnum.Agregar:
      return [...state, payload];
    case OperacionesCarritoEnum.Eliminar:
      let newArray = [...state];
      let newState = newArray.filter(articulo => articulo.id != payload.id);
      return newState;
    case OperacionesCarritoEnum.Actualizar:
      return state;
    default:
      return state;
      break;
  }
}
