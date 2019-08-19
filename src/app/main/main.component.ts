import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CarouselConfig } from '../carouselconfig';
import { Utils } from '../utils';
import { Layout } from '../layout';
import { CarouselUtils } from '../carouselutils';

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

  @ViewChild('carousel', { static: false })
  private _carousel: ElementRef<HTMLElement>;

  public itemSizeStyle: string;

  public scrollPaddingTop: string;
  public scrollPaddingBottom: string;
  public layout: Layout[] = [];

  public margins: string[] = [];

  private _previousT: number;
  public scrollBackgroundTransform: SafeStyle;
  public scrollBackgroundHeightStyle: string;

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
    // On safari, using container.clientHeight gives the wrong value, for some reason
    const viewportHeight = window.innerHeight;

    this.margins = new Array(this.config.items.length);
    this.margins[0] = `${this.config.center - this.config.itemSize / 2}px 0 0 0`;
    for (let i = 1; i < this.config.items.length - 1; i++) {
      this.margins[i] = `${this.config.spacing}px 0 0 0`;
    }
    this.margins[this.config.items.length - 1] =
      `${this.config.spacing}px 0 ${viewportHeight - this.config.center - this.config.itemSize / 2}px 0`;

    this.scrollPaddingTop = `${this.config.center - this.config.itemSize / 2}px`;
    this.scrollPaddingBottom = `${viewportHeight - this.config.center - this.config.itemSize / 2}px`;


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
    // this.scrollContainerHeight = this.itemTotalSize * (this.config.items.length - 1) + viewportHeight;
    // this.scrollContainerHeightStyle = this._sanitizer.bypassSecurityTrustStyle(this.scrollContainerHeight + 'px');
    this.scrollBackgroundHeightStyle = 10000 + 'px';


    this.handleScroll();

    // requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private animate(t: number) {

    if (this._previousT) {
      const elapsed = t - this._previousT;
      this.angle1 += 3.5 * elapsed / 1000;
      this.angle2 += -4.2 * elapsed / 1000;
    }
    this._previousT = t;
    CarouselUtils.updateTransforms(this.layout, this.config, this._sanitizer, this.angle1);
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  public handleScroll() {
    CarouselUtils.handleScroll(this.layout, this.config, this._carousel.nativeElement.scrollTop);
    CarouselUtils.updateTransforms(this.layout, this.config, this._sanitizer, this.angle1);

    this.scrollBackgroundTransform = this._sanitizer.bypassSecurityTrustStyle(
      `translateY(${this.layout[0].center}px)` +
      'translateZ(-3em)'
    );

    this._changeDetector.detectChanges();
  }

  public openUrl(url: string) {
    window.location.href = url;
  }
}
