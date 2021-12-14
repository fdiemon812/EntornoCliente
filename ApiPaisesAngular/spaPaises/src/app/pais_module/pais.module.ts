import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PorCapitalComponent } from './pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { VerPaisComponent } from './pages/ver-pais/ver-pais.component';
import { FormsModule } from '@angular/forms';
import { PaisTablaComponent } from '../pais/components/pais-tabla/pais-tabla.component';
import { InputPaisComponent } from '../pais/components/input-pais/input-pais.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PorPaisComponent,
    PorRegionComponent,
    PorCapitalComponent,
    VerPaisComponent,
    PaisTablaComponent,
    InputPaisComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    PorPaisComponent,
    PorRegionComponent,
    PorCapitalComponent,
    VerPaisComponent
  ]
})
export class PaisModule { }
