module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', (ctx) => { ctx.body = "接口地址" });
  router.post('/api/public/register', controller.user.register);
  router.post('/api/public/login', controller.public.login);
  router.get('/api/public/getUser', controller.public.getUser);

  router.post('/api/public/uploadFile', controller.public.uploadVideo)

  // 地址接口路由
  router.get('/api/address/list', controller.address.getAddress);
  router.post('/api/address/edit', controller.address.editAddress);
  // router.post('/api/address/setDefault', controller.address.setDefault);


  // socket 路由
  io.of('/').route('server', io.controller.default.ping);

};
