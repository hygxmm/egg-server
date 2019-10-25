module.exports = app => {
  const { router, controller } = app;
  router.post('/api/public/register', controller.public.register);
  router.post('/api/public/login', controller.public.login);

  router.post('/api/public/uploadImage', controller.public.uploadImage);
  router.get('/api/public/user', controller.public.getUser);
};
