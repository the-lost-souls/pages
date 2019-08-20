import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { CarouselConfig } from '../carouselconfig';
import { config } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { throttleTime } from 'rxjs/operators';
import { Utils } from '../utils';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Layout } from '../layout';
import { CarouselUtils } from '../carouselutils';
import { Flare } from '../flare';



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
  public isHeaderVisible = true;
  public scrollBackgroundTransform: SafeStyle;
  public scrollBackgroundHeightStyle: string;
  private _previousT: number;
  private _previousScrollTop: number;

  public flares = [
    new Flare(-this.contentWidth, 80, this.config.spacing, 1.5),
    new Flare(this.contentWidth, this.config.center + this.itemTotalSize * this.config.grow * 0.5, this.config.spacing, 1.2),
    new Flare(-this.contentWidth / 2, this.config.center + this.itemTotalSize * this.config.grow, this.config.spacing, 1)
  ];
  // public flare = new Flare(200, this.config.center + this.itemTotalSize * this.config.grow * 0.5, 20);

  // private _onScrollThrottled: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('carousel', { static: false })
  private _carousel: ElementRef<HTMLElement>;

  constructor(private _changeDetector: ChangeDetectorRef, private _sanitizer: DomSanitizer) {
    this.layout = new Array(this.config.sections.length);
    for (let i = 0; i < this.layout.length; i++) {
      this.layout[i] = new Layout();
    }

    // this._onScrollThrottled
    //   .pipe(throttleTime(1000 / 60, undefined, { leading: true, trailing: true }))
    //   .subscribe(() => this.handleScroll(this._container.nativeElement.scrollTop));
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // On safari, using container.clientHeight gives the wrong value, for some reason
    const viewportHeight = window.innerHeight;

    this.scrollContainerHeight = this.itemTotalSize * (this.config.sections.length - 1) + viewportHeight;
    this.scrollContainerHeightStyle = this._sanitizer.bypassSecurityTrustStyle(this.scrollContainerHeight + 'px');

    for (let i = 0; i < this.config.sections.length; i++) {

      this.layout[i].virtualCenter = 0;
      this.layout[i].virtualTop = this.layout[i].virtualCenter - this.config.itemSize / 2;
      this.layout[i].virtualTopStyle = this.layout[i].virtualTop + 'px';
    }

    const c = document.createElement('canvas');
    for (let i = 0; i < this.config.sections.length; i++) {
      const img = new Image();
      img.onload = () => {
        console.log('Blurring ' + this.config.sections[i].image);
        this.layout[i].background = Utils.prepareBackground(img, c, this.config.blurRadius, this.config.backgroundFadeRadius);
        this.layout[i].foreground = Utils.fadeEdges(img, c, 0, 640);
      };
      img.src = this.config.sections[i].image;
    }


    this.scrollBackgroundHeightStyle = (this.scrollContainerHeight - this.config.center) + 'px';

    // this._changeDetector.detectChanges();

    CarouselUtils.handleScroll(this.layout, this.config, this._carousel.nativeElement.scrollTop);
    CarouselUtils.updateTransforms(this.layout, this.config, this._sanitizer, this.angle1);
    this._changeDetector.detectChanges();
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private animate(t: number) {

    if (this._previousT) {
      const elapsed = t - this._previousT;
      this.angle1 += 3.5 * elapsed / 1000;
    }

    const scrollTop = this._carousel.nativeElement.scrollTop;

    if (scrollTop !== this._previousScrollTop) {
      CarouselUtils.handleScroll(this.layout, this.config, this._carousel.nativeElement.scrollTop);

      CarouselUtils.updateFlares(scrollTop, this.layout, this.flares, this.config, this._sanitizer);
    }
    this._previousScrollTop = scrollTop;
    this._previousT = t;
    CarouselUtils.updateTransforms(this.layout, this.config, this._sanitizer, this.angle1);
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  // onScroll() {
  //   this._onScrollThrottled.next();
  // }

  // handleScroll(scrollTop: number) {

  //   for (let i = 0; i < this.config.items.length; i++) {
  //     this.layout[i].distance = scrollTop - i * this.itemTotalSize;
  //     const normalizedDistance = this.layout[i].distance / this.itemTotalSize;
  //     const spread = 2;
  //     const k = (1 + Math.cos(Math.min(1, Math.abs(normalizedDistance / spread)) * Math.PI)) / 2;

  //     this.layout[i].scale = 1 + (this.config.grow - 1) * k;
  //     this.layout[i].height = this.itemTotalSize * this.layout[i].scale;
  //   }

  //   const a = Utils.clamp(Math.floor(scrollTop / this.itemTotalSize + 0.5), 0, this.config.items.length - 1);

  //   const p = Utils.clamp(this.layout[a].distance / this.itemTotalSize, -0.5, 0.5);

  //   const pushA = (this.layout[a].height - this.itemTotalSize) * p;
  //   const centerA = this.config.center + a * this.itemTotalSize - pushA;
  //   this.layout[a].center = centerA;

  //   let current = centerA - this.layout[a].height / 2;
  //   for (let i = a - 1; i >= 0; i--) {
  //     current -= this.layout[i].height / 2;
  //     this.layout[i].center = current;
  //     current -= this.layout[i].height / 2;
  //   }

  //   current = centerA + this.layout[a].height / 2;
  //   for (let i = a + 1; i < this.config.items.length; i++) {
  //     current += this.layout[i].height / 2;
  //     this.layout[i].center = current;
  //     current += this.layout[i].height / 2;
  //   }

  //   this.updateTransforms(this.layout);

  //   for (let i = 0; i < this.config.items.length; i++) {
  //     const normalizedDistance = this.layout[i].distance / this.itemTotalSize;
  //     this.layout[i].isInViewport = Math.abs(normalizedDistance) < 1.5;
  //   }

  //   this.scrollBackgroundTransform = this._sanitizer.bypassSecurityTrustStyle(
  //     `translateY(${this.layout[0].center}px)` +
  //     'translateZ(-3em)'
  //   );

  //   this._changeDetector.detectChanges();
  // }

  // private updateTransforms(layout: Layout[]) {
  //   const backgroundScale = 8;

  //   for (let i = 0; i < this.config.items.length; i++) {

  //     const transform =
  //       `translateY(${-this.config.itemSize / 2}px)` +
  //       `translateY(${layout[i].center}px)` +
  //       `translateZ(-1em)` +
  //       `scale(${layout[i].scale})`;

  //     layout[i].transform = this._sanitizer.bypassSecurityTrustStyle(transform);
  //     const normalizedDistance = layout[i].distance / this.itemTotalSize;
  //     const parallaxTranslate = normalizedDistance * this.itemTotalSize * 0.5;

  //     const backgroundTransform =
  //       `translateY(-50%)` +
  //       `translateX(-50%)` +
  //       `translateZ(-2em)` +
  //       `translateY(${-parallaxTranslate}px)` +
  //       `rotateZ(${this.angle1}deg)` +
  //       `scale(${backgroundScale})` +
  //       `scale( ${1 / layout[i].scale})`;

  //     layout[i].backgroundTransform = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);

  //     const actionTransform = ` translateX(-50%) scale(${1 / layout[i].scale})`;
  //     layout[i].actionsTransform = this._sanitizer.bypassSecurityTrustStyle(actionTransform);
  //   }

  // }

  public openUrl(url: string) {
    window.location.href = url;
  }


}
