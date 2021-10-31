const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')
const doingTasks = document.getElementById('doing-tasks')

listarTareas();

//dataTransfer
/*
    API drag & drop:
    Existen dos partes principales en esta API, el objeto a arrastrar y la zona donde vamos a dejarlo
    Para controlar estas acciones tenemos varios eventos de cada una de las partes
        Objeto a arrastrar:
            dragstart: Se dispara al comenzar a arrastrar
            drag: Se dispara mientras arrastramos
            dragend: Se dispara cuando soltamos el objeto
        Zona de destino:
            dragenter: Se dispara cuando el objeto entra en la zona de destino
            dragover: Se dispara cuando el objeto se mueve sobre la zona de destino
            drop: Se dispara cuando soltamos el objeto en la zona de destino
            dragleave: Se dispara cuando el objeto sale de la zona de destino
*/
//setData: Establece la información que queremos compartir
//getData: Establece la información que queremos obtener

pendingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

pendingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

pendingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

doingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

doingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

doingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})


finishedTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})


finishedTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

finishedTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

//OBLIGATORIO, SI NO, NO FUNCIONA
finishedTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

finishedTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id
    

    let objeto=JSON.parse(localStorage.getItem(element.id))
    objeto.estado="finished";

    localStorage.setItem(element.id, JSON.stringify(objeto) )


    switch (padre) {
        case 'pending-tasks':
          console.log('pendingTasks');
          finishedTasks.appendChild(pendingTasks.removeChild(element));
          break;
        case 'doing-tasks':
          console.log('doingTasks');
          finishedTasks.appendChild(doingTasks.removeChild(element));
          break;
      }
    })

doingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

doingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre= element.parentNode.id

    
    let objeto=JSON.parse(localStorage.getItem(element.id))
    objeto.estado="doing";

    localStorage.setItem(element.id, JSON.stringify(objeto) )


   switch (padre) {
       case 'pending-tasks':
           
           doingTasks.appendChild(pendingTasks.removeChild(element))
           

           break;
        
        case 'finished-tasks':
        
            console.log('doingTasks');
            doingTasks.appendChild(finishedTasks.removeChild(element))

        break;

   }
})


// MI CÓDIGO

pendingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

pendingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    
    
    const padre= element.parentNode.id



    let objeto=JSON.parse(localStorage.getItem(element.id))
    objeto.estado="pending";

    localStorage.setItem(element.id, JSON.stringify(objeto) )


   switch (padre) {
       case 'doing-tasks':
           
           pendingTasks.appendChild(doingTasks.removeChild(element))
           console.log('pending');
           break;
        
        case 'finished-tasks':
        
            console.log('doingTasks');
            pendingTasks.appendChild(finishedTasks.removeChild(element))


        break;

   }
})


// LOCAL STORAGE

// CREANDO CONTADOR PARA ID TAREAS


function sumaContador(){

    
    if(localStorage.length<1){
        
        localStorage.setItem("contador", "1");
        


    }else{
        let sumaCont = parseInt(localStorage.getItem("contador")) + 1
        localStorage.setItem("contador", sumaCont)

    }

}

//BORRADO BOTON RESET
document.getElementById("reset").addEventListener("click", () => {





    localStorage.clear();
    location.reload()

})






document.getElementById("enviar").addEventListener("click", addTarea);
function addTarea(){

    sumaContador();

   let task= {

    descripcion: document.getElementById("nuevaTarea").value,
    estado: "pending"

   }

   localStorage.setItem(localStorage.getItem("contador"), JSON.stringify(task))
   
   location.reload();

}


function listarTareas(){
    

    Object.keys(localStorage).forEach(function(key){


        if(key != "contador"){





            let tarea= JSON.parse(localStorage.getItem(key));


            if(tarea.estado=="pending"){

                pendingTasks.getElementsByTagName("h2")[0].insertAdjacentHTML("afterend", '<div id="'+
                key+'" class="task" draggable="true">'+tarea.descripcion+'</div>') 

            }else if(tarea.estado=="doing"){
                
                
                doingTasks.getElementsByTagName("h2")[0].insertAdjacentHTML("afterend", '<div id="'+
                key+'" class="task" draggable="true">'+tarea.descripcion+'</div>') 

            }else{
                
                finishedTasks.getElementsByTagName("h2")[0].insertAdjacentHTML("afterend", '<div id="'+
                key+'" class="task" draggable="true">'+tarea.descripcion+'</div>') 


            }

            
            







        
        }
    })

}