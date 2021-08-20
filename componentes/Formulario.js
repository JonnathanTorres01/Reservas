import React, { useState } from 'react';
//Button aplica para el la fecha y la hora
//TextInput funciona para el formulario
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native';

import { Button} from "react-native";


//librería del DateTimePocker
import DateTimePickerModal from "react-native-modal-datetime-picker";

//paquete o libreria para generar un id unico a cada registro
//import shortid from 'shortid';

//import { nanoid } from 'nanoid';

import nextId from "react-id-generator";

const Formulario = ({reservas, setReservas, guardarMostrarForm, guardarReservasStorage}) => {
const [paciente, guardarPaciente] = useState('');
const [edad, guardarEdad] = useState('');
const [telefono, guardarTelefono] = useState('');
const [fecha, guardarFecha] = useState('');
const [hora, guardarHora] = useState('');
const [sintomas, guardarSintomas] = useState('');
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


const Example = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    };
    return (
    <View>
    <Button title="Show Date Picker" onPress={showDatePicker} />
    <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
    />
    </View>
    );
    };


// Muestra u oculta el Date Picker
const showDatePicker = () => {
setDatePickerVisibility(true);
};
const hideDatePicker = () => {
setDatePickerVisibility(false);
};
const confirmarFecha = date => {
const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
guardarFecha(date.toLocaleDateString('es-ES', opciones));
hideDatePicker();
};
// Muestra u oculta el Time Picker
const showTimePicker = () => {
setTimePickerVisibility(true);
};
const hideTimePicker = () => {
setTimePickerVisibility(false);
};
const confirmarHora = hora => {
const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
guardarHora(hora.toLocaleString('es-ES', opciones));
hideTimePicker();
};
// Crear nueva reservacion lo llamamos en el "Boton" evento OnPress
const crearNuevaReserva = () => {
// Validar que no hayan campos vacios en el formulario
if(paciente.trim() === '' ||
edad.trim() === '' ||
telefono.trim() === '' ||
fecha.trim() === '' ||
hora.trim() === '' ||
sintomas.trim() === '')
{
// Falla la validación
mostrarAlerta();
return;
}
// Crear una nueva reservación
const reserva = { paciente, edad, telefono, fecha, hora, sintomas };
//asignamos el id según el generado por la app

//reserva.id = shortid.generate();

//reserva.id = nanoid();
reserva.id = nextId();

// Agregar al state
const reservasNueva = [...reservas, reserva];
setReservas(reservasNueva);
// Pasar las nuevas reservaciones a storage
guardarReservasStorage(JSON.stringify(reservasNueva));
// Ocultar el formulario
guardarMostrarForm(false);
// Resetear el formulario
guardarSintomas('');
guardarEdad('');
guardarPaciente('');
guardarHora('');
guardarFecha('');
guardarTelefono('');
}
// Muestra la alerta si falla la validación
const mostrarAlerta = () => {
Alert.alert( //tiene 3 partes:
'Error', // Titulo
'Todos los campos son obligatorios', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
}
return (
<>
<ScrollView style={styles.formulario}>
<View>
<Text style={styles.label}>Paciente:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarPaciente(texto) }
/>
</View>
<View>
<Text style={styles.label}>Edad:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarEdad(texto) }
keyboardType='numeric' //muestre el teclado de números
/>
</View>
<View>
<Text style={styles.label}>Teléfono:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarTelefono(texto) }
keyboardType='numeric' //muestre el teclado de números
/>
</View>
<View>
<Text style={styles.label}>Fecha:</Text>
<Button title="Seleccionar Fecha" onPress={showDatePicker} />
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="date"
onConfirm={confirmarFecha}
onCancel={hideDatePicker}
locale='es_ES'
headerTextIOS="Elige la fecha"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{fecha}</Text>
</View>
<View>
<Text style={styles.label}>Hora:</Text>
<Button title="Seleccionar Hora" onPress={showTimePicker} />
<DateTimePickerModal
isVisible={isTimePickerVisible}
mode="time"
onConfirm={confirmarHora}
onCancel={hideTimePicker}
locale='es_ES'
headerTextIOS="Elige una Hora"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{hora}</Text>
</View>
<View>
<Text style={styles.label}>Síntomas:</Text>
<TextInput
multiline
style={styles.input}
onChangeText={ texto => guardarSintomas(texto) }
/>
</View>
<View>
<TouchableHighlight onPress={ () => crearNuevaReserva() } style={styles.btnSubmit}>
<Text style={styles.textoSubmit}>Crear Nueva Reserva</Text>
</TouchableHighlight>
</View>
</ScrollView>
</>
);
}
const styles = StyleSheet.create({
formulario: {
backgroundColor: '#FFF',
paddingHorizontal: 20,
paddingVertical: 10,
flex: 1
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 20
},
input: {
marginTop: 10,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 1,
borderStyle: 'solid'
},
btnSubmit: {
padding: 10,
backgroundColor:'#229BE0',
marginVertical: 10
},
textoSubmit: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Formulario;
