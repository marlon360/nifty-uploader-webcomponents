import { Component, Prop } from '@stencil/core';
import { NiftyUploader } from '@nifty-uploader/core';

@Component({
  tag: 'nifty-cancel-all-button',
  styleUrl: 'cancel-all-button.css',
  shadow: false
})
export class CancelAllButton {
  
  @Prop() uploader: NiftyUploader;

  private defaultCancelAllText = "Cancel All";

  cancelAllButtonClicked() {
    this.uploader.cancelAll();
  }


  render() {
    return (
    <button onClick={() => this.cancelAllButtonClicked()}>
      <slot>{this.defaultCancelAllText}</slot>
    </button>
    );
  }
}
