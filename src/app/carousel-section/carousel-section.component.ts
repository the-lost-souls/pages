import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';
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
export class CarouselSectionComponent implements OnInit, AfterViewInit {

  @Input()
  content: CarouselSection;

  @Input()
  backgroundTransform: SafeStyle;

  @Input()
  options: CarouselOptions;

  private _focus = 0;
  @Input()
  public set focus(value: number) {
    this._focus = value;
    this.focusChanged.next(value);
  }

  public get focus(): number {
    return this._focus;
  }

  private focusChanged: EventEmitter<number> = new EventEmitter<number>();

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

  // animation
  private _state = false;
  private _start = 0;
  private _durationIn = 0.8;
  private _durationOut = 0.3;
  public value = 0;
  private _done = true;

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

    this.focusChanged.subscribe(value => {
      requestAnimationFrame((frameT) => this.animate(frameT));
    });
  }

  private animate(t: number) {

    const currentState = (this.focus === 1);

    if (currentState !== this._state) {

      if (currentState) {
        this._start = t - this.value * this._durationIn * 1000;
      } else {
        this._start = t - (1 - this.value) * this._durationOut * 1000;
      }

      this._state = currentState;
      this._done = false;
    }

    if (currentState) {
      const k = (t - this._start) / (this._durationIn * 1000);
      this.value = Utils.clamp(k, 0, 1);
      if (this.value === 1) {
        this._done = true;
      }
    } else {
      const k = (t - this._start) / (this._durationOut * 1000);
      this.value = Utils.clamp(1 - k, 0, 1);
      if (this.value === 0) {
        this._done = true;
      }
    }

    if (!this._done) {
      requestAnimationFrame((frameT) => this.animate(frameT));
    }
  }

  ngAfterViewInit() {

    requestAnimationFrame((frameT) => this.animate(frameT));
  }


  public openUrl(url: string) {
    window.location.href = url;
  }
}
