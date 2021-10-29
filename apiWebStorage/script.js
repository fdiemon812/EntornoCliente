

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

        if(key!="contador"){

            
            let task = JSON.parse(localStorage.getItem(key))
            let tabla= document.getElementById("tabla")
            
            
            let estadoCheckbox=""
            if(task.estado=="true"){
                estadoCheckbox="checked"
            }
            
            let filaNueva="<tr><td><input type='checkbox' "+estadoCheckbox+"  class='check' id='"+key+"'>"+task.descripcion+"</td><td><button class='boton' id='"+key+"'>Borrar</button></td></tr>"
            
            
            
            tabla.insertRow().innerHTML = filaNueva;               
        }
        
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
       
   if(localStorage.length==0){
       localStorage.setItem("contador", "1")
       

   }else{

        let numeroContador= parseInt(localStorage.getItem("contador"))+1
        localStorage.setItem("contador", numeroContador)

   }
    

   
    localStorage.setItem(localStorage.getItem("contador"), JSON.stringify(miTarea));

    location.reload();
    

}


//Borrar memoria local

document.getElementById("reset").addEventListener("click", ()=>{

    localStorage.clear()
});
