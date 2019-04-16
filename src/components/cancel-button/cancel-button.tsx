import { Component, Prop } from '@stencil/core';
import { NiftyFile } from '@nifty-uploader/core/lib/types/NiftyFile';

@Component({
  tag: 'nifty-cancel-button',
  styleUrl: 'cancel-button.css',
  shadow: true
})
export class CancelButton {
  
  @Prop() file: NiftyFile;

  private defaultCancelText = "Cancel";

  cancelButtonClicked() {
    this.file.cancel();
  }

  render() {
    return (
    <button onClick={() => this.cancelButtonClicked()}>
      <slot>{this.defaultCancelText}</slot>
    </button>
    );
  }
}
