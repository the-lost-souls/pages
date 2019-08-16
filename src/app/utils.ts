import * as StackBlur from 'stackblur-canvas';

export class Utils {
    public static blur(img: HTMLImageElement, canvas: HTMLCanvasElement, radius: number): string {
        const w = 256;
        const h = 256;

        canvas.width = w;
        canvas.height = h;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, w, h);
        StackBlur.canvasRGBA(canvas, 0, 0, w, h, radius);
        const imageData = context.getImageData(0, 0, w, h);

        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }
}
