import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchRESTCountries } from '../../interfaces/countries.interface';
import { PaisesServiceService } from '../../services/paises-service.service';
@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

   pais: any;


  constructor(private ps:PaisesServiceService, private rutaActiva: ActivatedRoute  ) { }

  ngOnInit(): void {

    this.buscarPais();
  }

  
   buscarPais<PaisSearch>(){
    console.log("snapshot es "+this.rutaActiva.snapshot.params['id']);
    

    this.ps.buscarPaisInfo(this.rutaActiva.snapshot.params['id']).subscribe(resp=>
      {
        this.pais = resp;
        
        console.log(this.pais.name);
      })

    
  }
  

}
