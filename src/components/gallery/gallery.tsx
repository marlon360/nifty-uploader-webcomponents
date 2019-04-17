import { Component, Prop, Element } from '@stencil/core';
import { NiftyUploader } from '@nifty-uploader/core';
import { INiftyOptionsParameter } from '@nifty-uploader/core/lib/types/NiftyOptions';


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
    this.uploader.on('file-accepted', () => {
      this.refresh();
    })
    this.uploader.on('file-queued', () => {
      this.refresh();
    })
    this.uploader.on('file-canceled', () => {
      this.refresh();
    })
    this.uploader.on('file-rejected', (data) => {
      alert(data.error);
    })
  }

  private refresh() {
    this.el.forceUpdate();
  }

  render() {
    return <div class="nifty-gallery">
      <nifty-drop-zone class="nifty-gallery-drop-zone" uploader={this.uploader}>
        <div class="nifty-files-wrapper">
          {this.uploader.files.map((file) =>
            <div class="nifty-file">
              <div class="thumb-wrapper">
                <nifty-thumbnail file={file} options={{ maxWidth: 500 }}>
                  <h2 slot="loading">The Thumbnail is loading</h2>
                  <h2 slot="placeholder">The Thumbnail cannot be created</h2>
                </nifty-thumbnail>
              </div>
              <nifty-filename file-name={file.name} />
              <nifty-progress-bar uploader={this.uploader} hideBeforeStart={false} file={file} />
              <nifty-filesize file-size={file.size} />
              <nifty-cancel-button file={file} />
              <nifty-delete-button file={file} />
              <nifty-status file={file} />

            </div>
          )}
        </div>
      </nifty-drop-zone>
      <div class="overlay">
        <nifty-add-button uploader={this.uploader} />
        <nifty-progress-bar hideBeforeStart={true} hideOnComplete={true} uploader={this.uploader} />
        <nifty-filesize-limit uploader={this.uploader} />
      </div>
    </div>;
  }
}
