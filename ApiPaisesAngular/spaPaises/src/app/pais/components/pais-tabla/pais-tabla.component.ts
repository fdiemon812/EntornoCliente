import { Component, Input, OnInit } from '@angular/core';
import { SearchRESTCountries } from 'src/app/pais_module/interfaces/countries.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
  ]
})
export class PaisTablaComponent implements OnInit {
  @Input() countries: SearchRESTCountries[] = [];
  @Input() error: boolean=false;
  @Input() busqueda: string="";
  constructor() { }

  ngOnInit(): void {
  }

}
