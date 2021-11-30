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
    if(this.contenidoBusqueda!="" && this.contenidoBusqueda!=null){

      this.gs.buscarGifs(this.contenidoBusqueda);
    }
    this.contenidoBusqueda="";
  }

}
