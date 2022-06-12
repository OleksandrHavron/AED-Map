import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3012';

axios.interceptors.request.use(
  config => {
    const authorization = JSON.parse(
      localStorage.getItem('authorization')
    );
    if (authorization) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response.data
);

const http = {
  get(url, params, cancel) {
    return axios({
      method: 'get',
      url,
      params,
      cancelToken: cancel ? cancel.token : null
    });
  },
  post(url, params, cancel) {
    return axios({
      method: 'post',
      url,
      data: params,
      cancelToken: cancel ? cancel.token : null
    });
  },
  postFormData(url, params, cancel) {
    return axios({
      method: 'post',
      url,
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' },
      cancelToken: cancel ? cancel.token : null
    });
  },
  delete(url, params, cancel) {
    return axios({
      method: 'delete',
      url,
      data: params,
      cancelToken: cancel ? cancel.token : null
    });
  },
  put(url, params, cancel) {
    return axios({
      method: 'put',
      url,
      data: params,
      cancelToken: cancel ? cancel.token : null
    });
  }
};

export default http;
