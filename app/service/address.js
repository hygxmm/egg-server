const Service = require('egg').Service;

class AddressService extends Service {
    // 查找用户地址列表
    async findAddress(uid) {
        const { ctx } = this;
        const addrs = await ctx.model.Address.find({}, {})
            .populate({ path: 'creator' });
        return addrs;
    }
    // 添加地址
    async addAddress(obj) {
        const { ctx } = this;
        const address = await ctx.model.Address.create(obj);
        return address
    }
    // 修改地址
    async editAddress(obj) {
        const { ctx } = this;
        const address = await ctx.model.Address.findOneAndUpdate({ _id: obj.id }, obj);
        return address;
    }
}

module.exports = AddressService;
