import { Component, OnInit } from '@angular/core';
import { SearchRESTCountries } from '../../interfaces/countries.interface';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  constructor(private servicio:PaisesServiceService) { }
  paises: SearchRESTCountries[] = [];
  busqueda: string = '';
  error: boolean = false;

  ngOnInit(): void {
  }

  get listaPaises(){
    return this.servicio.resultado;
  }

  buscar(busqueda :string){
    this.busqueda = busqueda;
    this.servicio.buscarPaises(this.busqueda)
    .subscribe(resp=>
      {
        this.paises = resp;
        this.error = false;
        console.log(this.paises);
      },
      (err) =>{
        this.error = true;
      })
  }
}
