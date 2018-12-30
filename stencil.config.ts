import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'niftyuploader',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  copy: [
    { src: '../node_modules/nifty-uploader/lib/nifty-uploader.js', dest: 'scripts/nifty-uploader.js' }
  ]
};
