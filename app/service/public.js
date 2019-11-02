const Service = require('egg').Service;

class PublicService extends Service {
    // 根据id查找用户
    async findUserById(uid) {
        const { ctx } = this;
        const user = await ctx.model.User.findOne({ _id: uid }, { _id: 1, username: 1, avatar: 1, mobile: 1 });
        return user;
    }
    // 根据手机号查找用户
    async findUserByMobile(mobile) {
        const { ctx } = this;
        const user = await ctx.model.User.findOne({ mobile });
        return user;
    }
    // 创建用户
    async createUser(mobile, password) {
        const { ctx } = this;
        const user = await ctx.model.User.create({ mobile, password });
        return user;
    }
    // 更新用户信息
    async updateUser(params) {
        const { ctx } = this;
        await ctx.model.User.updateOne(...params)
    }
}

module.exports = PublicService;
