const jwt = require('jsonwebtoken');
const timer = require('long-timeout');
const socketio = require('socket.io');

// Model of the collection 'users'
const { User } = require('../../db/models');

module.exports = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    socket.on('authorization', (authorization) => {
      jwt.verify(
        authorization,
        process.env.SECRET_JWT_KEY_AUTH,
        async (err, payload) => {
          if (err) {
            socket.disconnect();
            return;
          }

          try {
            const user = await User.findById(payload._id);

            if (!user) {
              socket.disconnect();
              return;
            }

            const expiresIn =
              (payload.exp - Date.now() / 1000) * 1000;
            const timeout = timer.setTimeout(
              () => socket.disconnect(),
              expiresIn
            );

            socket.on('disconnect', () =>
              timer.clearTimeout(timeout)
            );
          } catch (e) {
            console.log(e.message);
          }
        }
      );
    });
  });
};
