import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass'],
  animations: [trigger('boom', [
    transition(':increment', [
      animate('0.5s ease-out', style({
        transform: ' translateZ(-20em) scale(8)',
        opacity: 0
      })),
      animate('1ms', style({
        transform: ' translateZ(-20em) scale(0)',
        opacity: 0
      })),
      animate('100ms', style({
        transform: ' translateZ(-20em) scale(1)',
        opacity: 1
      })),
    ]),
  ])
  ]
})
export class ActionComponent implements OnInit {

  public clickedLink = 0;

  @Input()
  public url: string;

  @Input()
  public image: string;



  constructor() { }

  ngOnInit() {
  }

  public openLink() {
    // setTimeout(
    //   () => window.location.href = this.url,
    //   200);
    this.clickedLink++;
  }

}
