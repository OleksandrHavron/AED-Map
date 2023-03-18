import io from 'socket.io-client';

import { signOut } from 'shared/store/user/actions';
import store from '../store';
import { BASE_URL } from 'shared/consts/url';

const socket = io(`${BASE_URL}`, {
  autoConnect: false
});

const getToken = () =>
  JSON.parse(localStorage.getItem('authorization') || null);

const socketAuthOpen = (token = getToken()) => {
  socket.connect();

  socket.emit('authorization', token);
};

const socketAuthClose = () => {
  socket.disconnect();
};

socket.on('disconnect', () => {
  store.dispatch(signOut());
});

export { socketAuthOpen, socketAuthClose };
