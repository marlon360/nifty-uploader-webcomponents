import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'nifty-filename',
  styleUrl: 'filename.css',
  shadow: true
})
export class Filename {
  
  @Prop() fileName: string;

  render() {
    return <span>{this.fileName}</span>;
  }
}
