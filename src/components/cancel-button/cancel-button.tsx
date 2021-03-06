import { Component, Prop, State } from '@stencil/core';
import { NiftyFile } from '@nifty-uploader/core/lib/types/NiftyFile';

@Component({
  tag: 'nifty-cancel-button',
  styleUrl: 'cancel-button.css',
  shadow: true
})
export class CancelButton {
  
  @Prop() file: NiftyFile;
  @State() hidden = false;

  private defaultCancelText = "Cancel";

  cancelButtonClicked() {
    this.file.cancel();
  }

  componentWillLoad() {
    this.file.on('status-changed', () => this.onStatusChanged());
  }

  componentWillUnLoad() {
    this.file.off('status-changed', () => this.onStatusChanged());
  }

  onStatusChanged() {
    if(!this.file.isDeletable()) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }

  render() {
    return (
    <button hidden={this.hidden} onClick={() => this.cancelButtonClicked()}>
      <slot>{this.defaultCancelText}</slot>
    </button>
    );
  }
}
