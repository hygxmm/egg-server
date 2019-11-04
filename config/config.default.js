module.exports = appInfo => {
  return {
    keys: appInfo.name + '_1571964618491_787',
    middleware: [],
    multipart: {
      mode: 'file',
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: ['*'],
    },
    jwt: {
      secret: 'gfkb2q14bso1do0u1a4a',
    },
    // 密码加盐
    secret: 'svr894p5gpg1do19618t',
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/example',
        options: {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        },
      }
    },
    io: {
      namespace: {
        '/': {
          connectionMiddleware: [],
          packetMiddleware: [],
        }
      },
    }
  }
};
