import React from 'react';
// TouchableHighlight es un componente que simula un botón en React Native, pues para un botón se necesita dar click, pero con este otro solo es cuestión de tocarlo.
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
const Reserva = ({item, eliminarPaciente}) => {
//Creamos el objeto donde recibe como parámetros los item (declarado en el FlatList) de la clase creados en el archivo App.js más el método eliminarPaciente, que recibe el dato id del arreglo que se desea eliminar.
const dialogoEliminar = id => {
console.log('eliminando....', id);
eliminarPaciente(id);
}
//importamos los datos del objeto del archivo App.js que contiene el renderItem
return (
<View style={styles.reservar}>
<View>
<Text style={styles.label}> Paciente: </Text>
<Text style={styles.texto}> {item.paciente} </Text>
</View>
<View>
<Text style={styles.label}> Edad: </Text>
<Text style={styles.texto}> {item.edad} </Text>
</View>
<View>
<Text style={styles.label}> Síntomas: </Text>
<Text style={styles.texto}> {item.sintomas} </Text>
</View>
<View>

<TouchableHighlight onPress={ () => dialogoEliminar(item.id) } style={styles.btnEliminar}>
<Text style={styles.textoEliminar}> Eliminar &times; </Text>
</TouchableHighlight>
</View>
</View>
)
}
//Creamos los estilos para esta página o componente.
const styles = StyleSheet.create({
reservar: {
backgroundColor: '#FFF',
borderBottomColor: '#e1e1e1',
borderStyle: 'solid',
borderBottomWidth: 1,
paddingVertical: 20,
paddingHorizontal: 10
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 20
},
texto: {
fontSize: 18,
},
btnEliminar: {
padding: 10,
backgroundColor: '#229BE0',
marginVertical: 10
},
textoEliminar: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Reserva;