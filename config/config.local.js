/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1635235048156_3836';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'notfoundHandler', 'accessLogger' ];


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    url: 'mongodb://10.2.3.56:27017/flyfish',
    options: {
      useUnifiedTopology: true,
    },
  };

  const staticDir = path.join(__dirname, '../www');
  config.pathConfig = {
    staticDir,
  };

  config.static = {
    prefix: '/',
    dir: staticDir,
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
