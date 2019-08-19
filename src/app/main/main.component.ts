import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CarouselConfig } from '../carouselconfig';
import { Utils } from '../utils';
import { Layout } from '../layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  animations: [
    trigger('showHideContent', [
      state('true', style({
        opacity: '1',
      })),
      state('false', style({
        opacity: '0',
      })),
      transition('false => true', [
        animate('1s 0.5s ease-out')
      ]),
      transition('true => false', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class MainComponent implements OnInit, AfterViewInit {

  // inputs
  public config: CarouselConfig = CarouselConfig.default();

  // -------------
  public itemTotalSize = this.config.itemSize + this.config.spacing;

  public angle1 = 0;
  public angle2 = -63;

  @ViewChild('container', { static: false })
  private _container: ElementRef<HTMLElement>;

  public itemSizeStyle: string;

  public scrollPaddingTop: string;
  public scrollPaddingBottom: string;
  public layout: Layout[] = [];

  public margins: string[] = [];

  private _previousT: number;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _sanitizer: DomSanitizer) {

    this.layout = new Array(this.config.items.length);
    for (let i = 0; i < this.layout.length; i++) {
      this.layout[i] = new Layout();
    }
  }

  ngOnInit() {
    this.itemSizeStyle = `${this.config.itemSize}px`;
  }

  ngAfterViewInit() {
    this.margins = new Array(this.config.items.length);
    this.margins[0] = `${this.config.center - this.config.itemSize / 2}px 0 0 0`;
    for (let i = 1; i < this.config.items.length - 1; i++) {
      this.margins[i] = `${this.config.spacing}px 0 0 0`;
    }
    this.margins[this.config.items.length - 1] =
      `${this.config.spacing}px 0 ${this._container.nativeElement.clientHeight - this.config.center - this.config.itemSize / 2}px 0`;

    this.scrollPaddingTop = `${this.config.center - this.config.itemSize / 2}px`;
    this.scrollPaddingBottom = `${this._container.nativeElement.clientHeight - this.config.center - this.config.itemSize / 2}px`;

    const c = document.createElement('canvas');
    for (let i = 0; i < this.config.items.length; i++) {
      const img = new Image();
      img.onload = () => {
        console.log('Blurring ' + this.config.items[i].image);
        this.layout[i].background = Utils.blur(img, c, 3);
      };
      img.src = this.config.items[i].image;
    }

    this.onScroll();

    // requestAnimationFrame((frameT) => this.animate(frameT));

    this._changeDetector.detectChanges();
  }

  private animate(t: number) {

    if (this._previousT) {
      const elapsed = t - this._previousT;
      this.angle1 += 3.5 * elapsed / 1000;
      this.angle2 += -4.2 * elapsed / 1000;
    }
    this._previousT = t;
    this.updateTransforms(this.layout);
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  onScroll() {
    const scrollTop = this._container.nativeElement.scrollTop;
    const clientHeight = this._container.nativeElement.clientHeight;

    for (let i = 0; i < this.config.items.length; i++) {
      this.layout[i].distance = scrollTop - i * this.itemTotalSize;
      const r = this.layout[i].distance / (this.itemTotalSize * 2);
      const k = (1 + Math.cos(Math.min(1, Math.abs(r)) * Math.PI)) / 2;

      this.layout[i].scale = 1 + (this.config.grow - 1) * k;
      this.layout[i].height = this.config.itemSize * this.layout[i].scale;
    }

    const a = Math.floor(scrollTop / this.itemTotalSize);
    const b = a + 1;

    const heightB = (b < this.config.items.length) ? this.layout[b].height : 0;

    const p = (scrollTop % this.itemTotalSize) / this.itemTotalSize;
    const dist = (this.layout[a].height + heightB) / 2 - this.config.itemSize;
    this.layout[a].translate = - p * dist;
    this.layout[b].translate = (1 - p) * dist;

    let current = this.layout[a].translate - (this.layout[a].height - this.config.itemSize) / 2;
    for (let i = a - 1; i >= 0; i--) {
      current -= (this.layout[i].height - this.config.itemSize) / 2;
      this.layout[i].translate = current;
      current -= (this.layout[i].height - this.config.itemSize) / 2;
    }

    current = this.layout[b].translate + (this.layout[b].height - this.config.itemSize) / 2;
    for (let i = b + 1; i < this.config.items.length; i++) {
      current += (this.layout[i].height - this.config.itemSize) / 2;
      this.layout[i].translate = current;
      current += (this.layout[i].height - this.config.itemSize) / 2;
    }

    this.updateTransforms(this.layout);

    for (let i = 0; i < this.config.items.length; i++) {
      const itemCenter = this.config.center + this.layout[i].translate + this.itemTotalSize * i - scrollTop;
      const normalizedCenter = itemCenter / clientHeight;
      this.layout[i].isInViewport = normalizedCenter > 0.2 && normalizedCenter < 0.8;
    }
  }

  private updateTransforms(layout: Layout[]) {
    const backgroundScale = 8;

    for (let i = 0; i < this.config.items.length; i++) {

      const transform = `translateY(${layout[i].translate}px) scale(${layout[i].scale})`;

      this.layout[i].transform = this._sanitizer.bypassSecurityTrustStyle(transform);
      const normalizedDistance = layout[i].distance / this.itemTotalSize;
      const parallaxTranslate = normalizedDistance * this.itemTotalSize * 0.5;

      const backgroundTransform =
        `translateX(-50%)` +
        `translateZ(-2em)` +
        `translateY(${-parallaxTranslate}px)` +
        `rotateZ(${this.angle1}deg)` +
        `scale(${backgroundScale / layout[i].scale})`;

      layout[i].backgroundTransform = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);

      const actionTransform = ` translateX(-50%) scale(${1 / layout[i].scale})`;
      layout[i].actionsTransform = this._sanitizer.bypassSecurityTrustStyle(actionTransform);
    }

  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
