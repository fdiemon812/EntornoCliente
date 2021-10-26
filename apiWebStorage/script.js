//LISTAR LAS TAREAS




//ADD TAREA AL SESSION
document.getElementById("enviar").addEventListener("click", addTarea);




// sessionStorage.setItem("contador", "1")
// let contadorNuevo= ""+(parseInt(sessionStorage.getItem("contador"))+1)
// sessionStorage.setItem("contador", contadorNuevo);

// console.log(contadorNuevo)

let listaTareas=[sessionStorage.getItem("tareas")]
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
    console.log("elementos borrados")


});
