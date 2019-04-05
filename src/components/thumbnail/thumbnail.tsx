import { Component, Prop, State, EventEmitter, Event } from '@stencil/core';
import { NiftyFile } from 'nifty-uploader/lib/types/NiftyFile';
import { ThumbnailGenerator } from './ThumbnailGenerator';

@Component({
  tag: 'nifty-thumbnail',
  styleUrl: 'thumbnail.css',
  shadow: true
})
export class Thumbnail {

  @Prop() file: NiftyFile;
  @Prop({mutable: true}) thumbnailUrl: string;
  @Prop() options: { width?: number, height?: number, maxWidth?: number, maxHeight?: number, timeout?: number };

  @State() loading: boolean;

  @Event() thumbnailGenerated: EventEmitter;

  componentDidLoad() {
    // set loading flag
    this.loading = true;
    // check if thumbnail url is already available
    if (this.thumbnailUrl == null) {
      // check if the nifty file has a File or Blob
      if (this.file.content) {
        // generate thumbnail
        ThumbnailGenerator.generateThumbnail(this.file.content, this.options).then((result) => {
          // set thumbnail url
          this.thumbnailUrl = result.thumbnailURL;
          // set loading to false
          this.loading = false;
          // emit event for thumbnail genration
          this.thumbnailGenerated.emit(result.thumbnail);
        }).catch(() => {
          // if the thumbnail cannot be created
          this.loading = false;
        })
      }
    } else {
      // if the thumbnail is already available
      this.loading = false;
    }
  }

  render() {

    let content: JSX.Element;

    // if a thumbnail url is available
    if (this.thumbnailUrl != null) {
      content = <img src={this.thumbnailUrl} />;
    }
    // if a thumbnail url is not available and a thumbnail is generating
    else if (this.loading && this.thumbnailUrl == null) {
      content = <slot name="loading">LOADING</slot>;
    }
    // if no thumbnail is available and it is not generating
    else {
      content = <slot name="placeholder">PLACEHOLDER</slot>
    }


    return (
      <span>
        { content }
      </span>
    );
  }

}
