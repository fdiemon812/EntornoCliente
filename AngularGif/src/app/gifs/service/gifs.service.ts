import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGif, DatosGif } from "../interface/gif.interface";

@Injectable() export class GifsService{

    private _historial:string[]=[];
    public listaDatos:DatosGif[]=[];

    constructor(private http:HttpClient){}
    

    get historial():string[]{
        return [...this._historial];
    }


    buscarGifs(string:string){

       if( !this._historial.includes(string)){

        if(this._historial.length<10){

           this._historial.unshift(string);
       }else{
           this._historial.pop(); //borra el ultimo elemento del array
           this._historial.unshift(string);

            }
        } 

        const params = new HttpParams()
          .set('api_key', "l4V1WgtxZngjZi9gegkll0IlcTe0m29Y")
          .set('limit', '10')
          .set('q', string );

        this.http.get<ApiGif>("http://api.giphy.com/v1/gifs/search", {params:params})
       .subscribe((apiData)=>{
           
        this.listaDatos=apiData.data;
        ;});
    }


 
}