
export interface IUsuario{
    id? : number;
    nombre : string;
    fecha_nacimiento : string;
    sexo : string;
    correo : string;
    usuario : string;
    IniciarSesion?() : void;
    CerrarSesion?() : void;
}

