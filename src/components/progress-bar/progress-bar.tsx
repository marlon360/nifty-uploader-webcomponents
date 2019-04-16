import { Component, Prop, State } from '@stencil/core';
import { NiftyUploader } from '@nifty-uploader/core';
import { NiftyFile } from '@nifty-uploader/core/lib/types/NiftyFile';


@Component({
  tag: 'nifty-progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: false
})
export class ProgressBar {

  @Prop() uploader: NiftyUploader;
  @Prop() file: NiftyFile;

  @Prop() hideBeforeStart = false;
  @Prop() hideOnComplete = false;

  @State() hidden: boolean;
  @State() percentage = 0;

  componentWillLoad() {
    this.hidden = this.hideBeforeStart;
    this.createEventHandlers();
  }

  private isTotalProgress(): boolean {
    return this.file === undefined;
  }

  private createEventHandlers() {
    if (this.isTotalProgress()) {
      this.updateTotalProgress();
      this.uploader.on('file-progress', () => {
        this.hidden = false;
        this.updateTotalProgress();
      });
      this.uploader.on('file-upload-started', () => {
        this.hidden = true;
      });
    } else {
      this.updateFileProgress();
      this.uploader.on('file-progress', (data) => {
        if (data.file === this.file) {
          this.hidden = false;
          this.updateFileProgress();
        }
      });
      this.uploader.on('file-upload-started', (data) => {
        if (data.file === this.file) {
          this.hidden = true;
        }
      });
      this.uploader.on('file-upload-succeeded', (data) => {
        if(this.file === data.file) {
          this.percentage = 100;
        }
      })
    }
  }

  private updateTotalProgress() {
    this.percentage = this.uploader.getProgress() * 100;
  }

  private updateFileProgress() {
    this.percentage = this.file.getProgress() * 100;
    if (this.hideOnComplete && this.file.isUploadComplete()) {
      this.hidden = true;
    }
  }

  render() {
    return (
      <div class="nifty-progress-bar-wrapper" hidden={this.hidden}>
        <div class="nifty-progress-bar"
          aria-valuemax='100'
          aria-valuemin='0'
          aria-valuenow={this.percentage}
          role='progressbar'
          style={{ width: this.percentage + '%' }}
        />
      </div>
    )
  }
}
