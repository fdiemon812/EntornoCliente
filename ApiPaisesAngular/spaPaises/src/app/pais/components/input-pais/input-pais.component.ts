
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-pais',
  templateUrl: './input-pais.component.html',
  styles: [
  ]
})
export class InputPaisComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  
  busqueda: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  buscar(){
    this.onEnter.emit(this.busqueda);
  }

}
