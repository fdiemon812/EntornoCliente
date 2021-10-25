// const peticion = new XMLHttpRequest();
// peticion.open('GET', 'http://localhost:3000/posts');
// peticion.send();

fetch('http://localhost:3000/posts', {

}).then(response => {

    if (response.ok) {
        return response.json();
      }
      return Promise.reject(response) 

}).then(data => {
                
    let tabla= document.getElementById("tabla");
    data.forEach(articulo => {
        
        
            let enlace= "'post.html?id=" +articulo.id+"'"
        
            let fila= '<tr><td>'+articulo.autor + '</td><td>'+articulo.titulo+'</td><td>'+
            articulo.articulo+'</td><td><button onclick="location.href='+enlace+'">Ver</button><button id="'+articulo.id+'">Borrar</button></td></tr>'
            tabla.insertRow().innerHTML = fila;
            
                    
            document.getElementById(articulo.id).addEventListener("click", (e)=>{
                
               // e.preventDefault();
                
               fetch('http://localhost:3000/posts/'+articulo.id, {
                method: 'DELETE', // o 'PUT', 'GET', 'DELETE'
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(response2 =>{

                if(response2.ok){

                return response2.json();               
            }
            return Promise.reject(response2) 

                



              }).then(data =>{
                  location.reload();
              })
              
              
              
              .catch(error => alert("Hay error al borrar"))
              
            })})
                    
}).catch(error => alert("Hay error al recuperar la información"))




fetch('http://localhost:3000/profile')
.then(response3=>{

    if(response3.ok){

        return response3.json()
    }
    return Promise.reject(response3);

}).then(data2=>{

    let autores =data2;

    let select= document.getElementById("listaAutores")
    for(i=0;i<autores.length;i++){
    
       let option= document.createElement("option")
       option.innerHTML= '<option value="'+autores[i].name+'">'+autores[i].name+'</option>';
    
       select.appendChild(option)
    
       
    
    
        
        
    
    
    
    }
}).catch(err=>{alert("Error al enviar datos de autores")})

       
   



document.getElementById("enviar").addEventListener("click", addFila);

function addFila(ev){
    ev.preventDefault();


    
    const nuevoPosts={

    "titulo": document.getElementById("titulo").value,
      "autor": document.getElementById("listaAutores").value,
      "articulo":document.getElementById("articulo").value

    }

    fetch('http://localhost:3000/posts/', {
        method: 'POST', // o 'PUT', 'GET', 'DELETE'
        body: JSON.stringify(nuevoPosts), // los datos que enviamos al servidor en el 'send'
        headers:{'Content-Type': 'application/json'}
        
        }).then(response3=> {
            if(response3.ok){
                return response3.json()
            }
            return Promise.reject(response3);
        }).then( data =>{




            location.reload();


        }).catch(err=>{alert("error enviando datos")})

    }




