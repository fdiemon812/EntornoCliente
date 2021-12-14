import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PorPaisComponent } from './pais_module/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais_module/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais_module/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais_module/pages/ver-pais/ver-pais.component';
//aquí importaremos el componente especificado abajo para hacer sus routing

const routes: Routes = [
  {
      path: '',
      component: PorPaisComponent,
      pathMatch: 'full'
  },
  {
      path: 'region',
      component: PorRegionComponent
  },
  {
      path: 'capital',
      component: PorCapitalComponent
  },
  {
      path: 'pais/:id',
      component: VerPaisComponent
  },
  {
      path: '**',
      redirectTo: ''
  }
];


@NgModule({
  imports: [
      RouterModule.forRoot( routes )
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}

