

//Listener en el boton de comprobar
document.getElementById("comprobar").addEventListener("click", compruebaUsuario);




function compruebaUsuario(event){

    event.preventDefault;
    

console.log("boton")


    fetch("http://ejerajax.loc/compruebaDisponibilidad.php")
    
    
    .then(response => {
       
        
        if(response.ok){
            return response.text();
        }

        return Promise.reject(response);

        


    })

    .then( data =>{
        console.log(data)
        if(data=="si"){

            alert("Usuario existe en el sistema")
        }else{
            alert("Respuesta NO, Usuario no existe")
        }

    })


    .catch( err=>{alert("Error al enviar datos")
})


    



}