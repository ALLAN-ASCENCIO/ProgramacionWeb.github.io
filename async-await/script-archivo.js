//CONSOLA VISUAL EN HTML
const consolaDiv = document.getElementById("consolaHTML");

//Guardamos métodos originales
const logOriginal = console.log;
const errorOriginal = console.error;
const warnOriginal = console.warn;

function imprimirEnHTML(mensaje, clase = "") {
    const linea = document.createElement("p");

    if (typeof mensaje === "object") {
        linea.textContent = JSON.stringify(mensaje, null, 2);
    } else {
        linea.textContent = mensaje;
    }

    if (clase) linea.classList.add(clase);

    consolaDiv.appendChild(linea);
    consolaDiv.scrollTop = consolaDiv.scrollHeight;
}

//Sobrescribimos console.log
console.log = function (...mensajes) {
    logOriginal.apply(console, mensajes);
    mensajes.forEach(m => imprimirEnHTML(m));
};

//Sobrescribimos console.error
console.error = function (...mensajes) {
    errorOriginal.apply(console, mensajes);
    mensajes.forEach(m => imprimirEnHTML(m, "log-error"));
};

//Sobrescribimos console.warn
console.warn = function (...mensajes) {
    warnOriginal.apply(console, mensajes);
    mensajes.forEach(m => imprimirEnHTML(m, "log-warn"));
};

function limpiarConsola() {
    consolaDiv.innerHTML = "";
}

//EJERCICIO 1
//CALLBACK TRADICIONAL
function ejecutarCallbackTradicional() {

    const output = document.getElementById("output1");
    output.innerHTML = "<p>Ejecutando ejemplo de callback...</p>";

    console.log("Inicio del programa");

    setTimeout(() => {
        console.log("Este es el callback ejecutándose 2 segundos después");

        output.innerHTML = `
            <p>El callback se ejecutó después de 2 segundos.</p>
        `;

    }, 2000);

    console.log("Fin del programa (¿o no?)");
}

// Async/Await (Conversión correcta del callback)
function esperarDosSegundos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Este es el callback ejecutándose 2 segundos después");
        }, 2000);
    });
}

async function ejecutarAsyncAwait() {
    const output = document.getElementById("output1");
    output.innerHTML = "<p>Ejecutando versión async/await...</p>";

    console.log("Inicio del programa");

    const mensaje = await esperarDosSegundos();

    console.log(mensaje);

    console.log("Fin del programa (ahora sí después de esperar)");

    output.innerHTML = `
        <p>Async/Await ejecutado correctamente.</p>
        <p>Se respetó el orden secuencial del flujo.</p>
    `;
}

//EJERCICIO 2
async function consultarAPI() {
    const output = document.getElementById("output2");
    output.innerHTML = "<p>Consultando API...</p>";

    try {

        console.log("Consultando API...");

        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!respuesta.ok) {
            throw new Error("Error en la respuesta de la API");
        }

        const datos = await respuesta.json();

        console.log("Usuarios obtenidos:");
        console.log(datos);

        let html = "<p>Usuarios obtenidos correctamente:</p>";

        datos.forEach(usuario => {
            html += `
                <div class="user-card">
                    <h4>${usuario.name}</h4>
                    <p>Email: ${usuario.email}</p>
                    <p>Ciudad: ${usuario.address.city}</p>
                </div>
            `;
        });

        output.innerHTML = html;

    } catch (error) {

        console.error("Error:", error.message);

        output.innerHTML = `
            <p style="color:red;">Ocurrió un error al consultar la API</p>
        `;
    }
}

//EJERCICIO 3
//API de Conversión de Monedas
async function consultarMonedas() {
    const output = document.getElementById("output2");
    output.innerHTML = "<p>Consultando tipo de cambio...</p>";

    try {

        console.log("Consultando tipo de cambio del USD...");

        const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API de monedas");
        }

        const datos = await respuesta.json();

        console.log("Respuesta completa:", datos);

        const mxn = datos.rates.MXN;
        const jpy = datos.rates.JPY;
        const eur = datos.rates.EUR;

        console.log("USD a MXN:", mxn);
        console.log("USD a JPY:", jpy);
        console.log("USD a EUR:", eur);

        output.innerHTML = `
            <div class="user-card">
                <h4>Tipo de Cambio Actual (Base USD)</h4>
                <p>1 USD = ${mxn} MXN</p>
                <p>1 USD = ${jpy} JPY</p>
                <p>1 USD = ${eur} EUR</p>
            </div>
        `;

    } catch (error) {

        console.error("Error:", error.message);

        output.innerHTML = `
            <p style="color:red;">Error al consultar el tipo de cambio</p>
        `;
    }
}

function limpiarResultados() {
    document.getElementById("output2").innerHTML =
        "<p>Presiona el botón para consultar la API...</p>";
}
