'use strict';

import { environment } from './environment';

// A global cache of all tabs that are currently being monitored.
export var tabs = {};

/**
 * Finds and normalizes the current active tab into a consumable object.
 *
 * @return {Promise} resolves with normalized tab object.
 */
export function getCurrentTab() {
  // The normalized tab object to use.  Contains two properties: `id` and
  // `url`.
  var tab = {};

  return new Promise(function(resolve, reject) {
    var tabs = null;

    if (environment === 'chrome') {
      chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        active: true
      }, function(activeTabs) {
        tab.id = activeTabs[0].id;
        tab.url = activeTabs[0].url;

        resolve(tab);
      });
    }
    else if (environment === 'firefox') {
      tabs = require('sdk/tabs');

      tab.id = tabs.activeTab.id;
      tab.url = tabs.activeTab.url;

      resolve(tab);
    }
  });
}
