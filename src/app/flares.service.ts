import { Injectable } from '@angular/core';
import { Layout } from './layout';
import { Flare } from './flare';
import { CarouselConfig } from './carouselconfig';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class FlaresService {

  constructor() { }

  public updateFlares(scrollTop: number, layout: Layout[], flares: Flare[], config: CarouselConfig, sanitizer: DomSanitizer, ) {

    for (const flare of flares) {
      const y0 = (flare.y + scrollTop) - flare.size / 2;
      const y1 = y0 + flare.size;

      let line: [number, number] = [y0, y1];
      for (const l of layout) {

        const itemHeight = config.itemSize * l.scale;
        const sectionTop = l.center - itemHeight / 2;
        const sectionBottom = l.center + itemHeight / 2;

        line = Utils.subtractRange(line, [sectionTop, sectionBottom]);
      }

      const visibility = flare.scale * (line[1] - line[0]) / flare.size;

      const transform =
        `translateZ(1em)` +
        `translateX(-50%)` +
        `translateY(-50%)` +
        `translateY(${flare.y}px)` +
        `translateX(${flare.x}px)` +
        `scale(${visibility})`;

      flare.transform = sanitizer.bypassSecurityTrustStyle(transform);
    }
  }
}
