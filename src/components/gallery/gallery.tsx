import { Component, Prop, Element } from '@stencil/core';
import { NiftyUploader } from 'nifty-uploader';
import { INiftyOptionsParameter } from 'nifty-uploader/lib/types/NiftyOptions';


@Component({
  tag: 'nifty-gallery',
  styleUrl: 'gallery.css',
  shadow: false
})
export class Gallery {

  @Element() el!: HTMLStencilElement;

  @Prop() options: INiftyOptionsParameter;
  @Prop({ mutable: true }) uploader: NiftyUploader;

  componentWillLoad() {
    if (!this.uploader) {
      this.uploader = new NiftyUploader(this.options);
    }
  }

  componentDidLoad() {
    this.uploader.on('file-added', () => {
      this.refresh();
    })
    this.uploader.on('file-success', () => {
      this.refresh();
    })
    this.uploader.on('file-failed', () => {
      this.refresh();
    })
  }

  private refresh() {
    this.el.forceUpdate();
  }

  render() {
    return <div>
      <nifty-drop-zone class="nifty-gallery-drop-zone" uploader={this.uploader}>
        <nifty-add-button uploader={this.uploader} />
        <nifty-progress-bar hideBeforeStart={true} hideOnComplete={true} uploader={this.uploader} />
        {this.uploader.files.map((file) =>
          <div>
            <nifty-filename file-name={file.name} />
            <nifty-filesize file-size={file.size} />
            <nifty-cancel-button file={file} />
            <nifty-status file-status={file.status} />
            <nifty-progress-bar uploader={this.uploader} file={file} />
            <nifty-thumbnail file={file} />
          </div>
        )}
      </nifty-drop-zone>
    </div>;
  }
}
