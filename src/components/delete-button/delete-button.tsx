import { Component, Prop, State } from '@stencil/core';
import { NiftyFile } from '@nifty-uploader/core/lib/types/NiftyFile';

@Component({
  tag: 'nifty-delete-button',
  styleUrl: 'delete-button.css',
  shadow: true
})
export class DeleteButton {
  
  @Prop() file: NiftyFile;
  @State() hidden = true;

  private defaultDeleteText = "Delete";

  componentWillLoad() {
    this.file.on('status-changed', () => this.onStatusChanged());
  }

  componentWillUnLoad() {
    this.file.off('status-changed', () => this.onStatusChanged());
  }

  deleteButtonClicked() {
    this.file.delete();
  }

  onStatusChanged() {
    if(this.file.isDeletable()) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }

  render() {
    return (
    <button hidden={this.hidden} onClick={() => this.deleteButtonClicked()}>
      <slot>{this.defaultDeleteText}</slot>
    </button>
    );
  }
}
