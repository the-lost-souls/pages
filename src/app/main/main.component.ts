import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import * as IsMobile from 'is-mobile';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Content } from './content';
import * as StackBlur from 'stackblur-canvas';

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
        animate('1s ease-out')
      ]),
      transition('true => false', [
        animate('1s ease-in')
      ])
    ])
  ]
})
export class MainComponent implements OnInit, AfterViewInit {

  // inputs
  public center = 250;
  public grow = 3;
  public itemSize: number = IsMobile.isMobile(navigator.userAgent) ? 75 : 100;
  public itemSpacing: number = IsMobile.isMobile(navigator.userAgent) ? 30 : 30;
  public items = Content.content;

  // -------------
  public itemTotalSize = this.itemSize + this.itemSpacing;

  @ViewChild('container', { static: false })
  private _container: ElementRef<HTMLElement>;

  public itemSizeStyle: string;

  public transform: SafeStyle[] = [];
  public backgroundTransform: SafeStyle[] = [];

  public scrollPaddingTop: string;
  public scrollPaddingBottom: string;
  public blurredImages: string[] = [];

  public margins: string[] = [];

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _sanitizer: DomSanitizer) {

    this.transform = new Array(this.items.length);
    this.backgroundTransform = new Array(this.items.length);

  }

  blur(img: HTMLImageElement, canvas: HTMLCanvasElement, radius: number): string {
    const w = 512;
    const h = 512;

    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, w, h);
    StackBlur.canvasRGBA(canvas, 0, 0, w, h, radius);
    const imageData = context.getImageData(0, 0, w, h);

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

  ngOnInit() {
    this.itemSizeStyle = `${this.itemSize}px`;
  }

  ngAfterViewInit() {
    this.margins = new Array(this.items.length);
    this.margins[0] = `${this.center - this.itemSize / 2}px 0 0 0`;
    for (let i = 1; i < this.items.length - 1; i++) {
      this.margins[i] = `${this.itemSpacing}px 0 0 0`;
    }
    this.margins[this.items.length - 1] =
      `${this.itemSpacing}px 0 ${this._container.nativeElement.clientHeight - this.center - this.itemSize / 2}px 0`;

    this.scrollPaddingTop = `${this.center - this.itemSize / 2}px`;
    this.scrollPaddingBottom = `${this._container.nativeElement.clientHeight - this.center - this.itemSize / 2}px`;

    const c = document.createElement('canvas');
    for (let i = 0; i < this.items.length; i++) {
      const img = new Image();
      img.onload = () => {
        console.log('Blurring ' + this.items[i].image);
        this.blurredImages[i] = this.blur(img, c, 5);
      };
      img.src = this.items[i].image;
    }

    this.onScroll();

    this._changeDetector.detectChanges();
  }

  onScroll() {
    const scrollTop = this._container.nativeElement.scrollTop;

    const height: number[] = new Array(this.items.length);
    const scale: number[] = new Array(this.items.length);
    const translate: number[] = new Array(this.items.length);
    const distance: number[] = new Array(this.items.length);

    for (let i = 0; i < this.items.length; i++) {
      distance[i] = scrollTop - i * this.itemTotalSize;
      const r = distance[i] / (this.itemTotalSize * 2);
      const k = (1 + Math.cos(Math.min(1, Math.abs(r)) * Math.PI)) / 2;

      scale[i] = 1 + (this.grow - 1) * k;
      height[i] = this.itemSize * scale[i];
    }

    const a = Math.floor(scrollTop / this.itemTotalSize);
    const b = a + 1;

    const heightB = (b < this.items.length) ? height[b] : 0;

    const p = (scrollTop % this.itemTotalSize) / this.itemTotalSize;
    const dist = (height[a] + heightB) / 2 - this.itemSize;
    translate[a] = - p * dist;
    translate[b] = (1 - p) * dist;

    let current = translate[a] - (height[a] - this.itemSize) / 2;
    for (let i = a - 1; i >= 0; i--) {
      current -= (height[i] - this.itemSize) / 2;
      translate[i] = current;
      current -= (height[i] - this.itemSize) / 2;
    }

    current = translate[b] + (height[b] - this.itemSize) / 2;
    for (let i = b + 1; i < this.items.length; i++) {
      current += (height[i] - this.itemSize) / 2;
      translate[i] = current;
      current += (height[i] - this.itemSize) / 2;
    }

    const backgroundScale = 20;

    for (let i = 0; i < this.items.length; i++) {

      const transform = `translateY(${translate[i]}px) scale(${scale[i]})`;

      this.transform[i] = this._sanitizer.bypassSecurityTrustStyle(transform);
      const normalizedDistance = distance[i] / this.itemTotalSize;
      const parallaxTranslate = normalizedDistance * this.itemTotalSize * 0.5;

      const backgroundTransform =
        `translateX(-50%)` +
        `translateZ(-2em)` +
        `translateY(${-parallaxTranslate}px)` +
        `scale(${backgroundScale / scale[i]})`;

      this.backgroundTransform[i] = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);
    }
  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
