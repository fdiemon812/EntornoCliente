import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { FormsModule } from '@angular/forms';
import { GifsService } from './service/gifs.service';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent,
    ResultadosComponent,
    
  ],exports:[
    GifsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    GifsService
  ]
})
export class GifsModule { }
