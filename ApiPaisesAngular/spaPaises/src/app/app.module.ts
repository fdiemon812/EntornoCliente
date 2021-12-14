import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './shared-module/shared-module.module';

import { PaisModule } from './pais_module/pais.module';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    
   
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    PaisModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
