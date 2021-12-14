import { Component, OnInit } from '@angular/core';
import { SearchRESTCountries } from '../../interfaces/countries.interface';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

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
    this.servicio.buscarPaisesRegion(this.busqueda)
    .subscribe(resp=>
      {
        this.paises = resp;
        console.log(this.paises);
      },
      (err) =>{
        this.error = true;
      })
  }

}
