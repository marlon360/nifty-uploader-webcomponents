import { Component, Prop, Element } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';
import { INiftyOptionsParameter } from 'nifty-uploader/lib/types/NiftyOptions';


@Component({
  tag: 'nu-uploader',
  styleUrl: 'uploader.css',
  shadow: true
})
export class Uploader {

  @Element() el!: HTMLStencilElement;

  @Prop() options: INiftyOptionsParameter;
  @Prop({ mutable: true }) uploader: NiftyUploader;

  componentWillLoad() {
    if (!this.uploader) {
      this.uploader = new NiftyUploader(this.options);
    }
  }

  componentDidLoad() {
    this.uploader.onFileAdded(() => {
      this.refresh();
    })
  }

  private refresh() {
    this.el.forceUpdate();
  }

  render() {
    return <div>
      <nifty-add-button uploader={this.uploader} />
      {this.uploader.files.map((file) =>
        <div>
          <nifty-filename file={file} ></nifty-filename>
          <nifty-filesize file={file}></nifty-filesize>
          <nifty-cancel-button file={file}></nifty-cancel-button>
          <nifty-status file={file}></nifty-status>
        </div>
      )}
    </div>;
  }
}
