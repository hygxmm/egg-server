const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const assert = require('assert');
const crypto = require('crypto');

class UserController extends Controller {
    // 注册
    async register() {
        const { ctx, config } = this;
        const { username, password } = ctx.request.body;
        assert(username, '用户名不能为空');
        assert(password, '密码不能为空');
        const user = await ctx.model.User.findOne({ username });
        assert(!user, '该手机号已注册');
        const defaultGroup = await ctx.model.Group.findOne({ isDefault: true });
        assert(defaultGroup, '默认群组不存在');
        const hash = crypto.createHmac("sha256", config.secret).update(password).digest("base64");
        let newUser = null;
        try {
            newUser = await ctx.model.User.create({
                username,
                password: hash,
            })
        } catch (err) {
            if (err.name === 'ValidationError') {
                return '用户名包含不支持的字符或者长度超过限制'
            }
            throw err;
        }
        defaultGroup.members.push(newUser);
        await defaultGroup.save();
        ctx.body = {
            code: 0,
            message: '注册成功',
            data: null
        }
        ctx.status = 200;
    }
    // 登录



}

module.exports = UserController;
