import axios from 'axios';
import { Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';
import { _url } from '../global/variables';
import { IArticulo } from '../models/IArticulo';
import { EstilosGlobales } from '../styles/Estilos';



const AgregarArticuloScreen = () => {

    const articuloInicial: IArticulo = {
        descripcion: '',
        nombre: '',
        precio: 0.0,
        stock: 0,
        foto: ''
    };

    const [articulo, setArticulo] = useState<IArticulo>(articuloInicial)
    const [imagen, setImagen] = useState<string>("https://via.placeholder.com/200")
    const [uploading, setUploading] = useState<boolean>(false)


    const validaciones = Yup.object({
        nombre: Yup.string().required("El nombre es requerido")
            .max(100, "No debe pasar de 100 caracteres"),
        descripcion: Yup.string().required("La descripción es requerida")
            .max(500, "No debe pasar de 500 caracteres"),
        stock: Yup.number()
            .typeError("Solo se aceptan números")
            .required("El stock es requerido"),
        precio: Yup.number()
            .typeError("Solo se aceptan números")
            .required("El precio es requerido"),

    });

    async function selectImage() {
        let options: ImageLibraryOptions = {
            mediaType: 'photo'
        };
        const result: ImagePickerResponse = await launchImageLibrary(options);
        if (result.assets) {
            const uri = result.assets[0].uri
            setImagen(result.assets[0].uri!)
        }
    };

    async function takePhoto() {
        let options: CameraOptions = {
            mediaType: 'photo'
        };
        const result = await launchCamera(options);
        if (result.assets) {
            const uri = result.assets[0].uri
            setImagen(result.assets[0].uri!)
        }
    }

    const uploadImage = async (articulo: IArticulo) => {
        setUploading(true);
        const artTemp = new FormData();
        artTemp.append("nombre", articulo.nombre);
        artTemp.append("descripcion", articulo.descripcion);
        artTemp.append("stock", articulo.stock);
        artTemp.append("idusuario", "8259");
        artTemp.append("precio", articulo.precio);
        artTemp.append('foto', {
            uri: imagen,
            type: 'image/jpeg',
            name: 'Imagen.jpg'
        });

        axios.post(_url + 'api/Moviles/InsertarArticuloConFoto', artTemp, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
            .then( (response) => {
                Alert.alert("Correcto","El producto se ha insertado de manera correcta");
                setUploading(false);
            })
            .catch( (error) => {
                console.log("Error_ " + error);
                setUploading(false);
            });
    }

    return (
        <ScrollView>
            <Formik
                initialValues={articulo}
                onSubmit={async valores => uploadImage(valores)}
                validationSchema={validaciones}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <Fragment>
                        <Text>Nombre</Text>
                        <TextInput style={EstilosGlobales.textinput}
                            onChangeText={handleChange('nombre')}
                            onBlur={() => setFieldTouched('nombre')}
                            placeholder="Nombre"
                        >
                        </TextInput>
                        {touched.nombre && errors.nombre &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.nombre}</Text>
                        }

                        <Text>Descripción</Text>
                        <TextInput style={EstilosGlobales.textinput}
                            onChangeText={handleChange('descripcion')}
                            onBlur={() => setFieldTouched('descripcion')}
                            placeholder="Descripción"
                        >
                            
                        </TextInput>
                        {touched.descripcion && errors.descripcion &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.descripcion}</Text>
                        }

                        <Text>Stock</Text>
                        <TextInput style={EstilosGlobales.textinput}
                            onChangeText={handleChange('stock')}
                            onBlur={() => setFieldTouched('stock')}
                            placeholder="Stock"
                            keyboardType='numeric'
                        >
                        </TextInput>
                        {touched.stock && errors.stock &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.stock}</Text>
                        }

                        <Text>Precio</Text>
                        <TextInput style={EstilosGlobales.textinput}
                            onChangeText={handleChange('precio')}
                            onBlur={() => setFieldTouched('precio')}
                            placeholder="Precio"
                            keyboardType='numbers-and-punctuation'
                        >
                        </TextInput>
                        {touched.precio && errors.precio &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.precio}</Text>
                        }

                        <Button title='Seleccionar una imagen' onPress={selectImage}></Button>
                        <View style={{ marginVertical: 20 }}></View>
                        <Button title='Tomar una foto' onPress={takePhoto}></Button>
                        <View style={{ marginVertical: 20 }}></View>
                        <Image style={{ alignSelf: 'center', height: 200, width: 200 }} source={{ uri: imagen }} />
                        <View style={{ marginVertical: 20 }}></View>
                        {uploading ? <ActivityIndicator size={70}></ActivityIndicator> : null}

                        <View style={EstilosGlobales.contenedorBotones}>
                            <Pressable onPress={handleSubmit} style={EstilosGlobales.boton}>
                                <Text style={EstilosGlobales.textoBoton}>Agregar</Text>
                            </Pressable>
                        </View>
                    </Fragment>
                )}
            </Formik>
        </ScrollView>
    )
}

export default AgregarArticuloScreen

