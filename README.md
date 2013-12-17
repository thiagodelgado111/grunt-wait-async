# grunt-wait-async

> makes grunt wait for an async task

[![NPM version](https://badge.fury.io/js/grunt-wait-async.png)](http://badge.fury.io/js/grunt-wait-async)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wait-async --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wait-async');
```

## The "wait_async" task

### Overview
In your project's Gruntfile, add a section named `wait_async` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wait_async: {
    options: {
      wait: function (done) {
        done();
      },
      fail: function () {},
      timeout: 10 * 1000,
      isforce: false
    },
    server: {
      options: {
        wait: function (done) {
          done();
        },
        fail: function () {},
        timeout: 10 * 1000,
        isforce: false
      },
    },
  },
});
```

### Options

#### options.wait  
Type: `function`  
Default value: `function () {}`  

this options is required.  


#### options.fail  
Type: `function`  
Default value: `function () {}`  


#### options.timeout  
Type: `number`  
Default value: `10 * 1000`  


#### options.isforce  
Type: `boolean`  
Default value: `false`  

When `options.isforce` is true, 
the task will continue after `options.timeout`, 
even if the `done` signal in `options.wait` never came.  

### Usage Examples  

#### Default Options  
In this example, the `wait_async` task will wait for the server start with the least options.  

```js
var request = require('request');
grunt.initConfig({
  wait_async: {
    server: {
      options: {
        wait: function (done) {
          var doRequest = function () {
            console.log('waiting for the server ...');
            request(config.siteUrl, function (err, resp, body) {
              if (!err) {
                console.log('server is ready.');
                done();
              } else {
                doRequest();
              }
            });
          };
          doRequest();
        }
      }
    },
  },
});
```

#### Custom Options  

```js
var request = require('request');
grunt.initConfig({
  wait_async: {
    server: {
      options: {
        wait: function (done) {
          var doRequest = function () {
            console.log('waiting for the server ...');
            request(config.siteUrl, function (err, resp, body) {
              if (!err) {
                console.log('server is ready.');
                done();
              } else {
                doRequest();
              }
            });
          };
          doRequest();
        }
        fail: function () {
          console.error('the server had not start'); 
        },
        timeout: 20 * 1000.
        isforce: true
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/imyelo/grunt-wait-async/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

