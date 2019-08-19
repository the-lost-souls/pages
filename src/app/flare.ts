import { SafeStyle } from '@angular/platform-browser';

export class Flare {
  constructor(public x: number, public y: number, public size: number, public scale: number) { }

  public transform: SafeStyle;
}

