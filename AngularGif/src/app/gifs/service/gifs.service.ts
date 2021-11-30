import { Injectable } from "@angular/core";

@Injectable() export class GifsService{

    private _historial:string[]=[];

    
    // get historial() devuelve la propiedad privada historial que será un array de strings

    get historial():string[]{
        return [...this._historial];
    }

    // buscarGifs ( query: string) recibe un string y lo añade al 
    // principio del array historial.

    buscarGifs(string:string){

       if( !this._historial.includes(string)){

        if(this._historial.length<10){

           this._historial.unshift(string);
       }else{
           this._historial.pop(); //borra el ultimo elemento del array
           this._historial.unshift(string);

            }
        } 
    }

}