import { Component, Prop } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';

@Component({
  tag: 'nifty-drop-zone',
  styleUrl: 'drop-zone.css',
  shadow: true
})
export class DropZone {

  @Prop() uploader: NiftyUploader;

  private dropHandler(ev: DragEvent) {

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      let files: File[] = [];
      for (const item of Array.from(ev.dataTransfer.items)) {
        if (item.kind === 'file') {
          files.push(item.getAsFile());
        }
      }
      this.uploader.addFiles(files);
    } else {
      this.uploader.addFiles(ev.dataTransfer.files);
    }
  }

  render() {
    return (
      <div class="nifty-drop-zone" onDrop={(ev) => this.dropHandler(ev)}>
        <slot />
      </div>
    );
  }
}
