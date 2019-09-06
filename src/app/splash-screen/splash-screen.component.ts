import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../utils';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.sass'],
  animations: [
    trigger('fadeOut', [
      state('void, false', style({
        opacity : 1
      })),
      state('true', style({
        opacity: 0,
      })),
      transition('* => true', [
        animate('1s')
      ]),
    ])
  ]
})
export class SplashScreenComponent implements AfterViewInit {

  public fade = false;

  @Input()
  public progressMin: 0;

  @Input()
  public progressMax: 100;

  private _progress = 0;
  @Input()
  public set progress(value: number) {
    this._progress = Utils.clamp(value, 0, 100);

    const percentage = Math.round(100 * (this.progress - this.progressMin) / (this.progressMax - this.progressMin));
    if (this._progressBar) {
      this._progressBar.innerText = `${percentage}%`;
    }
    if (this.progress === this.progressMax) {
      this.fade = true;
    }
  }
  public get progress(): number {
    return this._progress;
  }

  @ViewChild('container', {static: false}) private _container: ElementRef<HTMLElement>;

  private _progressBar: HTMLElement;

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument) { }

  ngAfterViewInit() {

    this._progressBar = this._document.getElementById('progressbar');

    // Move the splashscreen element from index.html to here so we can apply the fade
    const splashScreen: HTMLElement = this._document.getElementById('splashscreen');
    if (splashScreen) {
      this._container.nativeElement.appendChild(splashScreen);
    } else {
      // This will happen in tests
      console.warn('Could not find splashscreen element.');
    }
  }
}
