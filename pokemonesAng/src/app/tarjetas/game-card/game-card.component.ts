import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CardData } from '../interfaces/card-data.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})
export class GameCardComponent implements OnInit {
  
  @Input() data!: CardData;
  
  @Output() cardClicked = new EventEmitter();
  
  constructor() { }
  
  ngOnInit(): void {
  }
}