import { Component, Prop, State } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';
import { Units } from '../../utils/Units';
import { formatSizeAndUnits } from '../../utils/formatSizeAndUnits';

@Component({
  tag: 'nifty-filesize-limit',
  styleUrl: 'filesize-limit.css',
  shadow: false
})
export class FilesizeLimit {

  @Prop() uploader: NiftyUploader;

  @State() percentage = 0;
  @Prop() units: Units;

  private defaultUnits = {
    byte: 'B',
    kilobyte: 'KB',
    megabyte: 'MB',
    gigabyte: 'GB',
    terabyte: 'TB'
  };

  constructor() {
    if (!this.units) {
      this.units = this.defaultUnits;
    }
  }

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
    const totalSize = formatSizeAndUnits(this.uploader.getTotalFileSize(), this.units);
    const totalSizeLimit = formatSizeAndUnits(this.uploader.options.totalFileSizeLimit, this.units);
    //const freeSpace = formatSizeAndUnits(this.uploader.options.totalFileSizeLimit - this.uploader.getTotalFileSize(), this.units);
    return (
      <div>
      <div class="nifty-filesize-limit-wrapper">
        <div class="nifty-filesize-limit-bar"
          aria-valuemax='100'
          aria-valuemin='0'
          aria-valuenow={this.percentage}
          style={{ width: this.percentage + '%' }}
        />
      </div>
      <span>{totalSize.formattedSize} {totalSize.formattedUnits} of {totalSizeLimit.formattedSize} {totalSizeLimit.formattedUnits} are used.</span>
      </div>
    )
  }
}
