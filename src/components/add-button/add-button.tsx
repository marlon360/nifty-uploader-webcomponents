import { Component, Prop } from '@stencil/core';
import { NiftyUploader } from '@nifty-uploader/core';


@Component({
  tag: 'nifty-add-button',
  styleUrl: 'add-button.css',
  shadow: true
})
export class AddButton {
  /**
   * The uploader
   */
  @Prop() uploader: NiftyUploader;
  @Prop() multiple: boolean = true;

  button: HTMLButtonElement;


  openFileBrowser() {
    let input = document.createElement('input');
    input.multiple = this.multiple;
    input.type = 'file';
    input.onchange = () => {
      console.log("added file");
      this.uploader.addFiles(input.files)
      input.remove();
    }
    input.click();

  }

  render() {
    return <button onClick={ () => this.openFileBrowser()} ref={(el) => this.button = el as HTMLButtonElement}>Add files</button>;
  }
}
