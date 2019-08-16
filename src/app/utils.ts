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
        return canvas.toDataURL();
    }

    public static prepareBackground(img: HTMLImageElement, canvas: HTMLCanvasElement, blurRadius: number, fadeRadius: number) {

        const w = 512;
        const h = 512;

        canvas.width = w;
        canvas.height = h;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, w, h);
        StackBlur.canvasRGBA(canvas, 0, 0, w, h, blurRadius);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const xCenter = imageData.width / 2;
        const yCenter = imageData.height / 2;
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                const distance = Utils.distance(x, y, xCenter, yCenter);
                const t = Math.PI * Math.min(1, distance / fadeRadius);
                const alpha = 1 - (Math.cos(t) + 1) / 2;
                // const alpha = distance > radius ? 1 : 0;
                imageData.data[(y * imageData.width + x) * 4 + 3] = Math.round(alpha * 255);
            }
        }
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL();

    }

    public static fadeEdges(img: HTMLImageElement, canvas: HTMLCanvasElement, begin: number, end: number) {
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);

        for (let x = begin; x < end; x++) {
            const t = 2 * Math.PI * (x / imageData.width - 0.5);
            const alpha = (Math.cos(t) + 1) / 2;

            for (let y = 0; y < imageData.height; y++) {
                imageData.data[(y * imageData.width + x) * 4 + 3] = Math.round(alpha * 255);
            }
        }
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    public static distance(x0, y0, x1, y1): number {
        return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
    }
}
