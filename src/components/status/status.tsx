import { Component, Prop, Element } from '@stencil/core';
import { NiftyStatus } from 'nifty-uploader';
import { StatusText } from './StatusText';
import { NiftyFile } from 'nifty-uploader/lib/types/NiftyFile';

@Component({
  tag: 'nifty-status',
  styleUrl: 'status.css',
  shadow: true
})
export class Status {

  @Element() el!: HTMLStencilElement;

  @Prop() file: NiftyFile;
  @Prop() statusText: StatusText;

  private defaultStatusText: StatusText = {
    submitting: "submitting",
    canceled: "canceled",
    rejected: "rejected",
    pending_retry: "waiting for retry",
    succeeded_uploading: "successfully uploaded",
    failed_uploading: "uploading failed",
    uploading: "uploading",
    accepted: "accepted",
    queued: "queued",
    succeeded: "successfully uploaded",
    failed: "an error occurred",
    finalizing: "finalizing",
    deleting: "deleting",
    delete_failed: "deleting failed",
    deleted: "deleted",
  };

  constructor() {
    if (!this.statusText) {
      this.statusText = this.defaultStatusText;
    }
  }

  componentWillLoad() {
    this.file.on('status-changed',() => this.statusChanged());
  }

  componentDidUnload() {
    this.file.off('status-changed', () => this.statusChanged());
  }
  

  mapStatusText(): string {
    switch (this.file.status) {
      case NiftyStatus.SUBMITTING:
        return this.statusText.submitting;
      case NiftyStatus.CANCELED:
        return this.statusText.canceled;
      case NiftyStatus.SUCCEEDED:
        return this.statusText.succeeded;
      case NiftyStatus.FAILED:
        return this.statusText.failed;
      case NiftyStatus.PENDING_RETRY:
        return this.statusText.pending_retry;
      case NiftyStatus.ACCEPTED:
        return this.statusText.accepted;
      case NiftyStatus.QUEUED:
        return this.statusText.queued;
      case NiftyStatus.REJECTED:
        return this.statusText.rejected;
      case NiftyStatus.UPLOADING:
        return this.statusText.uploading;
      case NiftyStatus.SUCCEEDED_UPLOADING:
        return this.statusText.succeeded_uploading;
      case NiftyStatus.FAILED_UPLOADING:
        return this.statusText.failed_uploading;
      case NiftyStatus.FINALIZING:
        return this.statusText.finalizing;
      case NiftyStatus.DELETED:
        return this.statusText.deleted;
      case NiftyStatus.DELETING:
        return this.statusText.deleting;
      case NiftyStatus.DELETE_FAILED:
        return this.statusText.delete_failed;
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

  private statusChanged() {
    this.el.forceUpdate();
  }

}
