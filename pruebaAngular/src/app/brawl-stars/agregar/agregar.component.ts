import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  agregar(){
    
    this.personajes.push(this.nuevo);
    this.nuevo = {
      nombre: "",
      salud: 0
    }
  }


  @Input() personajes: Personaje[]=[];
  @Input() nuevo: Personaje={nombre:"", salud:0};
  
  constructor() { }

  ngOnInit(): void {
  }

}
