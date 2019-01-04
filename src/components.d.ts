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

  interface NuUploader {
    'options': INiftyOptionsParameter;
    'uploader': NiftyUploader;
  }
  interface NuUploaderAttributes extends StencilHTMLAttributes {
    'options'?: INiftyOptionsParameter;
    'uploader'?: NiftyUploader;
  }
}

declare global {
  interface StencilElementInterfaces {
    'NiftyAddButton': Components.NiftyAddButton;
    'NiftyFilename': Components.NiftyFilename;
    'NiftyFilesize': Components.NiftyFilesize;
    'NuUploader': Components.NuUploader;
  }

  interface StencilIntrinsicElements {
    'nifty-add-button': Components.NiftyAddButtonAttributes;
    'nifty-filename': Components.NiftyFilenameAttributes;
    'nifty-filesize': Components.NiftyFilesizeAttributes;
    'nu-uploader': Components.NuUploaderAttributes;
  }


  interface HTMLNiftyAddButtonElement extends Components.NiftyAddButton, HTMLStencilElement {}
  var HTMLNiftyAddButtonElement: {
    prototype: HTMLNiftyAddButtonElement;
    new (): HTMLNiftyAddButtonElement;
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

  interface HTMLNuUploaderElement extends Components.NuUploader, HTMLStencilElement {}
  var HTMLNuUploaderElement: {
    prototype: HTMLNuUploaderElement;
    new (): HTMLNuUploaderElement;
  };

  interface HTMLElementTagNameMap {
    'nifty-add-button': HTMLNiftyAddButtonElement
    'nifty-filename': HTMLNiftyFilenameElement
    'nifty-filesize': HTMLNiftyFilesizeElement
    'nu-uploader': HTMLNuUploaderElement
  }

  interface ElementTagNameMap {
    'nifty-add-button': HTMLNiftyAddButtonElement;
    'nifty-filename': HTMLNiftyFilenameElement;
    'nifty-filesize': HTMLNiftyFilesizeElement;
    'nu-uploader': HTMLNuUploaderElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
