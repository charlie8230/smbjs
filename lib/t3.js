/**
 * @fileoverview Base namespaces for SMBJS JavaScript.
 * @author Box
 * @author Carlos Moran
 */

/**
 * Global object for SMBJS JavaScript.
 * @namespace
*/
import {app} from './application';

let previousSMBJS;

if (window['SMBJS']) previousSMBJS = window['SMBJS'];

module.exports = {
  app,
  noConflict() {
    window.SMBJS = previousSMBJS;
    return this;
  }
};



