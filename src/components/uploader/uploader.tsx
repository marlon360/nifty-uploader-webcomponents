import { Component, Prop, Element } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';


@Component({
  tag: 'nu-uploader',
  styleUrl: 'uploader.css',
  shadow: true
})
export class Uploader {


  @Prop() uploader: NiftyUploader;

  @Element() el!: HTMLStencilElement;

  refresh() {
      this.el.forceUpdate();
  }

  componentDidLoad() {
    this.uploader.onFileAdded(() => {
      this.refresh();
    })
  }

  render() {
    return <div>
      <nifty-add-button uploader={this.uploader} />
      {this.uploader.files.map((file) =>
        <div>
          <div>{file.name}</div>
          <div>{file.size}</div>
        </div>
      )}
    </div>;
  }
}
