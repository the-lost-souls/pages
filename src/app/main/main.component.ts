import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import * as IsMobile from 'is-mobile';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface CarouselItem {
  image: string;
  title: string;
  year: number;
  youtube: string;
  pouet: string;
  github: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  animations: [
    trigger('showHideContent', [
      state('true', style({
        opacity: '1'
      })),
      state('false', style({
        opacity: '0'
      })),
      transition('false => true', [
        animate('0.5s ease-out')
      ]),
      transition('true => false', [
        animate('0.1s ease-in')
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
  public itemTotalSize = this.itemSize + this.itemSpacing;

  content: CarouselItem[] = [
    {
      image: 'assets/iv.jpg',
      title: 'IV - Racer',
      year: 2002,
      youtube: 'https://www.youtube.com/watch?v=mHV_oIYZyEg',
      pouet: 'http://www.pouet.net/prod.php?which=5555',
      github: 'https://github.com/the-lost-souls/IV'
    },
    {
      image: 'assets/anytime.jpg',
      title: 'Anytime',
      year: 2001,
      youtube: 'https://www.youtube.com/watch?v=_ubBTbGcLv8',
      pouet: 'http://www.pouet.net/prod.php?which=4244',
      github: 'https://github.com/the-lost-souls/anytime'
    },
    {
      image: 'assets/III.jpg',
      title: 'III - Live tomorrow',
      year: 1999,
      youtube: 'https://youtu.be/rMkFe3xxZmA',
      pouet: 'http://www.pouet.net/prod.php?which=5919',
      github: 'https://github.com/the-lost-souls/III'
    },
    {
      image: 'assets/cucumber01.png',
      title: 'Cucumber Slumber',
      year: 1999,
      youtube: 'https://youtu.be/ClB6vvaWzMg',
      pouet: 'https://www.pouet.net/prod.php?which=81547',
      github: null
    },
    {
      image: 'assets/FYH.jpg',
      title: 'Follow your Heart',
      year: 1999,
      youtube: 'https://youtu.be/AAPkby4EDQY',
      pouet: 'https://www.pouet.net/prod.php?which=81546',
      github: null
    },
    {
      image: 'assets/II.jpg',
      title: 'II',
      year: 1998,
      youtube: 'https://youtu.be/stSv0y_zg1o',
      pouet: 'http://www.pouet.net/prod.php?which=5923',
      github: 'https://github.com/the-lost-souls/II'
    },
    {
      image: 'assets/pgp.gif',
      title: 'pgp',
      year: 1997,
      youtube: 'https://youtu.be/Fg-FixaV6ws',
      pouet: 'http://www.pouet.net/prod.php?which=15848',
      github: 'https://github.com/the-lost-souls/pgp'
    },
    {
      image: 'assets/mom02.png',
      title: 'Mind over Matter',
      year: 1996,
      youtube: 'https://youtu.be/UtopQ09WZ9c',
      pouet: 'http://www.pouet.net/prod.php?which=58683',
      github: 'https://github.com/the-lost-souls/mind-over-matter'
    },
    {
      image: 'assets/pese01.png',
      title: 'PESE',
      year: 1996,
      youtube: 'https://youtu.be/OlRxaUWLNgU',
      pouet: null,
      github: null
    },
    {
      image: 'assets/time01.png',
      title: 'Time',
      year: 1996,
      youtube: 'https://youtu.be/AyIQb7SAhP0',
      pouet: 'http://www.pouet.net/prod.php?which=58684',
      github: 'https://github.com/the-lost-souls/time'
    },
    {
      image: 'assets/synthetic.png',
      title: 'Synthetic',
      year: 1995,
      youtube: 'https://youtu.be/tJvQbS8wOok',
      pouet: null,
      github: 'https://github.com/the-lost-souls/synthetic'
    },
    {
      image: 'assets/sorcerer.png',
      title: 'Sorcerer',
      year: 1995,
      youtube: 'https://youtu.be/F_KWflqlF1g',
      pouet: null,
      github: 'https://github.com/the-lost-souls/sorcerer'
    },
    {
      image: 'assets/tib.png',
      title: 'Tiß',
      year: 1994,
      youtube: 'https://youtu.be/Qd8WPVmYhX8',
      pouet: null,
      github: 'https://github.com/the-lost-souls/TiB'
    }
  ];


  // -------------
  public contentVisible = false;

  @ViewChild('carousel', {static: false})
  private _container: ElementRef<HTMLElement>;


  // item currently closest to center
  public currentItem = 0;

  // item focused when scroll stops
  public _focusedItem = 0;
  @Input() public set focusedItem(value: number) {

    if (this.focusedItem === value) {
      return;
    }
    this._focusedItem = value;
    this.focusedItemChange.next(this.focusedItem);
  }
  public get focusedItem(): number { return this._focusedItem; }
  @Output() public focusedItemChange: Subject<number> = new BehaviorSubject(this.focusedItem);

  public itemSizeStyle: string;

  public translate: number[] = [];
  public transforms: SafeStyle[] = [];

  public scrollPaddingTop: string;
  public scrollPaddingBottom: string;

  public margins: string[] = [];

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private sanitizer: DomSanitizer) {

      this.focusedItemChange.subscribe((value: number) => {
        this.contentVisible = (value != null) ? true : false;
      });
    }

  ngOnInit() {
    this.itemSizeStyle = `${this.itemSize}px`;
    this.transforms = new Array(this.content.length);
  }

  ngAfterViewInit() {
    this.margins = new Array(this.content.length);
    this.margins[0] = `${this.center - this.itemSize / 2}px 0 0 0`;
    for (let i = 1; i < this.content.length - 1; i++) {
      this.margins[i] = `${this.itemSpacing}px 0 0 0`;
    }
    this.margins[this.content.length - 1] = `${this.itemSpacing}px 0 ${this._container.nativeElement.clientHeight - this.center - this.itemSize / 2}px 0`;

    this.scrollPaddingTop = `${this.center - this.itemSize / 2}px`;
    this.scrollPaddingBottom = `${this._container.nativeElement.clientHeight - this.center - this.itemSize / 2}px`;

    this.onScroll();
    this._changeDetector.detectChanges();
  }

  setSelected(i: number) {
    this._container.nativeElement.scrollTo(0, i * this.itemSize);
  }

  getTransform(top: number, scale: number): SafeStyle {
    const transform = `translateY(${top}px) scale(${scale})`;
    return this.sanitizer.bypassSecurityTrustStyle(transform);
  }


  onScroll() {

    const heights: number[] = new Array(this.content.length);
    const scale: number[] = new Array(this.content.length);

    for (let i = 0; i < this.content.length; i++) {
      const scrollDistance = Math.abs(this._container.nativeElement.scrollTop - i * this.itemTotalSize);
      const k = Math.min(1, scrollDistance / (this.itemTotalSize * 2));

      scale[i] = 1 + (this.grow - 1) * (1 + Math.cos(k * Math.PI)) / 2;
      heights[i] = this.itemSize * scale[i];
    }

    const a = Math.floor(this._container.nativeElement.scrollTop / this.itemTotalSize);
    const b = a + 1;


    const p = (this._container.nativeElement.scrollTop % this.itemTotalSize) / this.itemTotalSize;
    const dist = (heights[a] + heights[b]) / 2 - this.itemSize;
    this.translate[a] = - p * dist;
    this.translate[b] = (1 - p) * dist;

    let current = this.translate[a] - (heights[a] - this.itemSize) / 2;
    for (let i = a - 1; i >= 0; i--) {
      current -= (heights[i] - this.itemSize) / 2;
      this.translate[i] = current;
      current -= (heights[i] - this.itemSize) / 2;
    }

    current = this.translate[b] + (heights[b] - this.itemSize) / 2;
    for (let i = b + 1; i < this.content.length; i++) {
      current += (heights[i] - this.itemSize) / 2;
      this.translate[i] = current;
      current += (heights[i] - this.itemSize) / 2;
    }

    for (let i = 0; i < this.content.length; i++) {
      this.transforms[i] = this.getTransform(this.translate[i], scale[i]);
    }

    this.currentItem = p < 0.5 ? a : b;
    this.currentItem = Math.min(this.currentItem, this.content.length - 1);
    if (this._container.nativeElement.scrollTop % this.itemTotalSize === 0) {
      this.focusedItem = this._container.nativeElement.scrollTop / this.itemTotalSize;
    } else {
      this.focusedItem = null;
    }
  }

  public openUrl(url: string) {
    window.location.href = url;
  }


}
