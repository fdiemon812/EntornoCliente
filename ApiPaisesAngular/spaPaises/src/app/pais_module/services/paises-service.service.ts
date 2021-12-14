import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SearchRESTCountries, Name } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {

  constructor(private httpClient:HttpClient) { }

  //VARIABLES PARA LA PETICIÓN
  private url_base:string="https://restcountries.com/v3.1"; //para que nos vaya sacando info de los caracteres que vayamos introduciendo
  public resultado: SearchRESTCountries[] = [];

  buscarPaises(busqueda:string){
    let url: string = `${this.url_base}/name/${busqueda}`;
    //desde el componente por-pais le pasamos el nombre buscado y devolverá todo aquello que encaje con la búsqueda
    //La url que he buscado en thunderClient es https://restcountries.com/v3.1/name/{name}.
   //En este caso, al necesitar solo el nombre, no creo un objeto params.
    return this.httpClient.get<SearchRESTCountries[]>(url)
    // .subscribe(
    //   (resp) =>{
    //     console.log(resp);
    //    this.resultado = resp;
      // }
    // )
  }

  buscarPaisesRegion(busqueda:string){
    let url: string = `${this.url_base}/region/${busqueda}`;
    return this.httpClient.get<SearchRESTCountries[]>(url)
  }

  buscarPaisesCapital(busqueda:string){
    let url: string = `${this.url_base}/capital/${busqueda}`;
    return this.httpClient.get<SearchRESTCountries[]>(url)
  }
}
