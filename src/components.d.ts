/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  NiftyUploader,
} from 'nifty-uploader';
import {
  NiftyFile,
} from 'nifty-uploader/lib/types/NiftyFile';
import {
  Units,
} from './components/filesize/Units';
import {
  INiftyOptionsParameter,
} from 'nifty-uploader/lib/types/NiftyOptions';
import {
  StatusText,
} from './components/status/StatusText';


export namespace Components {

  interface NiftyAddButton {
    /**
    * The uploader
    */
    'uploader': NiftyUploader;
  }
  interface NiftyAddButtonAttributes extends StencilHTMLAttributes {
    /**
    * The uploader
    */
    'uploader'?: NiftyUploader;
  }

  interface NiftyCancelButton {
    'file': NiftyFile;
  }
  interface NiftyCancelButtonAttributes extends StencilHTMLAttributes {
    'file'?: NiftyFile;
  }

  interface NiftyFilename {
    'file': NiftyFile;
  }
  interface NiftyFilenameAttributes extends StencilHTMLAttributes {
    'file'?: NiftyFile;
  }

  interface NiftyFilesize {
    'file': NiftyFile;
    'units': Units;
  }
  interface NiftyFilesizeAttributes extends StencilHTMLAttributes {
    'file'?: NiftyFile;
    'units'?: Units;
  }

  interface NiftyGallery {
    'options': INiftyOptionsParameter;
    'uploader': NiftyUploader;
  }
  interface NiftyGalleryAttributes extends StencilHTMLAttributes {
    'options'?: INiftyOptionsParameter;
    'uploader'?: NiftyUploader;
  }

  interface NiftyStatus {
    'file': NiftyFile;
    'statusText': StatusText;
  }
  interface NiftyStatusAttributes extends StencilHTMLAttributes {
    'file'?: NiftyFile;
    'statusText'?: StatusText;
  }
}

declare global {
  interface StencilElementInterfaces {
    'NiftyAddButton': Components.NiftyAddButton;
    'NiftyCancelButton': Components.NiftyCancelButton;
    'NiftyFilename': Components.NiftyFilename;
    'NiftyFilesize': Components.NiftyFilesize;
    'NiftyGallery': Components.NiftyGallery;
    'NiftyStatus': Components.NiftyStatus;
  }

  interface StencilIntrinsicElements {
    'nifty-add-button': Components.NiftyAddButtonAttributes;
    'nifty-cancel-button': Components.NiftyCancelButtonAttributes;
    'nifty-filename': Components.NiftyFilenameAttributes;
    'nifty-filesize': Components.NiftyFilesizeAttributes;
    'nifty-gallery': Components.NiftyGalleryAttributes;
    'nifty-status': Components.NiftyStatusAttributes;
  }


  interface HTMLNiftyAddButtonElement extends Components.NiftyAddButton, HTMLStencilElement {}
  var HTMLNiftyAddButtonElement: {
    prototype: HTMLNiftyAddButtonElement;
    new (): HTMLNiftyAddButtonElement;
  };

  interface HTMLNiftyCancelButtonElement extends Components.NiftyCancelButton, HTMLStencilElement {}
  var HTMLNiftyCancelButtonElement: {
    prototype: HTMLNiftyCancelButtonElement;
    new (): HTMLNiftyCancelButtonElement;
  };

  interface HTMLNiftyFilenameElement extends Components.NiftyFilename, HTMLStencilElement {}
  var HTMLNiftyFilenameElement: {
    prototype: HTMLNiftyFilenameElement;
    new (): HTMLNiftyFilenameElement;
  };

  interface HTMLNiftyFilesizeElement extends Components.NiftyFilesize, HTMLStencilElement {}
  var HTMLNiftyFilesizeElement: {
    prototype: HTMLNiftyFilesizeElement;
    new (): HTMLNiftyFilesizeElement;
  };

  interface HTMLNiftyGalleryElement extends Components.NiftyGallery, HTMLStencilElement {}
  var HTMLNiftyGalleryElement: {
    prototype: HTMLNiftyGalleryElement;
    new (): HTMLNiftyGalleryElement;
  };

  interface HTMLNiftyStatusElement extends Components.NiftyStatus, HTMLStencilElement {}
  var HTMLNiftyStatusElement: {
    prototype: HTMLNiftyStatusElement;
    new (): HTMLNiftyStatusElement;
  };

  interface HTMLElementTagNameMap {
    'nifty-add-button': HTMLNiftyAddButtonElement
    'nifty-cancel-button': HTMLNiftyCancelButtonElement
    'nifty-filename': HTMLNiftyFilenameElement
    'nifty-filesize': HTMLNiftyFilesizeElement
    'nifty-gallery': HTMLNiftyGalleryElement
    'nifty-status': HTMLNiftyStatusElement
  }

  interface ElementTagNameMap {
    'nifty-add-button': HTMLNiftyAddButtonElement;
    'nifty-cancel-button': HTMLNiftyCancelButtonElement;
    'nifty-filename': HTMLNiftyFilenameElement;
    'nifty-filesize': HTMLNiftyFilesizeElement;
    'nifty-gallery': HTMLNiftyGalleryElement;
    'nifty-status': HTMLNiftyStatusElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
