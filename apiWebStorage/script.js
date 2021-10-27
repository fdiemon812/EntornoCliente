//LISTAR LAS TAREAS




//ADD TAREA AL SESSION
document.getElementById("enviar").addEventListener("click", addTarea);


function addTarea(ev){

    ev.preventDefault()

    let tarea= document.getElementById("tarea").value

    const miTarea={

        descripcion: tarea,
        estado:"false"

    }

    
    listaTareas.push(miTarea)


    sessionStorage.setItem("tareas", listaTareas);

    console.log(listaTareas)
}


//Borrar memoria sesion

document.getElementById("reset").addEventListener("click", ()=>{

    sessionStorage.clear()
});
