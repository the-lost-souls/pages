import { Component, OnInit, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

import * as p from 'polygon-tools';
// For some reason, using p directly doesn't compile
const polygonTools: any = p;

export class LensFlareOptions {
  constructor(
    public size: number = 10,
    public image: string = '',
    public imageScale: number = 1) { }
}

@Component({
  selector: 'app-lensflare',
  templateUrl: './lensflare.component.html',
  styleUrls: ['./lensflare.component.sass']
})
export class LensflareComponent implements OnInit {

  private _flarePolygon: [number, number][];
  private _position: { x: number, y: number };

  @Input()
  public set position(value: { x: number, y: number }) {

    const xMin = value.x - this.size / 2;
    const xMax = value.x + this.size / 2;
    const yMin = value.y - this.size / 2;
    const yMax = value.y + this.size / 2;

    this._flarePolygon = [[xMin, yMin], [xMax, yMin], [xMax, yMax], [xMin, yMax]];
    this._position = value;
    this.updateTransform();
  }

  public get position(): { x: number, y: number } {
    return this._position;
  }

  private _polygons: [number, number][][] = [];

  @Input()
  public set polygons(value: [number, number][][]) {
    this._polygons = value;
    this.updateTransform();
  }

  public get polygons(): [number, number][][] {
    return this._polygons;
  }

  @Input()
  image = '';

  @Input()
  size = 10;

  @Input()
  imageScale = 1;

  public transform: SafeStyle;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() { }

  private updateTransform(): void {

    let visibility = 1;
    if (this._flarePolygon && this._polygons && this.polygons.length > 0) {
      const visibleFlare = polygonTools.polygon.subtract(this._flarePolygon, ...this.polygons)[0];
      const visibleArea = visibleFlare ? polygonTools.polygon.area(visibleFlare) : 0;
      visibility = visibleFlare ? visibleArea / Math.pow(this.size, 2) : 0;
    }

    const transform =
      `translateZ(1em)` +
      `translateX(-50%)` +
      `translateY(-50%)` +
      `translateY(${this.position.y}px)` +
      `translateX(${this.position.x}px)` +
      `scale(${visibility * this.imageScale})`;

    this.transform = this._sanitizer.bypassSecurityTrustStyle(transform);
  }
}
