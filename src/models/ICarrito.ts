export interface ICarrito {
  idUsuario?: number;
  detalleVenta?: IDetalleCarrito[];
}

interface IDetalleCarrito {
  idArticulo: number;
  nombre: string;
  cantidad: number;
  precio: number;
}
