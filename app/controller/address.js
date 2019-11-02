const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');


class AddressController extends Controller {
    /**
     * 获取地址列表
     */
    async getAddress() {
        const { ctx, config } = this;
        const token = ctx.get('Token');
        const decoded = jwt.verify(token, config.jwt.secret);
        const addrs = await ctx.service.address.findAddress(decoded.uid);
        console.log(addrs);

        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: addrs,
        }
    }
    /**
     * 添加地址
     * 
     */
    async editAddress() {
        const { ctx, config } = this;
        const token = ctx.get('Token');
        const decoded = jwt.verify(token, config.jwt.secret);
        const { id } = ctx.request.body;
        let _data = ctx.request.body;
        if (id) {
            await ctx.service.address.editAddress(_data);
        } else {
            _data.creator = decoded.id;
            await ctx.service.address.addAddress(_data);
        }
        ctx.body = {
            code: 0,
            msg: '操作成功',
            data: null
        }
    }

    /**
     * 编辑地址
     */
}

module.exports = AddressController;
