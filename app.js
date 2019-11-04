class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    // 所有插件启动完毕,应用整体还未启动
    async willReady() {
        const Group = this.app.model.Group;
        const group = await Group.findOne({ isDefault: true });
        if (!group) {
            const defaultGroup = await Group.create({
                name: '艾泽拉斯',
                avatar: '',
                isDefault: true,
            })
            if (!defaultGroup) {
                console.error("创建默认群组失败!");
                return process.exit(1);
            }
        }
    }
    // 应用已经启动完毕
    async didReady() {
        await this.app.model.Socket.remove({});
    }
}

module.exports = AppBootHook;