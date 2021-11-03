

//Listener en el boton de comprobar
document.getElementById("comprobar").addEventListener("click", compruebaUsuario);




function compruebaUsuario(event){

    event.preventDefault;
    


    fetch("http://ejerajax.loc/compruebaDisponibilidadXML.php")
    
    
    .then(response => {
        if(response.ok){
            return response.text();
        }
        return Promise.reject(response);
    })

    .then( data =>{

        
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");

    let respuestaSiNo= xml.getElementsByTagName("disponible")[0].textContent;

    if(respuestaSiNo=="si"){
        alert("nombre de usuario LIBRE")
    }else{

        
        document.getElementById("disponibilidad").innerHTML= "<ul id='lista'></ul>";
        let sugerencia;
        for(let i = 0; i<xml.getElementsByTagName("login").length;i++){

           
            sugerencia = '<li class="boton" id="'+i+'">'+xml.getElementsByTagName("login")[i].textContent+document.getElementById("login").value+'</li>';

            document.getElementById("lista").insertAdjacentHTML("afterend", sugerencia);
        }        
    }

    })


    .catch( err=>{alert("Error al enviar datos")
})
}



document.getElementById("disponibilidad").addEventListener("click", recuperarSugerencia)

function recuperarSugerencia(ev){

    if(ev.target.matches(".boton")){

        let id =ev.target.id    
       console.log(id)
        document.getElementById("login").setAttribute("value", "holoaaaaaaaaaaaaaaa");
    }

}