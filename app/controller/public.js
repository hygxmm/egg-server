const Controller = require('egg').Controller;
const fs = require('mz/fs');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const crypto = require('crypto').createHash("md5");

class PublicController extends Controller {
    // 注册
    async register() {
        const { ctx, config } = this;
        const { mobile, password } = ctx.request.body;
        assert(mobile, '用户名不能为空');
        assert(password, '密码不能为空');
        const user = await ctx.service.public.findUserByMobile(mobile);
        assert(!user, '该用户名已存在');
        const hash = crypto.update(password).digest(config.secret);
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
        const user = await ctx.model.User.findOne({ mobile });
        assert(user, '未找到此用户');
        const hash = crypto.update(password).digest(config.secret);
        console.log(hash)
        // if (user.password === hash) {
        //     console.log("密码正确")
        // } else {
        //     console.log("无法比对")
        // }



        // jwt.sign(mobile, app.config.jwt.secret, { expiresIn: '7d' })



        // assert(user, '该用户不存在')
        // const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        // assert(isPasswordCorrect, '密码错误')
        // user.lastLoginTime = Date.now()
        // await user.save()
        // //查找与此用户相关联的群组
        // const groups = await Group.find({ members: user }, { _id: 1, name: 1, avatar: 1, creator: 1, createTime: 1 })
        // //查找与此用户相关联的好友
        // const friends = await Friend.find({ from: user._id }).populate('from', { avatar: 1, username: 1 });
        // //生成 token
        // const token = generateToken(user._id);
        // ctx.cookies.set('SESSION', token, {
        //     domain: 'localhost',
        //     path: '/',
        //     maxAge: config.tokenExpiresTime,
        //     httpOnly: true,
        //     overwrite: false
        // })
        // ctx.body = {
        //     success: true,
        //     message: '登录成功',
        //     data: {
        //         _id: user._id,
        //         token: token,
        //         avatar: user.avatar,
        //         username: user.username,
        //         groups,
        //         friends
        //     }
        // }








        ctx.body = 'hi, egg';
    }
    // 重置密码
    async forgetPassword() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    // 获取用户信息
    async getUser() {
        const { ctx } = this;
        const { token } = ctx.query; // get 获取参数


        ctx.body = 'hi, egg';
        ctx.status = 200;
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
