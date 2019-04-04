import { Component, Prop } from '@stencil/core';
import { Units } from './Units';

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

  formatSizeAndUnits(size: number, units: Units): { formattedSize: string, formattedUnits: string } {

    let formattedSize: string;
    let formattedUnits: string;

    if (size < 1e+3) {
      formattedSize = size.toString();
      formattedUnits = units.byte
    }
    else if (size >= 1e+3 && size < 1e+6) {
      formattedSize = (size / 1e+3).toFixed(2)
      formattedUnits = units.kilobyte
    }
    else if (size >= 1e+6 && size < 1e+9) {
      formattedSize = (size / 1e+6).toFixed(2)
      formattedUnits = units.megabyte
    }
    else if (size >= 1e+9 && size < 1e+12) {
      formattedSize = (size / 1e+9).toFixed(2)
      formattedUnits = units.gigabyte
    }
    else {
      formattedSize = (size / 1e+12).toFixed(2)
      formattedUnits = units.terabyte
    }

    return { formattedSize, formattedUnits };
  }

  render() {
    const { formattedSize, formattedUnits } = this.formatSizeAndUnits(this.fileSize, this.units);
    return (
      <span>
        <span>{formattedSize}</span>
        <span> </span>
        <span>{formattedUnits}</span>
      </span>
    );
  }
}
