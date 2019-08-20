import { Layout } from './layout';
import { Utils } from './utils';
import { CarouselConfig } from './carouselconfig';
import { DomSanitizer } from '@angular/platform-browser';
import { Flare } from './flare';

export class CarouselUtils {

  public static handleScroll(layout: Layout[], config: CarouselConfig, scrollTop: number) {

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

  public static updateTransforms(layout: Layout[], config: CarouselConfig, sanitizer: DomSanitizer, angle: number) {
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

  public static updateFlares(scrollTop: number, layout: Layout[], flares: Flare[], config: CarouselConfig, sanitizer: DomSanitizer, ) {

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
