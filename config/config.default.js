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

  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };

  config.mongoose = {
    url: 'mongodb://10.2.3.56:27017/flyfish',
    options: {
      useUnifiedTopology: true,
    },
  };

  config.cluster = {
    listen: {
      port: 7001,
      // hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 路由鉴权白名单
  config.reqUrlWhiteList = [
    '/users/login',
    '/users/register',
  ];

  // egg-axios 配置
  config.http = {
    headers: {},
    baseURL: 'http://127.0.0.1:7001',
    timeout: 10000,
  };

  // Joi 配置
  config.joi = {
    options: {},
    locale: {
      'zh-cn': {},
    },
    throw: true, // throw immediately when capture exception
    throwHandle: error => { return error; }, // error message format when throw is true
    errorHandle: error => { return error; }, // error message format when throw is false
    resultHandle: result => { return result; }, // format result
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.services = {
    douc: {
      baseURL: 'http://10.0.12.157:18080',
    },
  };

  config.cookieConfig = {
    doucCookieName: 'aops-sessionId',

    name: 'FLY_FISH_V2.0',
    domain: 'localhost',
    encryptionKey: 'BYkCpvTfyZ%hrJYSrOUWxPhrJAOZcVZo',
  };

  const staticDir = path.join(__dirname, '../www');

  config.pathConfig = {
    staticDir,

    applicationPath: 'applications',
    appTplPath: 'application_tpl',
    appBuildPath: 'application_build',
    defaultApplicationCoverPath: '/application_tpl/public/cover.png',

    componentsPath: 'components',
    componentsTplPath: 'component_tpl',

    commonPath: 'common',

    defaultComponentCoverPath: '/component_tpl/public/cover.png',
    initComponentVersion: 'v-current',
  };

  config.multipart = {
    mode: 'file',
  };

  config.static = {
    prefix: '/',
    dir: staticDir,
    // maxAge: 0,
    // preload: false,
    // dynamic: true,
    // buffer: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.logger = {
    dir: path.join(__dirname, `../logs/${appInfo.name}`),
  };

  config.customLogger = {
    // 请求响应日志
    accessLogger: {
      file: path.join(__dirname, `../logs/${appInfo.name}/access.log`),
      format: meta => {
        return '[' + meta.date + '] '
                + meta.level + ' '
                + meta.pid + ' '
                + meta.message;
      },
      formatter: meta => {
        return '[' + meta.date + '] '
                + meta.level + ' '
                + meta.pid + ' '
                + meta.message;
      },
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
