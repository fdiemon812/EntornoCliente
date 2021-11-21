import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BotonComponent } from "./boton/boton.component";
import { ListadoComponent } from "./listado/listado.component";


@NgModule({
    declarations:[
        BotonComponent,
        ListadoComponent
        
    ],
    exports:[
        BotonComponent, 
        ListadoComponent
    ],
    imports:[

        CommonModule,
        FormsModule
    ]
    



})export class HeroesModule{}