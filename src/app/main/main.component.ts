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


    for (let i = 0; i < this.config.items.length; i++) {

      this.layout[i].virtualCenter = this.config.center + this.itemTotalSize * i;
      this.layout[i].virtualTop = this.layout[i].virtualCenter - this.config.itemSize / 2;
      this.layout[i].virtualTopStyle = this.layout[i].virtualTop + 'px';
    }

    const c = document.createElement('canvas');
    for (let i = 0; i < this.config.items.length; i++) {
      const img = new Image();
      img.onload = () => {
        console.log('Blurring ' + this.config.items[i].image);
        this.layout[i].background = Utils.prepareBackground(img, c, this.config.blurRadius, this.config.backgroundFadeRadius);
        this.layout[i].foreground = Utils.fadeEdges(img, c, 0, 640);
      };
      img.src = this.config.items[i].image;
    }

    this.handleScroll(this._container.nativeElement.scrollTop);

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

  handleScroll(scrollTop: number) {
    if (!scrollTop) {
      scrollTop = this._container.nativeElement.scrollTop;
    }

    for (let i = 0; i < this.config.items.length; i++) {
      this.layout[i].distance = scrollTop - i * this.itemTotalSize;
      const normalizedDistance = this.layout[i].distance / this.itemTotalSize;
      const spread = 2;
      const k = (1 + Math.cos(Math.min(1, Math.abs(normalizedDistance / spread)) * Math.PI)) / 2;

      this.layout[i].scale = 1 + (this.config.grow - 1) * k;
      this.layout[i].height = this.itemTotalSize * this.layout[i].scale;
    }

    const a = Utils.clamp(Math.floor(scrollTop / this.itemTotalSize + 0.5), 0, this.config.items.length - 1);

    const p = Utils.clamp(this.layout[a].distance / this.itemTotalSize, -0.5, 0.5);

    const pushA = (this.layout[a].height - this.itemTotalSize) * p;
    const centerA = this.config.center + a * this.itemTotalSize - pushA;
    this.layout[a].center = centerA;
    this.layout[a].translate = this.layout[a].center - this.layout[a].virtualCenter;

    let current = centerA - this.layout[a].height / 2;
    for (let i = a - 1; i >= 0; i--) {
      current -= this.layout[i].height / 2;
      this.layout[i].center = current;
      this.layout[i].translate = this.layout[i].center - this.layout[i].virtualCenter;
      current -= this.layout[i].height / 2;
    }

    current = centerA + this.layout[a].height / 2;
    for (let i = a + 1; i < this.config.items.length; i++) {
      current += this.layout[i].height / 2;
      this.layout[i].center = current;
      this.layout[i].translate = this.layout[i].center - this.layout[i].virtualCenter;
      current += this.layout[i].height / 2;
    }

    this.updateTransforms(this.layout);

    for (let i = 0; i < this.config.items.length; i++) {
      const normalizedDistance = this.layout[i].distance / this.itemTotalSize;
      this.layout[i].isInViewport = Math.abs(normalizedDistance) < 1.5;
    }

    // this.scrollBackgroundTransform = this._sanitizer.bypassSecurityTrustStyle(
    //   `translateY(${this.layout[0].center}px)` +
    //   'translateZ(-3em)'
    // );

    this._changeDetector.detectChanges();
  }

  // private updateTransforms(layout: Layout[]) {
  //   const backgroundScale = 8;

  //   for (let i = 0; i < this.config.items.length; i++) {

  //     const transform = `translateY(${layout[i].translate}px) scale(${layout[i].scale})`;

  //     this.layout[i].transform = this._sanitizer.bypassSecurityTrustStyle(transform);
  //     const normalizedDistance = layout[i].distance / this.itemTotalSize;
  //     const parallaxTranslate = normalizedDistance * this.itemTotalSize * 0.5;

  //     const backgroundTransform =
  //       `translateX(-50%)` +
  //       `translateZ(-2em)` +
  //       `translateY(${-parallaxTranslate}px)` +
  //       `rotateZ(${this.angle1}deg)` +
  //       `scale(${backgroundScale / layout[i].scale})`;

  //     layout[i].backgroundTransform = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);

  //     const actionTransform = ` translateX(-50%) scale(${1 / layout[i].scale})`;
  //     layout[i].actionsTransform = this._sanitizer.bypassSecurityTrustStyle(actionTransform);
  //   }

  // }

  private updateTransforms(layout: Layout[]) {
    const backgroundScale = 8;

    for (let i = 0; i < this.config.items.length; i++) {

      const transform =
        // `translateY(${-this.config.itemSize / 2}px)` +
        `translateY(${layout[i].translate}px)` +
        `translateZ(-1em)` +
        `scale(${layout[i].scale})`;

      layout[i].transform = this._sanitizer.bypassSecurityTrustStyle(transform);
      const normalizedDistance = layout[i].distance / this.itemTotalSize;
      const parallaxTranslate = normalizedDistance * this.itemTotalSize * 0.5;

      const backgroundTransform =
        `translateY(-50%)` +
        `translateX(-50%)` +
        `translateZ(-2em)` +
        `translateY(${-parallaxTranslate}px)` +
        `rotateZ(${this.angle1}deg)` +
        `scale(${backgroundScale})` +
        `scale( ${1 / layout[i].scale})`;

      layout[i].backgroundTransform = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);

      const actionTransform = ` translateX(-50%) scale(${1 / layout[i].scale})`;
      layout[i].actionsTransform = this._sanitizer.bypassSecurityTrustStyle(actionTransform);
    }

  }


  public openUrl(url: string) {
    window.location.href = url;
  }
}
