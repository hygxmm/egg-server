module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571964618491_787';

  // add your middleware config here
  config.middleware = [];

  config.multipart = {
    mode: 'file',
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.jwt = {
    secret: 'gfkb2q14bso1do0u1a4a',
  }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/chat',
      options: {},
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    secret: 'svr894p5gpg1do19618t'
  };

  return {
    ...config,
    ...userConfig,
  };
};
