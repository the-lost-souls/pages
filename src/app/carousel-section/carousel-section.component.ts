import { Component, OnInit, Input } from '@angular/core';
import { CarouselSection } from '../carouselsection';
import { CarouselOptions } from '../carouseloptions';
import { Layout } from '../layout';
import { Utils } from '../utils';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.sass']
})
export class CarouselSectionComponent implements OnInit {

  @Input()
  content: CarouselSection;

  @Input()
  backgroundTransform: SafeStyle;

  @Input()
  options: CarouselOptions;

  public foregroundImage: string;
  public backgroundImage: string;

  constructor() { }

  ngOnInit() {
    const img = new Image();
    const c = document.createElement('canvas');
    img.onload = () => {
      this.backgroundImage = Utils.prepareBackground(img, c, this.options.blurRadius, this.options.backgroundFadeRadius);
      this.foregroundImage = Utils.fadeEdges(img, c   , 0, 640);
    };
    img.src = this.content.image;
  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
