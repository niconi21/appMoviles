import { StyleSheet } from 'react-native'
export const EstilosGlobales = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    textinput: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: 'black',
        marginHorizontal: 15,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 15,
        backgroundColor: 'white'
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    boton: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#D83F1E',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2
    },
    textoBoton: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
    },
    separador: {
        borderBottomColor: '#D5D8DC',
        width: '90%',
        borderBottomWidth: 1,
        alignSelf: 'center'
    }
})

export const ProductosPrincipal = StyleSheet.create({
    productoContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 15,
        justifyContent: 'flex-start'
    },
    tituloProducto: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',

    },
    informacionProducto: {
        flexDirection: 'column',
        marginLeft: 13,
        flexShrink: 1
    },
    descripcion: {
        fontSize: 14,
        marginTop: 0,
        color: 'green'

    },
    precio: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    },
    ImagenesPrincipal: {
        width: 130,
        height: 130,
        borderRadius: 25,
        shadowColor: 'black',
        shadowRadius: 10
    },
    contenedorFavorito: {
        position: 'absolute',
        width: 35,
        height: 35,
        top: 7,
        left: 85,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(242, 244, 244,0.5)',

    }
})



export const EstiloDescripcionArticulo = StyleSheet.create({
    container: {
        width: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        paddingHorizontal: '5%'
    },
    descripcionImagen: {
        width: '100%',
        height: 350,
        borderRadius: 25,
        marginVertical: 5,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 5
    },
    precio: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 5,
        color: 'black'
    },
    botonComprar: {
        marginVertical: 3,
        width: '100%',
        height: '7%',
        borderRadius: 5,
        color: 'white',
        backgroundColor: '#2D82FF',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textoBotonComprar: {
        color: 'white'
    },
    botonCarrito: {
        marginTop: 3,
        marginBottom: 100,
        width: '100%',
        height: '7%',
        borderRadius: 5,
        color: 'white',
        backgroundColor: '#E4EDFE',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textoBotoncarrito: {
        color: 'black'
    },
    descripcion: {
        textAlign: 'justify',
        fontSize: 15,
        color: 'black',
        marginBottom: 10
    },
    contenedorCantidad: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10,
    },
    botonRedondo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        //backgroundColor: 'orangered',
       justifyContent:'center',
       alignItems:'center'
    },
    textoCantidad:{
        fontSize:50,
        color:'black',
        fontWeight:'900'
    },
    textoCentrado:{
        alignSelf:'center',
        fontSize:30
    }
})