import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private ss:GifsService) { }

  ngOnInit(): void {
  }

  get listaHistorial():string[]{

    return this.ss.historial;
  }

}
