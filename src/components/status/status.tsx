import { Component, Prop } from '@stencil/core';
import { NiftyFile } from 'nifty-uploader/lib/types/NiftyFile';
import { NiftyStatus } from 'nifty-uploader';
import { StatusText } from './StatusText';

@Component({
  tag: 'nifty-status',
  styleUrl: 'status.css',
  shadow: true
})
export class Status {
  
  @Prop() file: NiftyFile;
  @Prop() statusText: StatusText; 

  private defaultStatusText = {
    added: "added",
    canceled: "canceled",
    error: "failed",
    rejected: "rejected",
    pending_retry: "waiting for retry",
    success: "successfully uploaded",
    uploading: "uploading",
    processing: "processing",
    processed: "processed",
    queued: "queued"
  };

  constructor() {
    if(!this.statusText) {
      this.statusText = this.defaultStatusText;
    }
  }

  mapStatusText(): string {
    switch(this.file.status) {
      case NiftyStatus.ADDED:
        return this.statusText.added;
      case NiftyStatus.CANCELED:
        return this.statusText.canceled;
      case NiftyStatus.ERROR:
        return this.statusText.error;
      case NiftyStatus.PENDING_RETRY:
        return this.statusText.pending_retry;
      case NiftyStatus.PROCESSED:
        return this.statusText.processed;
      case NiftyStatus.PROCESSING:
        return this.statusText.processing;
      case NiftyStatus.QUEUED:
        return this.statusText.queued;
      case NiftyStatus.REJECTED:
        return this.statusText.rejected;
      case NiftyStatus.SUCCESS:
        return this.statusText.success;
      case NiftyStatus.UPLOADING:
        return this.statusText.uploading;
      default:
        return "";
    }
  }

  render() {
    return (
    <span>
      {this.mapStatusText()}
    </span>
    );
  }
}
