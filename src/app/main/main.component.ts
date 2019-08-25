import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CarouselOptions } from '../carouseloptions';
import { Layout } from '../layout';
import { Flare } from '../flare';
import { CarouselService } from '../carousel.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, AfterViewInit {

  // inputs
  public config: CarouselOptions = CarouselOptions.default();

  // -------------
  public sectionContentHeight = this.config.sectionHeight - this.config.padding;

  public angle1 = 0;
  public angle2 = -63;

  @ViewChild('carousel', { static: false })
  private _carousel: ElementRef<HTMLElement>;

  public scrollPaddingTop: string;
  public scrollPaddingBottom: string;
  public layout: Layout[] = [];
  public polygons: [number, number][][];

  public showCenter = false;
  public animateBackground = true;

  private _previousScrollTop: number;

  public flares = [
    new Flare(
      { x: -this.config.contentWidth, y: 80 },
      'assets/flare5.jpg',
      this.config.padding,
      1.5),
    new Flare(
      { x: this.config.contentWidth, y: this.config.center + this.config.sectionHeight * this.config.grow * 0.5 },
      'assets/flare5.jpg',
      this.config.padding,
      1.2),
    new Flare(
      { x: -this.config.contentWidth / 2, y: this.config.center + this.config.sectionHeight * this.config.grow },
      'assets/flare5.jpg',
      this.config.padding,
      1)
  ];

  constructor(
    private _carouselService: CarouselService,
    private _changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute) {

    this.layout = new Array(this.config.sections.length);
    for (let i = 0; i < this.layout.length; i++) {
      this.layout[i] = new Layout();
    }
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;

    this.showCenter = this.getBooleanOrDefault(params, 'showcenter', false);
    this.animateBackground = this.getBooleanOrDefault(params, 'animatebackground', true);
  }

  ngAfterViewInit() {
    // On safari, using container.clientHeight gives the wrong value, for some reason
    const viewportHeight = window.innerHeight;

    this.scrollPaddingTop = `${this.config.center - this.config.sectionHeight / 2}px`;
    this.scrollPaddingBottom = `${viewportHeight - this.config.center - this.config.sectionHeight / 2}px`;

    for (let i = 0; i < this.config.sections.length; i++) {
      this.layout[i].virtualCenter = this.config.center + this.config.sectionHeight * i;
      this.layout[i].virtualTop = this.layout[i].virtualCenter - this.config.sectionHeight / 2;
      this.layout[i].virtualTopStyle = this.layout[i].virtualTop + 'px';
    }

    this._changeDetector.detectChanges();

    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private animate(t: number) {


    const scrollTop = this._carousel.nativeElement.scrollTop;

    if (scrollTop !== this._previousScrollTop) {
      this._carouselService.handleScroll(this.layout, this.config, this._carousel.nativeElement.scrollTop);

      this._carouselService.updateTransforms(this.layout, this.config, this.angle1);
      this._carouselService.updateBackgroundTransforms(this.layout, this.config, this.angle1);
      this.polygons = this._carouselService.getPolygons(this.layout, this.config, scrollTop);
    }

    if (this.animateBackground) {
      this.angle1 = t * 3.6 / 1000;
      this._carouselService.updateBackgroundTransforms(this.layout, this.config, this.angle1);
    }

    this._previousScrollTop = scrollTop;
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private getBooleanOrDefault(map: ParamMap, key: string, defaultValue: boolean): boolean {
    if (!map.has(key)) {
      return defaultValue;
    }

    return map.get(key) === 'true';
  }
}
