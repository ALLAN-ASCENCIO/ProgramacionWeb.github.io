// Función que se ejecuta cuando la página termina de cargar
// Esta función llena los selectores de día, mes y año
function llenarSelectoresFecha() {
    // Llenar los días (1 al 31)
    var selectDia = document.getElementById("dia");
    for (var i = 1; i <= 31; i++) {
        var opcion = document.createElement("option");
        opcion.value = i;
        opcion.text = i;
        selectDia.appendChild(opcion);
    }
    
    // Llenar los meses
    var selectMes = document.getElementById("mes");
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    for (var i = 0; i < meses.length; i++) {
        var opcion = document.createElement("option");
        opcion.value = i + 1;  // Los meses van de 1 a 12
        opcion.text = meses[i];
        selectMes.appendChild(opcion);
    }
    
    // Llenar los años (desde 2011 hasta 1924)
    var selectAnio = document.getElementById("anio");
    for (var i = 2011; i >= 1924; i--) {
        var opcion = document.createElement("option");
        opcion.value = i;
        opcion.text = i;
        selectAnio.appendChild(opcion);
    }
}

// Llamar a la función cuando la página cargue
window.onload = function() {
    llenarSelectoresFecha();
};

// Función para validar el formulario cuando se da clic en "Completar Registro"
function validarFormulario() {
    // Obtener los valores de cada campo
    var nombre = document.getElementById("nombre").value;
    var dia = document.getElementById("dia").value;
    var mes = document.getElementById("mes").value;
    var anio = document.getElementById("anio").value;
    var edad = document.getElementById("edad").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var modulo = document.getElementById("modulo").value;
    var horario = document.getElementById("horario").value;
    var contrasena = document.getElementById("contrasena").value;
    
    // Validar que el nombre no esté vacío
    if (nombre == "") {
        alert("Error: El campo 'Nombre Completo' está vacío");
        return false;
    }
    
    // Validar que el nombre tenga al menos 3 caracteres
    if (nombre.length < 3) {
        alert("Error: El nombre debe tener al menos 3 caracteres");
        return false;
    }
    
    // Validar que el día no esté vacío
    if (dia == "") {
        alert("Error: Debe seleccionar el Día de nacimiento");
        return false;
    }
    
    // Validar que el mes no esté vacío
    if (mes == "") {
        alert("Error: Debe seleccionar el Mes de nacimiento");
        return false;
    }
    
    // Validar que el año no esté vacío
    if (anio == "") {
        alert("Error: Debe seleccionar el Año de nacimiento");
        return false;
    }
    
    // Validar que la fecha sea válida (por ejemplo, no 31 de febrero)
    var fechaNacimiento = new Date(anio, mes - 1, dia);
    if (fechaNacimiento.getDate() != dia || fechaNacimiento.getMonth() != (mes - 1)) {
        alert("Error: La fecha ingresada no es válida (ejemplo: 31 de febrero no existe)");
        return false;
    }
    
    // Validar que la fecha no sea del futuro
    var fechaActual = new Date();
    if (fechaNacimiento > fechaActual) {
        alert("Error: La fecha de nacimiento no puede ser del futuro");
        return false;
    }
    
    // Validar que la edad no esté vacía
    if (edad == "") {
        alert("Error: El campo 'Edad' está vacío");
        return false;
    }
    
    // Validar que la edad esté en el rango permitido (15-100)
    if (edad < 15 || edad > 100) {
        alert("Error: La edad debe estar entre 15 y 100 años");
        return false;
    }
    
    // Validar que el teléfono no esté vacío
    if (telefono == "") {
        alert("Error: El campo 'Número Telefónico' está vacío");
        return false;
    }
    
    // Validar que el teléfono solo contenga números
    if (isNaN(telefono)) {
        alert("Error: El teléfono debe contener solo números");
        return false;
    }
    
    // Validar que el teléfono tenga 10 dígitos
    if (telefono.length != 10) {
        alert("Error: El teléfono debe tener exactamente 10 dígitos");
        return false;
    }
    
    // Validar que el email no esté vacío
    if (email == "") {
        alert("Error: El campo 'Correo Electrónico' está vacío");
        return false;
    }
    
    // Validar que el email tenga formato correcto (debe contener @ y .)
    if (!email.includes("@") || !email.includes(".")) {
        alert("Error: El correo electrónico no tiene un formato válido");
        return false;
    }
    
    // Validar que se haya seleccionado un módulo
    if (modulo == "") {
        alert("Error: Debe seleccionar un Módulo de Interés");
        return false;
    }
    
    // Validar que se haya seleccionado un horario
    if (horario == "") {
        alert("Error: Debe seleccionar un Horario Preferido");
        return false;
    }
    
    // Validar que la contraseña no esté vacía
    if (contrasena == "") {
        alert("Error: El campo 'Contraseña' está vacío");
        return false;
    }
    
    // Validar que la contraseña tenga al menos 8 caracteres
    if (contrasena.length < 8) {
        alert("Error: La contraseña debe tener al menos 8 caracteres");
        return false;
    }
    
    // Si todas las validaciones pasaron, mostrar mensaje de éxito
    alert("¡Todo bien! Registro enviado correctamente");
    return true;
}
