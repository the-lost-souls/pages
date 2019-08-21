import { Injectable } from '@angular/core';
import { Layout } from './layout';
import { CarouselOptions } from './carouseloptions';
import { Utils } from './utils';
import { DomSanitizer } from '@angular/platform-browser';
import { Flare } from './flare';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor() { }

  public handleScroll(layout: Layout[], config: CarouselOptions, scrollTop: number) {

    const itemTotalSize = config.itemSize + config.spacing;

    for (let i = 0; i < config.sections.length; i++) {
      layout[i].distance = scrollTop - i * itemTotalSize;
      const normalizedDistance = layout[i].distance / itemTotalSize;
      const spread = 2;
      const k = (1 + Math.cos(Math.min(1, Math.abs(normalizedDistance / spread)) * Math.PI)) / 2;

      layout[i].scale = 1 + (config.grow - 1) * k;
      layout[i].height = itemTotalSize * layout[i].scale;
    }

    const a = Utils.clamp(Math.floor(scrollTop / itemTotalSize + 0.5), 0, config.sections.length - 1);

    const p = Utils.clamp(layout[a].distance / itemTotalSize, -0.5, 0.5);

    const pushA = (layout[a].height - itemTotalSize) * p;
    const centerA = config.center + a * itemTotalSize - pushA;
    layout[a].center = centerA;
    layout[a].translate = layout[a].center - layout[a].virtualCenter;

    let current = centerA - layout[a].height / 2;
    for (let i = a - 1; i >= 0; i--) {
      current -= layout[i].height / 2;
      layout[i].center = current;
      layout[i].translate = layout[i].center - layout[i].virtualCenter;
      current -= layout[i].height / 2;
    }

    current = centerA + layout[a].height / 2;
    for (let i = a + 1; i < config.sections.length; i++) {
      current += layout[i].height / 2;
      layout[i].center = current;
      layout[i].translate = layout[i].center - layout[i].virtualCenter;
      current += layout[i].height / 2;
    }
  }

  public updateTransforms(layout: Layout[], config: CarouselOptions, sanitizer: DomSanitizer, angle: number) {
    const backgroundScale = 8;
    const itemTotalSize = config.itemSize + config.spacing;


    for (let i = 0; i < config.sections.length; i++) {

      const transform =
        // `translateY(${-this.config.itemSize / 2}px)` +
        // `translateX(-50%)` +
        `translateY(${layout[i].translate}px)` +
        `translateZ(-1em)` +
        `scale(${layout[i].scale})`;

      layout[i].transform = sanitizer.bypassSecurityTrustStyle(transform);
      const normalizedDistance = layout[i].distance / itemTotalSize;
      const parallaxTranslate = normalizedDistance * itemTotalSize * 0.5;

      const backgroundTransform =
        `translateY(-50%)` +
        `translateX(-50%)` +
        `translateZ(-2em)` +
        `translateY(${-parallaxTranslate}px)` +
        `rotateZ(${angle}deg)` +
        `scale(${backgroundScale})` +
        `scale( ${1 / layout[i].scale})`;

      layout[i].backgroundTransform = sanitizer.bypassSecurityTrustStyle(backgroundTransform);
    }
  }
}
