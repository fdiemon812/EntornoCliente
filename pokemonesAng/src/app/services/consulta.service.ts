import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Imagenes } from "../interfaces/images.interface";


@Injectable({
    providedIn: 'root'
  })
  export class ConsultaService {

    constructor(private http:HttpClient){

    }

    url:string = 'http://source.unsplash.com/search/photos?client_id=F-m1MZ1xXNqAc1H6kcZ4EHHKCMZwGVGK8AhqJUFh2YY'

    buscarImagenes(busqueda:string){
        this.http.get<Imagenes>(this.url+'&query='+busqueda+'&per_page=5').subscribe(resp=>{

            


        });
    }

  }
