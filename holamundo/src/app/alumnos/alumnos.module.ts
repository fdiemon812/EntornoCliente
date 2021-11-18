import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlumnopruebaComponent } from "./alumnoprueba/alumnoprueba.component";
import { ContadorComponent } from "./contador/contador.component";


@NgModule({
    declarations:[
        ContadorComponent,
        AlumnopruebaComponent
       


    ],exports:[

        ContadorComponent,
        AlumnopruebaComponent
        

    ],imports:[
        CommonModule

    ]


})

export class AlumnosModule{

    
}