import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as StackBlur from 'stackblur-canvas';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.sass'],
  animations: [
    trigger('spin', [
      state('true, void', style({
        transform: 'translate(-50%, -50%) rotate({{ begin }}) '
      }), { params: { begin: '213deg'}}),
      state('false', style({
        transform: 'translate(-50%, -50%) rotate({{ end }})'
      }), { params: { end: '213deg' }}),
      transition('* => *', [
        animate('{{ duration }} ease-in-out')
      ], { params: { duration: '10s'}}),
    ]),
    trigger('zoom', [
      state('true', style({
        transform: 'translate(-50%, -50%) scale(1.2) '
      })),
      state('false, void', style({
        transform: 'translate(-50%, -50%) scale(1)'
      })),
      transition('* => *', [
        animate('20s ease-in-out')
      ]),
    ])
  ]
})
export class ParallaxComponent implements OnInit, AfterViewInit {

  public rotate1;
  public rotate2 = true;
  public zoom = true;

  public angle1 = 45;
  public angle2 = -63;
  public scale1 = 3;
  public scale2 = 3;
  private _previousT: number;

  @Input()
  public height = 100;

  @Input()
  public focus = 0;

  @ViewChild('blurred1', {static: false})
  private _blurred1: ElementRef<HTMLCanvasElement>;

  @ViewChild('plasma1', {static: false})
  private _plasma1: ElementRef<HTMLImageElement>;

  @ViewChild('plasma2', {static: false})
  private _plasma2: ElementRef<HTMLImageElement>;

  // @ViewChild('blurred2', {static: false})
  // private _blurred2: ElementRef<HTMLCanvasElement>;

  public transform1: SafeStyle;
  public transform2: SafeStyle;

  @ViewChild('theimage', {static: false})
  private _theimage: ElementRef<HTMLImageElement>;

  @Input()
  public image = '';

  public get top(): number {
    return this._host.nativeElement.getBoundingClientRect().top;
  }

  constructor(
    private _host: ElementRef<HTMLElement>,
    private _changeDetection: ChangeDetectorRef,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.transform1 = this.getTransform(this.angle1, 1);
    this.transform2 = this.getTransform(this.angle2, 1.5);
    // requestAnimationFrame((frameT) => this.animate(frameT));
  }

  private animate(t: number) {

    if (this._previousT) {
      const elapsed = t - this._previousT;
      this.angle1 += 3.5 * elapsed / 1000;
      this.angle2 += -4.2 * elapsed / 1000;
      this.transform1 = this.getTransform(this.angle1, 1);
      this.transform2 = this.getTransform(this.angle2, 1.5);
    }
    this._previousT = t;
    requestAnimationFrame((frameT) => this.animate(frameT));
  }

  public blurAll() {
    this.blur(this._theimage.nativeElement, this._blurred1.nativeElement, 7);
  }

  getTransform(angle: number, scale: number) {
    const transform = `translate(-50%, -50%) scale(${scale}) rotate(${angle}deg)`;
    return this.sanitizer.bypassSecurityTrustStyle(transform);
  }


  getTitleTransform(focus: number) {
    const transform = `translate(${(1 - focus) * 50}%, 0)`;
    // const transform = 'translate(, 0)';
    return this.sanitizer.bypassSecurityTrustStyle(transform);
  }

  blur(img: HTMLImageElement, canvas: HTMLCanvasElement, radius: number) {
    const w = 512;
    const h = 512;

    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext('2d');
    context.drawImage( img, 0, 0, w, h);
    StackBlur.canvasRGBA( canvas, 0, 0, w, h, radius);
    const imageData = context.getImageData(0, 0, w, h);

    context.putImageData(imageData, 0, 0);
    this._plasma1.nativeElement.src = canvas.toDataURL();
    this._plasma2.nativeElement.src = canvas.toDataURL();
  }

  restartRotate1() {
    this.rotate1 = !this.rotate1;
    this._changeDetection.detectChanges();
  }

  restartRotate2() {
    this.rotate2 = !this.rotate2;
    this._changeDetection.detectChanges();
  }

  restartZoom() {
    this.zoom = !this.zoom;
    this._changeDetection.detectChanges();
  }
}
