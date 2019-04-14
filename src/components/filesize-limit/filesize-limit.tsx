import { Component, Prop, State } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';

@Component({
  tag: 'nifty-filesize-limit',
  styleUrl: 'filesize-limit.css',
  shadow: false
})
export class FilesizeLimit {

  @Prop() uploader: NiftyUploader;

  @State() percentage = 0;

  componentWillLoad() {
    this.createEventHandlers();
  }


  private createEventHandlers() {
    this.uploader.on('file-added', () => {
      this.calculatePercentage();
    });
    this.uploader.on('file-upload-started', () => {
      this.calculatePercentage();
    });
  }

  private calculatePercentage() {
    this.percentage = this.uploader.getTotalFileSize() / this.uploader.options.totalFileSizeLimit * 100;
    console.log(this.uploader.getTotalFileSize());
  }


  render() {
    return (
      <div class="nifty-filesize-limit-wrapper">
        <div class="nifty-filesize-limit-bar"
          aria-valuemax='100'
          aria-valuemin='0'
          aria-valuenow={this.percentage}
          style={{ width: this.percentage + '%' }}
        />
      </div>
    )
  }
}
