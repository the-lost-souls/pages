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

  constructor(private _sanitizer: DomSanitizer) { }

  public handleScroll(layout: Layout[], config: CarouselOptions, scrollTop: number) {

    for (let i = 0; i < config.sections.length; i++) {
      layout[i].distance = scrollTop - i * config.sectionHeight;
      const normalizedDistance = layout[i].distance / config.sectionHeight;
      const spread = 2;
      const k = (1 + Math.cos(Math.min(1, Math.abs(normalizedDistance / spread)) * Math.PI)) / 2;

      layout[i].scale = 1 + (config.grow - 1) * k;
      layout[i].height = config.sectionHeight * layout[i].scale;
    }

    const a = Utils.clamp(Math.floor(scrollTop / config.sectionHeight + 0.5), 0, config.sections.length - 1);

    const p = Utils.clamp(layout[a].distance / config.sectionHeight, -0.5, 0.5);

    const pushA = (layout[a].height - config.sectionHeight) * p;
    const centerA = config.center + a * config.sectionHeight - pushA;
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

  public updateTransforms(layout: Layout[], config: CarouselOptions, angle: number) {
    const backgroundScale = 8;

    for (let i = 0; i < config.sections.length; i++) {

      const transform =
        // `translateY(${-this.config.itemSize / 2}px)` +
        // `translateX(-50%)` +
        `translateY(${layout[i].translate}px)` +
        `translateZ(-1em)` +
        `scale(${layout[i].scale})`;

      layout[i].transform = this._sanitizer.bypassSecurityTrustStyle(transform);
    }
  }

  public updateBackgroundTransforms(layout: Layout[], config: CarouselOptions, angle: number, backgroundScale: number) {

    for (let i = 0; i < config.sections.length; i++) {

      const normalizedDistance = layout[i].distance / config.sectionHeight;
      const parallaxTranslate = normalizedDistance * config.sectionHeight * 0.5;

      const backgroundTransform =
        `translateY(-50%)` +
        `translateX(-50%)` +
        `translateZ(-2em)` +
        `translateY(${-parallaxTranslate}px)` +
        `rotateZ(${angle}deg)` +
        `scale(${backgroundScale})` +
        `scale( ${1 / layout[i].scale})`;

      layout[i].backgroundTransform = this._sanitizer.bypassSecurityTrustStyle(backgroundTransform);
    }
  }

  public getPolygons(layout: Layout[], config: CarouselOptions, scrollTop: number): [number, number][][] {

    const polygons = [];
    for (const l of layout) {

      const screenCenter = l.center - scrollTop;
      const contentHeight = (config.sectionHeight - config.padding) * l.scale;
      const contentTop = screenCenter - contentHeight / 2;
      const contentBottom = screenCenter + contentHeight / 2;

      // TODO: these should be calculated from viewport width and/or align with the css logic
      const contentLeft = -2000;
      const contentRight = 2000;

      polygons.push([[contentLeft, contentTop], [contentRight, contentTop], [contentRight, contentBottom], [contentLeft, contentBottom]]);
    }
    return polygons;
  }
}
