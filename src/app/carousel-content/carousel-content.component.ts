import { Component, OnInit, Input } from '@angular/core';
import { CarouselItem } from '../carouselitem';
import { CarouselConfig } from '../carouselconfig';
import { Layout } from '../layout';

@Component({
  selector: 'app-carousel-content',
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.sass']
})
export class CarouselContentComponent implements OnInit {

  @Input()
  content: CarouselItem;

  @Input()
  geometry: Layout;

  @Input()
  options: CarouselConfig;

  constructor() { }

  ngOnInit() {
  }

}
