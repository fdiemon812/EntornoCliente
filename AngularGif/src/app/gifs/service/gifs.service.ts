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
       
        this._historial.unshift(string);
        console.log(this._historial)
    }

}