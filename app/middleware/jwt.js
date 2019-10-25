const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
    return async function userInterceptor(ctx, next) {
        let authToken = ctx.get('Token');
        if (authToken) {
            console.log(authToken)
            try {
                var decoded = jwt.verify(authToken, options.secret);
                console.log(decoded);
                await next()

            } catch (err) {
                ctx.body = {
                    code: 1,
                    msg: '无效的token!',
                    data: null
                }
                ctx.status = 401;
            }
        } else {
            // 没有 token 参数
            ctx.body = {
                code: 1,
                msg: '无效的token!',
                data: null
            }
            ctx.status = 401;
        }
    }
}