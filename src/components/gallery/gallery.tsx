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
    this.uploader.on('processing-failed', (data) => {
      alert(data.error);
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
            <nifty-status file={file} />
            <nifty-progress-bar uploader={this.uploader} file={file} />
            <nifty-thumbnail file={file} options={{maxWidth: 500}}>
              <h2 slot="loading">The Thumbnail is loading</h2>
              <h2 slot="placeholder">The Thumbnail cannot be created</h2>
            </nifty-thumbnail>
          </div>
        )}
      <nifty-filesize-limit uploader={this.uploader} />
      </nifty-drop-zone>
    </div>;
  }
}
