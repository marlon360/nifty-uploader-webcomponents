import { Component, Prop } from '@stencil/core';
import { NiftyStatus } from 'nifty-uploader';
import { StatusText } from './StatusText';

@Component({
  tag: 'nifty-status',
  styleUrl: 'status.css',
  shadow: true
})
export class Status {

  @Prop() fileStatus: NiftyStatus;
  @Prop() statusText: StatusText;

  private defaultStatusText: StatusText = {
    added: "added",
    canceled: "canceled",
    rejected: "rejected",
    pending_retry: "waiting for retry",
    succeeded_uploading: "successfully uploaded",
    failed_uploading: "uploading failed",
    uploading: "uploading",
    processing: "processing",
    accepted: "accepted",
    queued: "queued",
    successfully_completed: "success",
    unsuccessfully_completed: "error",
    finalizing: "finalizing"
  };

  constructor() {
    if (!this.statusText) {
      this.statusText = this.defaultStatusText;
    }
  }

  mapStatusText(): string {
    switch (this.fileStatus) {
      case NiftyStatus.ADDED:
        return this.statusText.added;
      case NiftyStatus.CANCELED:
        return this.statusText.canceled;
      case NiftyStatus.SUCCESSFULLY_COMPLETED:
        return this.statusText.successfully_completed;
      case NiftyStatus.UNSUCCESSFULLY_COMPLETED:
        return this.statusText.unsuccessfully_completed;
      case NiftyStatus.PENDING_RETRY:
        return this.statusText.pending_retry;
      case NiftyStatus.ACCEPTED:
        return this.statusText.accepted;
      case NiftyStatus.PROCESSING:
        return this.statusText.processing;
      case NiftyStatus.QUEUED:
        return this.statusText.queued;
      case NiftyStatus.REJECTED:
        return this.statusText.rejected;
      case NiftyStatus.SUCCESSFULLY_COMPLETED:
        return this.statusText.successfully_completed;
      case NiftyStatus.UPLOADING:
        return this.statusText.uploading;
      case NiftyStatus.SUCCEEDED_UPLOADING:
        return this.statusText.succeeded_uploading;
      case NiftyStatus.FAILED_UPLOADING:
        return this.statusText.failed_uploading;
      case NiftyStatus.FINALIZING:
        return this.statusText.finalizing;
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
