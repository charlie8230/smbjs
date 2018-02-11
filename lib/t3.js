/**
 * @fileoverview Base namespaces for T3 JavaScript.
 * @author Box
 * @author Carlos Moran
 */

/**
 * Global object for T3 JavaScript.
 * @namespace
*/
import {app} from './application';

let previousT3;

if (window['T3']) previousT3 = window['T3'];

module.exports = {
  app,
  noConflict() {
    window.T3 = previousT3;
    return this;
  }
};



