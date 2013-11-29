/*
 * grunt-wait-async
 * https://github.com/imyelo/grunt-wait-async
 *
 * Copyright (c) 2013 yelo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('wait_async', 'wait for an async task', function() {
    var options = this.options({
      wait: function () {},
      fail: function () {},
      timeout: 10 * 1000,
      isforce: false
    });
    var done = this.async();
    var flag = {
      trigger: false
    };
    var doneTrigger = function () {
      if (!flag.trigger) {
        flag.trigger = true;
        done();
      }
    };
    grunt.log.writeln('waiting for an async task');
    options.wait(doneTrigger);
    setTimeout(function () {
      if (!flag.trigger) {
        flag.trigger = true;
        grunt.log.warn('timeout.');
        options.fail();
        done(options.isforce);
      }
    }, options.timeout);
  });

};
