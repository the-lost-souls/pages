import { Utils } from './utils';

/***
 * Primitive class to animate a numerical value over time.
 */
export class SimpleAnimator {

  private _done = true;
  private _previousState = false;
  private _state = false;
  private _start = 0;
  private _value: number;
  private _animationFrameId: number;

  public set state(state: boolean) {

    if (this.state === state) {
      return;
    }
    this._state = state;
    cancelAnimationFrame(this._animationFrameId);
    this._animationFrameId = requestAnimationFrame((t) => this.animate(t));
  }

  public get state(): boolean {
    return this._state;
  }

  constructor(
    state: boolean,
    private _on: number, private _off: number,
    private _durationOn: number, private _durationOff: number,
    private _callback: (value: number) => void) {

      this._value = state ? this._on : this._off;
  }

  private animate(t: number) {

    if (this.state !== this._previousState) {

      if (this.state) {
        this._start = t - this._value * this._durationOn * 1000;
      } else {
        this._start = t - (1 - this._value) * this._durationOff * 1000;
      }
      this._previousState = this.state;
      this._done = false;
    }

    if (this.state) {
      const k = (t - this._start) / (this._durationOn * 1000);
      this._value = Utils.clamp(k, 0, 1);
      if (this._value === 1) {
        this._done = true;
      }
    } else {
      const k = (t - this._start) / (this._durationOff * 1000);
      this._value = Utils.clamp(1 - k, 0, 1);
      if (this._value === 0) {
        this._done = true;
      }
    }

    if (!this._done) {
      requestAnimationFrame((frameT) => this.animate(frameT));
    }
    this._callback(this._value);
  }
}
