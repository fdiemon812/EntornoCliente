import { Component, OnInit } from '@angular/core';
import { DatosGif } from '../interface/gif.interface';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {

  constructor(private gs:GifsService) { }

  ngOnInit(): void {
  }



 get arrayDatos():DatosGif[]{

  return this.gs.listaDatos
 } 
 

}
