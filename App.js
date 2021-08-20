//useState es un Hook que te permite añadir el estado de React
//a un componente de función
import React, { useState, useEffect } from 'react';
//Importamos los componentes para este proyecto
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
//Importamos el archivo Reserva para tener acceso a sus componentes
import Reserva from './componentes/Reserva';
//Importamos el archivo Formulario para tener acceso a sus componentes
import Formulario from './componentes/Formulario';
const App = () => {
//definiremos el state de las reservas o citas
const [reservas, setReservas] = useState([]);
const [mostrarform, guardarMostrarForm] = useState(false);
useEffect(() => {
const obtenerReservasStorage = async () => {
try {
const reservasStorage = await AsyncStorage.getItem('reservas');
if(reservasStorage) {
setReservas(JSON.parse(reservasStorage))
}
} catch (error) {
console.log(error);
}
}
obtenerReservasStorage();
}, []);
//Eliminar los pacientes con reservas del State
const eliminarPaciente = id => {
//setReservas( (reservasActuales) => {
//return reservasActuales.filter( reserva => reserva.id !== id);
//})
const reservasFiltradas = reservas.filter( reserva => reserva.id !== id );
setReservas( reservasFiltradas );
guardarReservasStorage(JSON.stringify(reservasFiltradas));
}
// Muestra u oculta el Formulario
const mostrarFormulario = () => {
guardarMostrarForm(!mostrarform);
}
// Ocultar el teclado
const cerrarTeclado = () => {
Keyboard.dismiss();
}
// Almacenar las reservas en storage
const guardarReservasStorage = async (reservasJSON) => {
try {
await AsyncStorage.setItem('reservas', reservasJSON);
} catch (error) {
console.log(error);
}
}
return (
<TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
<View style={styles.contenedor}>
<Text style={styles.titulo}> App Reservas </Text>
<View>
<TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
<Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Crear Reserva' : 'Crear Nueva Reserva'} </Text>
</TouchableHighlight>
</View>
<View style={styles.contenido}>
{ mostrarform ? (
<>
<Text style={styles.titulo}>Crear Nueva Reserva</Text>
<Formulario
reservas={reservas}
setReservas={setReservas}
guardarMostrarForm={guardarMostrarForm}
guardarReservasStorage={guardarReservasStorage}
/>
</>
) : (
<>
<Text style={styles.titulo}>{reservas.length > 0 ? 'Reservas Registradas' : 'No hay reservas, agrega una'} </Text>
<FlatList
style={styles.listado}
data={reservas}
renderItem={ ({item}) => <Reserva item={item} eliminarPaciente={eliminarPaciente} /> }
keyExtractor={ reserva => reserva.id}
/>
</>
) }
</View>
</View>
</TouchableWithoutFeedback>
);
};
const styles = StyleSheet.create({
contenedor: {
backgroundColor: '#5955CC',
flex: 1
},
titulo: {
color: '#FFF',
//Si fuera iOS entones se coloca el marginTop como sigue
//marginTop: Platform.OS === 'ios' ? 40 : 20 ,
marginTop: 40,
marginBottom: 20,
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center'
},
contenido: {
flex: 1,
marginHorizontal: '2.5%',
},
listado: {
flex: 1,
},
btnMostrarForm: {
padding: 10,
backgroundColor:'#229BE0',
marginVertical: 10
},
textoMostrarForm: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
});
export default App;