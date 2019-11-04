module.exports = () => {
    return async (ctx, next) => {
        const { app, socket, logger, helper } = ctx;
        const id = socket.id;
        const nsp = app.io.of('/');
        const query = socket.handshake.query;
        // 用户信息
        const { room, userId } = query;
        const rooms = [room];
        logger.debug("user_info", id, room, userId);
        const tick = (id, msg) => {
            logger.debug('tick', id, msg);
            // 踢出用户
            socket.emit(id, helper.parseMsg('deny', msg));
            // 调用 asapter 方法踢出用户,客户端触发 disconnect 事件
            nsp.adapter.remoteDisconnect(id, true, err => {
                logger.error(err);
            });
        }

        // 用户加入
        logger.debug('join', room);
        socket.join(room);

        await next();
        // 用户离开
        logger.debug('leave', room);
    }
}