//COMPROBACIONES FORMULARIO

document.getElementById("nombre").addEventListener("change", comprobarNombre)
document.getElementById("tlf").addEventListener("change", comprobarTelefono)
document.getElementById("mail").addEventListener("change", compruebaEmail)




let formularioValido ={

    nombre: false,
    tlf: false,
    mail: false

}

function comprobarNombre(){

    let nombreCorrecto =/^[a-zñáéíóú ]+$/gi;
    let nombre= document.getElementById("nombre").value;


    if(!nombreCorrecto.test(nombre)){

        document.getElementById("nombre").classList.remove("bien")
        document.getElementById("nombre").classList.add("error")

        formularioValido.nombre= false;

    }else{

        document.getElementById("nombre").classList.remove("error")
        document.getElementById("nombre").classList.add("bien")
        formularioValido.nombre= true;

    }


}

function comprobarTelefono(){


    let telefonoCorrecto= /^[0-9]{9}$/g;
    let tlf = document.getElementById("tlf").value


    if(!telefonoCorrecto.test(tlf)){

        document.getElementById("tlf").classList.remove("bien")
        document.getElementById("tlf").classList.add("error")

        formularioValido.tlf= false;

    }else{

        document.getElementById("tlf").classList.remove("error")
        document.getElementById("tlf").classList.add("bien")
        formularioValido.tlf= true;

    }

}


function compruebaEmail(){


    let email = document.getElementById("mail").value;


    let nombreCorrecto =/^.*[@]{1}.*$/gi;




    if(!nombreCorrecto.test(email)){
       
        document.getElementById("mail").classList.remove("bien")
        document.getElementById("mail").classList.add("error")
       
        formularioValido.mail=false;


    }else{
       
        document.getElementById("mail").classList.remove("error")
        document.getElementById("mail").classList.add("bien")
        formularioValido.mail=true;

    }
}



document.getElementById("enviar").addEventListener("click", comprobarCampos)

function comprobarCampos(ev){


    let result=Object.values(formularioValido).findIndex(value=> value==false);

    if(result!=-1){
       
        ev.preventDefault();

        alert("Hay errores en el formulario")
       
    }else{
            ev.preventDefault();
        
        const nuevaPersona={
            name:document.getElementById("nombre").value,
            tlf:document.getElementById("tlf").value,
            mail:document.getElementById("mail").value

        }


        const peticion=new XMLHttpRequest();
        peticion.open('POST', 'http://localhost:3000/profile');
        peticion.setRequestHeader('Content-type', 'application/json'); 
        peticion.send(JSON.stringify(nuevaPersona)); 


        peticion.addEventListener('load', compruebaCarga);
        
        
        function compruebaCarga(){

            if(peticion.status==201){
                window.location.href = "listaPost.html"
            }else{
                
                alert("Los datos no se han enviado correctamente")
            }
            
        }

        
    }

}



