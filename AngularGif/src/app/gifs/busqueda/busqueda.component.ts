import { Component, OnInit } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor(private gs:GifsService) { }

  ngOnInit(): void {
  }


  contenidoBusqueda:string="";

  
  agregar(){

    this.gs.buscarGifs(this.contenidoBusqueda);
    
  }

}
