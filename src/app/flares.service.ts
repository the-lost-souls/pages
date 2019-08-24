import { Injectable } from '@angular/core';
import { Layout } from './layout';
import { Flare } from './flare';
import { CarouselOptions } from './carouseloptions';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from './utils';

import * as p from 'polygon-tools';

// no idea why this line is necessary
const polygonTools: any = p;

@Injectable({
  providedIn: 'root'
})
export class FlaresService {

  constructor(private _sanitizer: DomSanitizer) { }

  public updateFlares(polygons: [number, number][][], flares: Flare[]) {

    for (const flare of flares) {

      const xMin = flare.x - flare.size / 2;
      const xMax = flare.x + flare.size / 2;
      const yMin = flare.y - flare.size / 2;
      const yMax = flare.y + flare.size / 2;
      const flarePolygon = [[xMin, yMin], [xMax, yMin], [xMax, yMax], [xMin, yMax]];

      let visibility = 0;
      const r = polygonTools.polygon.subtract(flarePolygon, ...polygons);
      const coveredFlarePolygon = polygonTools.polygon.subtract(flarePolygon, ...polygons)[0];
      if (coveredFlarePolygon) {
        const uncoveredArea = polygonTools.polygon.area(coveredFlarePolygon);
        visibility = flare.scale * uncoveredArea / Math.pow(flare.size, 2);
      }

      const transform =
        `translateZ(1em)` +
        `translateX(-50%)` +
        `translateY(-50%)` +
        `translateY(${flare.y}px)` +
        `translateX(${flare.x}px)` +
        `scale(${visibility})`;

      flare.transform = this._sanitizer.bypassSecurityTrustStyle(transform);
    }
  }
}
