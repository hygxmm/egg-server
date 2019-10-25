module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        // 注册时间
        createTime: {
            type: Date,
            default: Date.now
        },
        // 最后登录时间
        lastLoginTime: {
            type: Date,
            default: Date.now
        },
        // 用户名
        username: {
            type: String,
            trim: true,
            match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
            index: true,
            default: '',
        },
        // 手机号
        mobile: {
            type: Number,
            index: true,
            unique: true,
            match: /^1(3|4|5|6|7|8|9)\d{9}$/,
        },
        // 密码
        password: String,
        // 头像
        avatar: {
            type: String,
            default: ''
        },
    });
    return mongoose.model('User', UserSchema, 'user');
}