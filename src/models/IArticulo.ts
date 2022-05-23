
export interface IArticulo{
    id? : number;
    nombre : string;
    descripcion : string;
    precio : number;
    stock : number;
    foto? : string;
    favorito?: boolean
    cantidad?: number,
    onClick?() : void;
}

