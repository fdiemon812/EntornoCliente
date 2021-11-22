import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor() { }
  
  ngOnInit(): void {
  }
  personajes: Personaje[]=
  [
    {
      nombre: "Shelly",
      salud: 3600
    },
    {
      nombre: "Nita",
      salud: 3800
    },
    {
      nombre: "Colt",
      salud: 2800
    },
    {
      nombre: "Bull",
      salud: 5200
    }
  ]
  nuevo: Personaje={
    nombre: "Bull",
    salud: 5200
  }

 

}
