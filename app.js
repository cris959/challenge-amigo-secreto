// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
//let amigos = [];


//function agregarAmigo() {
//    let nombreHTML = document.getElementById(amigo);
//    nombreHTML.innerHTML = amigos;
//}

// ----------------------

/*
let amigos = [];

function agregarAmigo() {
    // Obtener el input por el id 'amigo'
    let input = document.getElementById("amigo");
    // Obtener el valor del input y quitar espacios extras
    let nombre = input.value.trim();

    // Validar que no esté vacío
    if(nombre !== "") {
        // Añadir el nombre al array
        amigos.push(nombre);

        // Limpiar el input para el próximo nombre
        input.value = "";

        // Obtener el elemento UL donde mostraremos la lista
        const listaAmigos = document.getElementById("listaAmigos");

        // Limpiar la lista para volver a dibujarla completa
        listaAmigos.innerHTML = "";

        // Recorrer el array y agregar cada amigo como un <li>
        amigos.forEach(function(amigo) {
            const li = document.createElement("li");
            li.textContent = amigo;
            listaAmigos.appendChild(li);
        });
    } else {
        // Opcional: alerta si el nombre está vacío
        alert("Por favor, ingrese un nombre válido.");
    }
}
    */

/*
let amigos = [];
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    // Validar que el nombre solo contenga letras (y espacios opcionales)
    // Esta expresión regular permite letras (mayúsculas y minúsculas) y espacios
    let regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // Limpiar el input para el próximo nombre
        input.value = "";

    if(nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        input.value = "";  // Limpiar input
        return;
    }

    if(!regex.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios, sin números ni símbolos.");
        input.value = "";
        return;
    }
    // Agregar el nombre al array global
    amigos.push(nombre);
    input.value = "";


    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(function(amigo) {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    // Verificamos que haya al menos un amigo ingresado
    if(amigos.length === 0) {
        alert("No hay amigos en la lista para sortear.");
        return;
    }

    // Seleccionamos un índice aleatorio
    const indexAleatorio = Math.floor(Math.random() * amigos.length);

    // Obtenemos el nombre del amigo sorteado
    const amigoSorteado = amigos[indexAleatorio];

    // Obtenemos el elemento UL donde mostrar el resultado
    const resultado = document.getElementById("resultado");

    // Limpiamos los resultados anteriores
    resultado.innerHTML = "";

    // Creamos un elemento <li> para mostrar el nombre sorteado
    const li = document.createElement("li");
    li.textContent = `El amigo sorteado es: ${amigoSorteado}`;
    resultado.appendChild(li);
}
    */

let amigos = [];
let timeoutMensaje; // Variable global para controlar el timeout

function agregarAmigo() {
    const input = document.getElementById("amigo");
    let nombre = input.value.trim();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        input.value = "";
        return;
    }

    if (!regex.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios, sin números ni símbolos.");
        input.value = "";
        return;
    }

    amigos.push(nombre);
    input.value = "";

    actualizarListaAmigos();
    habilitarSortear();
    ocultarMensajeSorteo();
}

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function habilitarSortear() {
    const btnSortear = document.getElementById("btnSortear");
    btnSortear.disabled = amigos.length === 0 ? true : false;
    if (!btnSortear.disabled) {
        btnSortear.classList.remove("disabled");
    }
}

// Función para mostrar mensaje de aviso del sorteo único
function mostrarMensajeSorteo(text) {
    const mensaje = document.getElementById("mensajeSorteo");
    mensaje.textContent = text;
    mensaje.style.display = "block";
}

// Función para ocultar mensaje
function ocultarMensajeSorteo() {
    const mensaje = document.getElementById("mensajeSorteo");
    mensaje.style.display = "none";
    mensaje.textContent = "";
}

function sortearAmigo() {
    const btnSortear = document.getElementById("btnSortear");

    if (btnSortear.disabled) {
        // Ya sorteó, mostrar mensaje por si hacen click (Aunque el botón no debería estar clickeable)
        mostrarMensajeSorteo("Solo se puede realizar un sorteo una sola vez.");
        return;
    }

    if (amigos.length === 0) {
        alert("No hay amigos en la lista para sortear.");
        return;
    }

    const indexAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indexAleatorio];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    const li = document.createElement("li");
    li.textContent = `El amigo sorteado es: ${amigoSorteado}`;
    resultado.appendChild(li);

    // Deshabilitar botón después de sorteo
    btnSortear.disabled = true;
    btnSortear.classList.add("disabled");
    mostrarMensajeSorteo("Solo se puede realizar el sorteo una sola vez.");
}

// Al cargar la página, deshabilitar el botón sortear si no hay amigos
window.addEventListener('DOMContentLoaded', () => {
    habilitarSortear();
});

function mostrarMensajeSorteo(text) {
    const mensaje = document.getElementById("mensajeSorteo");
    mensaje.textContent = text;
    mensaje.style.display = "block";

    // Si había un timeout previo, lo limpiamos para evitar que desaparezca antes de tiempo
    if (timeoutMensaje) {
        clearTimeout(timeoutMensaje);
    }

    // Luego de 4 segundos, ocultar el mensaje automáticamente
    timeoutMensaje = setTimeout(() => {
        mensaje.style.display = "none";
        mensaje.textContent = "";
        timeoutMensaje = null;
    }, 6000);
}