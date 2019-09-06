import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-goodbye-component',
  templateUrl: './goodbye-component.component.html',
  styleUrls: ['./goodbye-component.component.sass'],
  animations: [
    trigger('fadeIn', [
      state('void, false', style({
        opacity : 0
      })),
      state('true', style({
        opacity: 1,
      })),
      transition('* => true', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class GoodbyeComponentComponent implements OnInit {

  public fadeIn = false;

  constructor() { }

  ngOnInit() {
  }

  public goodbye(): void {
    this.fadeIn = true;
    console.log('goodbye!')
  }

}
