module.exports = app => {
  const { router, controller } = app;
  router.post('/api/public/register', controller.public.register);
  router.post('/api/public/login', controller.public.login);
  router.get('/api/public/getUser', controller.public.getUser);

  // 地址接口路由
  router.get('/api/address/list', controller.address.getAddress);
  router.post('/api/address/edit', controller.address.editAddress);
  // router.post('/api/address/setDefault', controller.address.setDefault);

};
