import { Component, Prop } from '@stencil/core';
import { NiftyFile } from 'nifty-uploader/lib/types/NiftyFile';


@Component({
  tag: 'nifty-filename',
  styleUrl: 'filename.css',
  shadow: true
})
export class Filename {
  
  @Prop() file: NiftyFile;

  render() {
    return <span>{this.file.name}</span>;
  }
}
