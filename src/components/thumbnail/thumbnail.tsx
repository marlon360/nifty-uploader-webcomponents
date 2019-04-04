import { Component, Prop, State } from '@stencil/core';
import { NiftyFile } from 'nifty-uploader/lib/types/NiftyFile';

@Component({
  tag: 'nifty-thumbnail',
  styleUrl: 'thumbnail.css',
  shadow: true
})
export class Thumbnail {

  @Prop() file: NiftyFile;

  @State() thumbnailURL: string;

  componentDidLoad() {
    if (this.file.content) {
      const type = this.file.content.type.split('/')[0];
      if (type == 'image') {
        this.getCanvasOfImage(this.file.content, { maxWidth: 500 }).then(
          (canvas) => {
            this.createThumbFromCanvas(canvas).then((data) => {
              this.thumbnailURL = data.url;
            });
          },
          (error) => {
            console.log(error);
          });
      }
    }
  }

  render() {
    return (
      <span>
        <img src={this.thumbnailURL} />
      </span>
    );
  }

  private getObjectURL(file: File | Blob): string {
    return window.URL.createObjectURL(file);
  }

  private createThumbFromCanvas(canvas: HTMLCanvasElement): Promise<{ url: string, blob: Blob }> {
    return new Promise((resolve) => {
      const result = { url: null, blob: null };
      result.url = canvas.toDataURL();
      canvas.toBlob((blob) => {
        result.blob = blob;
        resolve(result);
      }, 'image/jpeg');
    });
  }

  private getCanvasOfImage(file, options): Promise<HTMLCanvasElement> {

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

  calculateSize(elWidth, elHeight, options): { width: number, height: number } {
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
