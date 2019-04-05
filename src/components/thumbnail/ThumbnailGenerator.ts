export class ThumbnailGenerator {

    public static generateThumbnail(file: File | Blob, options?: { width?: number, height?: number, maxWidth?: number, maxHeight?: number, timeout?: number }): Promise<{ thumbnailURL: string, thumbnail: Blob }> {

        return new Promise((resolve, reject) => {
            const type = file.type.split('/')[0];
            if (type == 'image') {
                this.getCanvasOfImage(file, options).then(
                    (canvas) => {
                        this.createThumbFromCanvas(canvas).then((data) => {
                            resolve({
                                thumbnailURL: data.url,
                                thumbnail: data.blob
                            })
                        });
                    },
                    (error) => {
                        reject(error);
                    });
            } else if (type == 'video') {
                this.getCanvasOfVideo(file, options).then(
                    (canvas) => {
                        this.createThumbFromCanvas(canvas).then((data) => {
                            resolve({
                                thumbnailURL: data.url,
                                thumbnail: data.blob
                            })
                        });
                    },
                    (error) => {
                        reject(error);
                    });
            } else {
                reject("Cannot generate thumbnail of files with type " + type);
            }
        });

    }

    private static getObjectURL(file: File | Blob): string {
        return window.URL.createObjectURL(file);
    }

    private static createThumbFromCanvas(canvas: HTMLCanvasElement): Promise<{ url: string, blob: Blob }> {
        return new Promise((resolve) => {
            const result = { url: null, blob: null };
            result.url = canvas.toDataURL();
            canvas.toBlob((blob) => {
                result.blob = blob;
                resolve(result);
            }, 'image/jpeg');
        });
    }

    private static getCanvasOfImage(file: File | Blob,options?: { width?: number, height?: number, maxWidth?: number, maxHeight?: number }): Promise<HTMLCanvasElement> {

        return new Promise((resolve, reject) => {
            const url = this.getObjectURL(file);

            const tmpCan = document.createElement('canvas');
            const ctx = tmpCan.getContext('2d');
            const tmp = document.createElement('img');

            tmp.addEventListener('load', () => {
                const size = this.calculateSize(tmp.naturalWidth, tmp.naturalHeight, options);
                tmpCan.width = size.width;
                tmpCan.height = size.height;
                ctx.drawImage(tmp, 0, 0, tmpCan.width, tmpCan.height);
                resolve(tmpCan);
            });

            tmp.addEventListener('error', () => {
                reject();
            });

            tmp.src = url;
        });

    }

    private static getCanvasOfVideo(file: File | Blob, options?: { width?: number, height?: number, maxWidth?: number, maxHeight?: number, timeout?: number }): Promise<HTMLCanvasElement> {

        return new Promise((resolve, reject) => {
            const tmpCan = document.createElement('canvas');
            const ctx = tmpCan.getContext('2d');

            const url = this.getObjectURL(file);

            const tmp = document.createElement('video');

            let timeout: number;
            if (options.timeout) {
                timeout = setTimeout(() => {
                    reject();
                }, options.timeout);
            }

            const timeupdate = () => {
                clearTimeout(timeout);
                if (tmp.currentTime > 0) {
                    ctx.drawImage(tmp, 0, 0, tmpCan.width, tmpCan.height);
                    const image = tmpCan.toDataURL();
                    const success = image.length > 100000;
                    if (success) {
                        tmp.removeEventListener('timeupdate', timeupdate);
                        tmp.pause();
                        tmp.src = '';
                        tmp.load();
                        resolve(tmpCan);
                    }
                }
            };

            tmp.addEventListener('timeupdate', timeupdate);

            tmp.addEventListener('loadedmetadata', () => {
                const size = this.calculateSize(tmp.videoWidth, tmp.videoHeight, options);
                tmpCan.width = size.width;
                tmpCan.height = size.height;
            });

            tmp.addEventListener('error', () => {
                reject();
            });

            tmp.addEventListener('abort', () => {
                reject();
            });

            tmp.addEventListener('stalled', () => {
                reject();
            });

            if (options.timeout) {
                tmp.addEventListener('progress', () => {
                    console.log('progress');
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        reject();
                    }, options.timeout);
                });
            }

            tmp.addEventListener('loadstart', () => {
                // console.warn("loadstarted");
            });

            // console.warn("Waiting for video to load");
            tmp.preload = 'metadata';
            tmp.src = url;
            // Load video in Safari / IE11
            tmp.muted = true;
            tmp.play();

        });

    }

    private static calculateSize(elWidth: number, elHeight: number, options: { width?: number, height?: number, maxWidth?: number, maxHeight?: number }): { width: number, height: number } {
        let imgWidth = elWidth, imgHeight = elHeight, width = options.width, height = options.height, maxWidth = options.maxWidth, maxHeight = options.maxHeight;

        if (width && !height) {
            height = imgHeight * width / imgWidth << 0;
        } else if (height && !width) {
            width = imgWidth * height / imgHeight << 0;
        } else {
            width = imgWidth;
            height = imgHeight;
        }
        if (maxWidth && width > maxWidth) {
            width = maxWidth;
            height = imgHeight * width / imgWidth << 0;
        }
        if (maxHeight && height > maxHeight) {
            height = maxHeight;
            width = imgWidth * height / imgHeight << 0;
        }

        return { width: width, height: height };
    }

}