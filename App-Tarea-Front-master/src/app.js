document.getElementById("formulario").addEventListener("submit", GuardarTarea);
// Cuando haga el evento submit , ejecuta la funcion guardar tarea y con el getelementbyid selecciono el id que busco (en este caso el  id formulario)
function GuardarTarea(d) {
    //Guardo el valor en una variable para reutilizarla obteniendo el id con getElementById
    let titulo = document.getElementById('titulo').value
    let descripcion = document.getElementById('descripcion').value

    let tarea = {
        titulo,
        descripcion
    }
    //localStorage.setItem("tarea" , JSON.stringify(tarea)) // metodo para almacenar datos , el segundo parametro es la variable tarea
    //localStorage.getItem("tarea") // solo el nombre por que los estoy mostrando
    //formato nombre y el dato que tiene que almacenar  por que los estoy obteniendo

    if (localStorage.getItem("tarea1") === null) {
        let tarea1 = []

        tarea1.push(tarea)
        localStorage.setItem("tarea1", JSON.stringify(tarea1)) // almacenando la tarea

    } else {
        let tarea1 = JSON.parse(localStorage.getItem("tarea1")) //Traigo las tareas que tenia antes 
        tarea1.push(tarea)//Actualizo
        localStorage.setItem("tarea1", JSON.stringify(tarea1)) // Vuelvo a almacenar
    }
    ObteniendoTarea()
    document.getElementById('formulario').reset() // Reseteo el Formulario y sirve para limpiarlo

    d.preventDefault();

}
function ObteniendoTarea() {
    //Arreglo de Tareas
    let tareas = JSON.parse(localStorage.getItem("tarea1"))
    let verTareas = document.getElementById("tareas")

    verTareas.innerHTML = ''; //Limpiando 

    for(let i = 0; i < tareas.length; i++) {
               //Declaro Variables

        let titulo = tareas[i].titulo
        let descripcion = tareas[i].descripcion
        verTareas.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${titulo} - ${descripcion}
          
          </p>
          <a  onclick="BorrarTarea('${titulo}')" class="btn btn-danger ml-5">Borrar</a>
        </div>
      </div>`;
    } 
} // Con innerHTML puedo crear un elemento html
function BorrarTarea(titulo) {
    //Declaracion de variables
    let  tarea = JSON.parse(localStorage.getItem('tarea1'))
    for(let i = 0; i < tarea.length; i++) {  // Recorro las tareas con un for
        if(tarea[i].titulo === titulo ) {
            tarea.splice(i,1) //Quita el dato al arreglo con el indice i y 1 es la cantidad de elementos que borra del dato
        }
    }

    localStorage.setItem("tarea1" , JSON.stringify(tarea))
    ObteniendoTarea()

}
ObteniendoTarea()
