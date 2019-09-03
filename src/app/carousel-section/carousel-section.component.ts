import { Component, OnInit, Input } from '@angular/core';
import { CarouselSection } from '../carouselsection';
import { CarouselOptions } from '../carouseloptions';
import { Utils } from '../utils';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as IsMobile from 'is-mobile';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.sass'],
  animations: [
    trigger('fadeInOut', [
      state('true', style({
        opacity : 1
      })),
      state('false', style({
        opacity: 0.0,
      })),
      transition('false => true', [
        animate('1s 0.5s')
      ]),
      transition('true => false', [
        animate('0.5s')
      ])
    ]),
  ]
})
export class CarouselSectionComponent implements OnInit {

  @Input()
  content: CarouselSection;

  @Input()
  backgroundTransform: SafeStyle;

  @Input()
  options: CarouselOptions;

  @Input()
  focus = 0;

  public foregroundImage: string;
  public backgroundImage: string;
  public loaded = false;
  public titleTransform: string;
  public contentTransform: SafeStyle;
  public contentWidth: number;
  public contentHeight: number;

  public titleFontSize = IsMobile.isMobile(navigator.userAgent) ? 14 : 22;
  public eventFontSize = IsMobile.isMobile(navigator.userAgent) ? 14 : 22;
  public nameFontSize = IsMobile.isMobile(navigator.userAgent) ? 10 : 18;
  public roleFontSize = IsMobile.isMobile(navigator.userAgent) ? 8 : 12;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.onload = () => {
      this.backgroundImage = Utils.prepareBackground(image, canvas, this.options.blurRadius, this.options.backgroundFadeRadius);
      this.foregroundImage = Utils.fadeEdges(image, canvas, 0, 640);
      this.loaded = true;
    };
    image.src = this.content.image;

    this.contentWidth = this.options.contentWidth * this.options.grow;
    this.contentHeight = (this.options.sectionHeight - this.options.padding * 2) * this.options.grow;
    this.contentTransform =
      this._sanitizer.bypassSecurityTrustStyle(`translateX(-50%) translateY(-50%) translateZ(2em) scale(${ 1 / this.options.grow }) `);
  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
