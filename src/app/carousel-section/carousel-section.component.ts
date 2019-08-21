import { Component, OnInit, Input } from '@angular/core';
import { CarouselSection } from '../carouselsection';
import { CarouselOptions } from '../carouseloptions';
import { Layout } from '../layout';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.sass']
})
export class CarouselSectionComponent implements OnInit {

  @Input()
  content: CarouselSection;

  @Input()
  geometry: Layout;

  @Input()
  options: CarouselOptions;

  constructor() { }

  ngOnInit() {
  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
