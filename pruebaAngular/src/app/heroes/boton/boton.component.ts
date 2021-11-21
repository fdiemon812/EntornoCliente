import { Component, OnInit } from '@angular/core';
interface Personaje{
  nombre: string;
  hp: number;
}
@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  heroes:Array<string>=["Hola", "jinx"]
  

  constructor() {
   
   }

  ngOnInit(): void {
  }


  
  
  nuevo: Personaje={
    nombre: "Bull",
    hp: 5200
  
  }

  agregar(){
    this.heroes.push(this.nuevo.nombre+" - "+this.nuevo.hp)
    console.log(this.nuevo.nombre+" - "+this.nuevo.hp)
  }

  cambiarNombre(event:any){
    this.nuevo.nombre=event.target.value;
   
  }

  cambiarSalud(event:any){
    this.nuevo.hp=event.target.value

  }

}
