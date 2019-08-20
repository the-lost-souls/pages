import { SafeStyle } from '@angular/platform-browser';

export class Layout {

  public virtualCenter = 0;
  public virtualTop = 0;
  public virtualTopStyle = '';
  public scale: number;
  public center: number;
  public distance: number;
  public height: number;
  public transform: SafeStyle;
  public backgroundTransform: SafeStyle;
  public background: string;
  public foreground: string;

  // temporary
  public translate: number;


  public contains(y: number): boolean {
    const sectionTop = this.center - this.height / 2;
    const sectionBottom = this.center + this.height / 2;
    return !(y < sectionTop || y > sectionBottom);
  }

  public containsLine(y0: number, y1: number): number {
    const sectionTop = this.center - this.height / 2;
    const sectionBottom = this.center + this.height / 2;

    // Completely inside
    if (this.contains(y0) && this.contains(y1)) {
      return 1;
    }

    const line = [y0, y1].sort((n1, n2) => n1 - n2);

    // Completely outside
    if (line[0] > sectionBottom || line[1] < sectionTop) {
        return 0;
    }

    // Now we know only one of the points are contained, let's calculate the fraction
    const length = line[1] - line[0];
    if (this.contains(line[0])) {
      return (line[1] - sectionBottom) / length;
    } else {
      return (line[0] - sectionTop) / length;
    }
  }
}
