const formularioValido = {

    nombre: false,
    apellidos: false,
    password: false, 
    nacimiento: false,
    


}



document.getElementById("name").addEventListener("change", compruebaNombre)
function compruebaNombre(){


let url=document.getElementById("name").value;

fetch("https://intranetjacaranda.es/pruebaJS/arrayNombres.php?nombre="+url).then(function(response){
    if(response.ok){
     return   response.text()
    }else{

        return Promise.reject();
    }
}).then(function(datos){

    document.getElementById("listaNombres").remove();
    let sugerencia = '<p id="listaNombres">'+datos+'</p>';
    document.getElementById("name").insertAdjacentHTML("afterend", sugerencia)

    formularioValido.nombre=true;



}).catch(function(){

    alert("error")
})

}

//EN EL INTERCAMBIO CON EL SERVIDOR HAY ALGO QUE NO FUNCIONA Y NOME DA TIEMPO A RESOLVERLO, SIGO ADELANTE

// document.getElementById("login").addEventListener("change", compruebaLogin)
// function compruebaLogin(){




// fetch("https://https://intranetjacaranda.es/pruebaJS/checkLogin.php", {

//     method: 'POST', // o 'PUT', 'GET', 'DELETE'
//     body: document.getElementById("login").value, // los datos que enviamos al servidor en el 'send'
//     headers:{
//       'Content-Type': 'application/text'
    
//     }

// }).then(function(response){
//     if(response.ok){
//      return   response.text()
//     }else{

//         return Promise.reject();
//     }
// }).then(function(datos){

//   console.log(datos)



// }).catch(function(){

//     alert("error")
// })

// }

document.getElementById("apellidos").addEventListener("change", compruebaApellido)
function compruebaApellido(){

    let expRegular= /^[a-zA-Z]+\s[a-zA-Z]+$/gm
    let apellidos= document.getElementById("apellidos").value

    if(expRegular.test(apellidos)){

        document.getElementById("apellidos").classList.remove("error");
        formularioValido.apellidos=true;

    }else{

        document.getElementById("apellidos").classList.add("error");
        formularioValido.apellidos=false;
    }


}




document.getElementById("password").addEventListener("change", compruebaPass)
function compruebaPass(){

    // requisitos: será formada por 4 letras minusculas, 4 mayusculas y 4 numeros del 0 al 9

    let regExpPass= /[a-z]{4}[A-Z]{4}[0-9]{4}/gm
    let valorPass = document.getElementById("password").value

    if(regExpPass.test(valorPass)){

        document.getElementById("password").classList.remove("error");
        formularioValido.password=true;

    }else{

        document.getElementById("password").classList.add("error");
        formularioValido.password=false;
    }

}

document.getElementById("nacimiento").addEventListener("change", compruebaFecha)
function compruebaFecha(){

    let fecha = document.getElementById("nacimiento").value
    let fechaFormatoDate = new Date(fecha);


    let fechaActual = new Date();
    let yearActual = fechaActual.getFullYear();
    
    
    let fechaMinima= fechaActual.setFullYear(yearActual-18);
    


    if(fechaFormatoDate>fechaMinima){

        alert("Error, debes ser mayor de 18 años")
        formularioValido.nacimiento=false;


    }else{

        formularioValido.nacimiento=true;
        let edadActual= (yearActual-(fechaFormatoDate.getFullYear()))
        document.getElementById("edad").innerHTML= edadActual;


    }




}

document.getElementById("enviar").addEventListener("click", enviarFormulario)
function enviarFormulario(ev){

    ev.preventDefault();

    if(Object.values(formularioValido).indexOf(false)==-1){

        const objetoUsuario = {
    
            nombre: document.getElementById("name").value,
            apellidos: document.getElementById("apellidos").value,
            password: document.getElementById("password").value,
            edad: document.getElementById("edad").innerText,
            fechaAlta: new Date()
    
    
    
        }
    
    
        //Usare el login para la KEY del clave-valor
    
        localStorage.setItem(document.getElementById("login").value, JSON.stringify(objetoUsuario));
    }else{

        alert("Algun campo incorrecto")
    }
    


}



//Borrar todos los usuarios
document.getElementById("borrar").addEventListener("click", borraTodo);
function borraTodo(ev){
    ev.preventDefault();
    localStorage.clear()
}

//listar Usuario

document.getElementById("consultar").addEventListener("click", consultaDatos);
function consultaDatos(ev){

    ev.preventDefault();

    let usuarioListar= JSON.parse(localStorage.getItem(document.getElementById("login").value))
    

  let tabla='<table id="tabla" border="1"><tr><td>Nombre</td><td>'+usuarioListar.nombre+'</td></tr><tr><td>Apellidos</td><td>'+usuarioListar.apellidos+'</td></tr><tr><td>Password</td><td>'+usuarioListar.password+'</td></tr><tr><td>FechaAlta</td><td>'+usuarioListar.fechaAlta+'</td></tr><tr><td>FechaAlta</td><td>'+usuarioListar.edad+'</td></tr></table>'


    document.getElementById("final").insertAdjacentHTML("afterend", tabla);

}



document.getElementById("consultaUltimo").addEventListener("click", consultaUltimo);

function consultaUltimo(ev){

    ev.preventDefault();

   let arrayKey= Object.keys(localStorage);

    let ultimaFecha=new Date("1900-01-01");
    let ultimoUsuario=null;
    let usuario2=null;
   arrayKey.forEach(key => {
       
     usuario2=JSON.parse(localStorage.getItem(key));
    console.log(usuario2)
    if(usuario2.fechaAlta>ultimaFecha){
        ultimaFecha=usuario2.fechaAlta;
        ultimoUsuario=usuario2;
    }

   });


   let tabla2='<table id="tabla" border="1"><tr><td>Nombre</td><td>'+usuario2.nombre+'</td></tr><tr><td>Apellidos</td><td>'+usuario2.apellidos+'</td></tr><tr><td>Password</td><td>'+usuario2.password+'</td></tr><tr><td>FechaAlta</td><td>'+usuario2.fechaAlta+'</td></tr><tr><td>FechaAlta</td><td>'+usuario2.edad+'</td></tr></table>'


    document.getElementById("tabla").insertAdjacentHTML("afterend", tabla2);

}
