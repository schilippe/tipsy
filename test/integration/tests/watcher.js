'use strict';

describe('watcher', function() {
  it('can get basic page activity', function() {
    this.timeout(20000);

    var driver = this.extensionDriver;

    return driver.get('https://google.com/').then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          driver.navigate('html/index.html#log')
            .then(function() {
              return driver.refresh();
            })
            .then(function() {
              return driver.click('.show.author');
            })
            .then(function() {
              return driver.wait(function() {
                return document.querySelectorAll('table tr.no-author').length;
              })
            })
            .then(function() {
              return driver.execute(function() {
                return document.querySelectorAll('table tr.no-author').length;
              });
            }).then(function(length) {
              assert.equal(length, 1);
            }).then(resolve, reject);
        }, 1000);
      });
    })
  });

  it('can detect author information', function() {
    this.timeout(20000);

    var driver = this.extensionDriver;

    return driver.get('http://tbranyen.com/').then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          driver.navigate('html/index.html#log')
            .then(function() {
              return driver.refresh();
            })
            .then(function() {
              return driver.click('.show.author');
            })
            .then(function() {
              return driver.execute(function() {
                return document.querySelectorAll('table tr.has-author').length;
              });
            }).then(function(length) {
              assert.equal(length, 1);
            }).then(resolve, reject);
        }, 1000);
      });
    })
  });
});
