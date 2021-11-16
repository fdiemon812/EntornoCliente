import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno-nuevo',
  templateUrl: './alumno-nuevo.component.html',
  styleUrls: ['./alumno-nuevo.component.css']
})
export class AlumnoNuevoComponent {



  alumnos:Array<string>=["Flavio", "paquito", "juanito", "pepito"]



  aprobados:Array<string>=[]

  eliminarUltimo(){

    let alumnoBorrado= this.alumnos.pop();
    this.aprobados.push(alumnoBorrado||'');

  }


 addUltimo(){

    let alumnoAprobado= this.aprobados.pop();
    this.alumnos.push(alumnoAprobado||'');

  }

}
