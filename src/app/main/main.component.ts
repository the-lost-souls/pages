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
  public options: CarouselOptions = CarouselOptions.default();

  // -------------
  public sectionContentHeight = this.options.sectionHeight - this.options.padding * 2;

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

  public flares = CarouselOptions.flares(this.options);

  constructor(
    private _carouselService: CarouselService,
    private _changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute) {

    this.layout = new Array(this.options.sections.length);
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

    this.scrollPaddingTop = `${this.options.center - this.options.sectionHeight / 2}px`;
    this.scrollPaddingBottom = `${viewportHeight - this.options.center - this.options.sectionHeight / 2}px`;

    for (let i = 0; i < this.options.sections.length; i++) {
      this.layout[i].virtualCenter = this.options.center + this.options.sectionHeight * i;
      this.layout[i].virtualTop = this.layout[i].virtualCenter - this.options.sectionHeight / 2;
      this.layout[i].virtualTopStyle = this.layout[i].virtualTop + 'px';
    }

    this._changeDetector.detectChanges();

    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private animate(t: number) {
    const scrollTop = this._carousel.nativeElement.scrollTop;

    const width = this._carousel.nativeElement.clientWidth;
    const height = this.options.sectionHeight * this.options.grow;

    const k = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const backgroundScale = 1.3 * k / 256; // add 20% to compensate for parralax


    if (scrollTop !== this._previousScrollTop) {
      this._carouselService.handleScroll(this.layout, this.options, this._carousel.nativeElement.scrollTop);

      this._carouselService.updateTransforms(this.layout, this.options, this.angle1);
      this._carouselService.updateBackgroundTransforms(this.layout, this.options, this.angle1, backgroundScale);
      this.polygons = this._carouselService.getPolygons(this.layout, this.options, scrollTop);
    }

    if (this.animateBackground) {
      this.angle1 = t * 3.6 / 1000;
      this._carouselService.updateBackgroundTransforms(this.layout, this.options, this.angle1, backgroundScale);
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
