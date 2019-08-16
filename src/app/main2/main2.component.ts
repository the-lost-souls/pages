import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { CarouselConfig } from '../carouselconfig';
import { config } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { throttleTime } from 'rxjs/operators';
import { Utils } from '../utils';
import { trigger, state, style, transition, animate } from '@angular/animations';


class Layout {

  public virtualCenter = 0;
  public virtualTop = 0;
  public virtualTopStyle = '';
  public scale: number;
  public center: number;
  public distance: number;
  public height: number;
  public transform: SafeStyle;
  public backgroundTransform: SafeStyle;
  public actionsTransform: SafeStyle;
  public background: string;
  public foreground: string;
  public isInViewport: boolean;
}

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.sass'],
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
export class Main2Component implements OnInit, AfterViewInit {
  // inputs
  public config: CarouselConfig = CarouselConfig.default();

  // derived
  public itemSizeStyle = this.config.itemSize + 'px';
  public itemTotalSize = this.config.itemSize + this.config.spacing;
  public contentWidth = this.config.itemSize * 2;
  public contentWidthStyle = this.contentWidth + 'px';
  public scrollContainerHeight = 0;
  public scrollContainerHeightStyle: SafeStyle;
  public itemCenters: number[] = [];
  public layout: Layout[] = [];
  public angle1 = 0;
  private _previousT: number;

  private _onScrollThrottled: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('container', { static: false })
  private _container: ElementRef<HTMLElement>;

  constructor(private _changeDetector: ChangeDetectorRef, private _sanitizer: DomSanitizer) {
    this.layout = new Array(this.config.items.length);
    for (let i = 0; i < this.layout.length; i++) {
      this.layout[i] = new Layout();
    }
    this._onScrollThrottled
      .pipe(throttleTime(1000 / 60, undefined, { leading: true, trailing: true }))
      .subscribe(() => this.handleScroll());
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.scrollContainerHeight = this.itemTotalSize * (this.config.items.length - 1) + this._container.nativeElement.clientHeight;
    this.scrollContainerHeightStyle = this._sanitizer.bypassSecurityTrustStyle(this.scrollContainerHeight + 'px');

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

    this.handleScroll();

    this._changeDetector.detectChanges();

    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private animate(t: number) {

    if (this._previousT) {
      const elapsed = t - this._previousT;
      this.angle1 += 3.5 * elapsed / 1000;
      // this.angle2 += -4.2 * elapsed / 1000;
    }
    this._previousT = t;
    this.updateTransforms(this.layout);
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  onScroll() {
    this._onScrollThrottled.next();
  }

  handleScroll() {
    const scrollTop = this._container.nativeElement.scrollTop;

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

    let current = centerA - this.layout[a].height / 2;
    for (let i = a - 1; i >= 0; i--) {
      current -= this.layout[i].height / 2;
      this.layout[i].center = current;
      current -= this.layout[i].height / 2;
    }

    current = centerA + this.layout[a].height / 2;
    for (let i = a + 1; i < this.config.items.length; i++) {
      current += this.layout[i].height / 2;
      this.layout[i].center = current;
      current += this.layout[i].height / 2;
    }

    this.updateTransforms(this.layout);

    for (let i = 0; i < this.config.items.length; i++) {
      const normalizedDistance = this.layout[i].distance / this.itemTotalSize;
      this.layout[i].isInViewport = Math.abs(normalizedDistance) < 1.5;
    }
    this._changeDetector.detectChanges();
  }

  private updateTransforms(layout: Layout[]) {
    const backgroundScale = 8;

    for (let i = 0; i < this.config.items.length; i++) {

      const transform =
        `translateY(${-this.config.itemSize / 2}px)` +
        `translateY(${layout[i].center}px)` +
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
        `scale( ${ 1 / layout[i].scale})`;

      layout[i].backgroundTransform = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);

      const actionTransform = ` translateX(-50%) scale(${1 / layout[i].scale})`;
      layout[i].actionsTransform = this._sanitizer.bypassSecurityTrustStyle(actionTransform);
    }

  }

  public openUrl(url: string) {
    window.location.href = url;
  }


}
