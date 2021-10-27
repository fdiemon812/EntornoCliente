//LISTAR LAS TAREAS



    document.getElementById("tabla").addEventListener("click", pulsandoTabla)

    function pulsandoTabla(ev){


        if(ev.target.matches(".boton")){
            
            let claveTareaCheck= ev.target.id
            localStorage.removeItem(claveTareaCheck);
            location.reload()

        }else if(ev.target.matches(".check")){

            if(ev.target.checked==true){

                let tareaJson= JSON.parse(localStorage.getItem(ev.target.id))
                tareaJson.estado="true"
                localStorage.setItem(ev.target.id, JSON.stringify(tareaJson))
                

            }else{

                let tareaJson= JSON.parse(localStorage.getItem(ev.target.id))
                tareaJson.estado="false"
                localStorage.setItem(ev.target.id, JSON.stringify(tareaJson))

            }


        }

    }

    Object.keys(localStorage).forEach(function(key){


        let task = JSON.parse(localStorage.getItem(key))
        let tabla= document.getElementById("tabla")

        // let filaNueva="";

        // if(task.estado){


        //      filaNueva= "<tr><td><input type='checkbox' checked='true' class='check' id='"+key+"'>"+
        //     task.descripcion+"</td><td><button class='boton' id='"+key+"'>Borrar</button></td></tr>"

        // }else{

        //      filaNueva= "<tr><td><input type='checkbox' checked='false' class='check' id='"+key+"'>"+
        //     task.descripcion+"</td><td><button class='boton' id='"+key+"'>Borrar</button></td></tr>"
        // }
        
        
        
       tabla.insertRow().innerHTML = filaNueva;               
        
    });
 



    
 


//ADD TAREA AL LOCAL
document.getElementById("enviar").addEventListener("click", addTarea);


function addTarea(ev){

    ev.preventDefault()

    let tarea= document.getElementById("tarea").value

    const miTarea={

        descripcion: tarea,
        estado:"false"

    }

    let clave = localStorage.length+1
    localStorage.setItem(clave, JSON.stringify(miTarea));

    location.reload();
    

}


//Borrar memoria local

document.getElementById("reset").addEventListener("click", ()=>{

    localStorage.clear()
});
