module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AddressSchema = new Schema({
        // 创建人
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // 名字
        name: {
            type: String,
            trim: true,
            match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
        },
        // 手机号
        mobile: {
            type: String,
            match: /^1(3|4|5|6|7|8|9)\d{9}$/,
        },
        // 省
        province: { type: String },
        // 市
        city: { type: String },
        // 区
        area: { type: String },
        // 省 code
        provinceCode: { type: String },
        // 市 code
        cityCode: { type: String },
        // 区 code
        areaCode: { type: String },
        // 详细地址
        detail: { type: String },
        // 是否是默认地址
        isDefault: { type: Boolean },
    });
    return mongoose.model('Address', AddressSchema);
}