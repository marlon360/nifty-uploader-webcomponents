import { Component, Prop } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';
import { NiftyFile } from 'nifty-uploader/lib/types/NiftyFile';


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

  private hidden: boolean;
  private percentage = 0;

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
      this.uploader.onFileProgress(() => {
        this.hidden = false;
        this.updateTotalProgress();
      });
      this.uploader.onFileUploadStarted(() => {
        this.hidden = true;
      });
    } else {
      this.updateFileProgress();
      this.uploader.onFileProgress((data) => {
        if (data.file === this.file) {
          this.hidden = false;
          this.updateFileProgress();
        }
      });
      this.uploader.onFileUploadStarted((data) => {
        if (data.file === this.file) {
          this.hidden = true;
        }
      });
    }
  }

  private updateTotalProgress() {
    this.percentage = this.uploader.getProgress() * 100;
  }

  private updateFileProgress() {
    this.percentage = this.file.getProgress() * 100;
    if (this.hideOnComplete && this.file.isComplete()) {
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
