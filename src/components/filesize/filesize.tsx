import { Component, Prop } from '@stencil/core';
import { Units } from '../../utils/Units';
import { formatSizeAndUnits } from '../../utils/formatSizeAndUnits';

@Component({
  tag: 'nifty-filesize',
  styleUrl: 'filesize.css',
  shadow: true
})
export class Filesize {

  @Prop() fileSize: number;
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

  render() {
    const { formattedSize, formattedUnits } = formatSizeAndUnits(this.fileSize, this.units);
    return (
      <span>
        <span>{formattedSize}</span>
        <span> </span>
        <span>{formattedUnits}</span>
      </span>
    );
  }
}
