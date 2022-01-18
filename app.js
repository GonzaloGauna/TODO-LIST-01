// Variables
const formulario = document.querySelector('#form');
const listaTareas = document.querySelector('#task-list');
let lista = [];

// Eventos
cargarEventos();

function cargarEventos() {
    formulario.addEventListener('submit', agregarTarea);

    listaTareas.addEventListener( 'click', eliminarTarea );

    document.addEventListener('DOMContentLoaded', () => {
        lista = JSON.parse(localStorage.getItem('lista')) || [];

        crearHTML();
    })

}

// Funciones
function agregarTarea(e) {
    e.preventDefault();

    const tarea = document.querySelector('#taskContent').value;
    if( tarea === '' ){
        mostrarError();
        return;
    }
    const taskObj = {
        id: Date.now(),
        tarea
    }
    
    lista = [...lista, taskObj];

    crearHTML();

    formulario.reset();
}

function mostrarError(){
    const errorPlace  = document.querySelector('#todo-container');
    const error = document.createElement('p');
    
    error.textContent = 'No se puede agregar tareas vacias';
    error.classList.add('error');

    errorPlace.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML();
    
    lista.forEach( tarea => {
        const tareaHTML = document.createElement('li');
        const eliminarBtn = document.createElement('a');

        tareaHTML.textContent = tarea.tarea;
        tareaHTML.classList.add('li-task');

        eliminarBtn.textContent = 'X';
        eliminarBtn.classList.add('eliminarBtn');

        tareaHTML.appendChild(eliminarBtn);
        listaTareas.appendChild(tareaHTML);
        
        tareaHTML.dataset.taskId = tarea.id;
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('lista', JSON.stringify(lista));
}

function limpiarHTML() {
    while( listaTareas.firstChild ) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
}

function eliminarTarea(e) {
    e.preventDefault();

    const id = e.target.parentElement.dataset.taskId;

    lista = lista.filter( tarea => tarea.id != id );
    limpiarHTML();
    crearHTML();
    console.log(lista);
}