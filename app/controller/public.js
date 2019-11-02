const Controller = require('egg').Controller;
const fs = require('mz/fs');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const crypto = require('crypto');

class PublicController extends Controller {
    // 注册
    async register() {
        const { ctx, config } = this;
        const { mobile, password } = ctx.request.body;
        assert(mobile, '用户名不能为空');
        assert(password, '密码不能为空');
        const user = await ctx.service.public.findUserByMobile(mobile);
        assert(!user, '该用户名已存在');
        const hash = crypto.createHmac("sha256", config.secret).update(password).digest("base64");
        const newUser = await ctx.service.public.createUser(mobile, hash);
        if (newUser) {
            ctx.body = {
                code: 0,
                message: '注册成功',
                data: null
            }
        } else {
            ctx.body = {
                code: 1,
                message: '用户名不符合要求',
                data: null
            }
        }
        ctx.status = 200;
    }
    /**
     * 登录
     * params { mobile }
     * params { password }
     */
    async login() {
        const { ctx, config } = this;
        const { mobile, password } = ctx.request.body;
        assert(mobile, '手机号不能为空');
        assert(password, '密码不能为空');
        const user = await ctx.service.public.findUserByMobile(mobile);
        assert(user, '未找到此用户');
        const hash = crypto.createHmac("sha256", config.secret).update(password).digest("base64");
        if (user.password === hash) {
            await ctx.service.public.updateUser([{ 'lastLoginTime': Date.now() }]);
            // //生成 token
            const token = jwt.sign({ uid: user._id }, config.jwt.secret, { expiresIn: '7d' })
            ctx.body = {
                code: 0,
                message: '登录成功',
                data: { token }
            }
        } else {
            ctx.body = {
                code: 1,
                msg: '账号或密码错误',
                data: null,
            }
        }
    }
    // 重置密码
    async forgetPassword() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    // 获取用户信息
    async getUser() {
        const { ctx, config } = this;
        const token = ctx.get('Token');
        var decoded = jwt.verify(token, config.jwt.secret);
        try {
            const user = await ctx.service.public.findUserById(decoded.uid);
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: '查询成功',
                    data: user
                }
            } else {
                ctx.body = {
                    code: 1,
                    msg: '查询失败',
                    data: null
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                msg: 'token不合法',
                data: null
            }
        }
    }
    // 修改用户信息
    async editUser() {
        const { ctx } = this;
        const { } = ctx.request.body; // post 获取参数
        ctx.body = 'hi, egg';
    }
    // 上传图片(支持多图上传)
    async uploadImage() {
        const { ctx } = this;
        const files = ctx.request.files;
        for (let file of files) {
            let result;
            try {
                // 处理文件,比如上传到云端
                // result = await ctx.
            } finally {
                // 删除临时文件
                await fs.unlink(file.filepath);
            }
            console.log(result)
        }

        ctx.body = {
            data: {},
            code: 0,
            msg: '上传成功'
        };
    }
}

module.exports = PublicController;
