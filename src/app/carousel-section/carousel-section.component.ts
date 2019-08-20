import { Component, OnInit, Input } from '@angular/core';
import { CarouselItem } from '../carouselitem';
import { CarouselConfig } from '../carouselconfig';
import { Layout } from '../layout';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.sass']
})
export class CarouselSectionComponent implements OnInit {

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
