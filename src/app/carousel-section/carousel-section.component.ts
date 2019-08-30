import { Component, OnInit, Input } from '@angular/core';
import { CarouselSection } from '../carouselsection';
import { CarouselOptions } from '../carouseloptions';
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
  public loaded = false;

  constructor() { }

  ngOnInit() {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.onload = () => {
      this.backgroundImage = Utils.prepareBackground(image, canvas, this.options.blurRadius, this.options.backgroundFadeRadius);
      this.foregroundImage = Utils.fadeEdges(image, canvas, 0, 640);
      this.loaded = true;
    };
    image.src = this.content.image;
  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
