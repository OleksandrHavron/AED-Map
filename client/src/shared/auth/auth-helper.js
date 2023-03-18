import axios from 'axios';
import { includes } from 'lodash';

class AuthHelper {
  constructor() {
    this._tokenPromise = null;
  }

  getToken = () =>
    JSON.parse(
      localStorage.getItem('authorization') || null
    );

  removeToken = () =>
    localStorage.removeItem('authorization');

  getJWTTokenConfig = () => {
    try {
      const token = this.getToken();
      this._tokenPromise = null;
      return {
        ...(token && { Authorization: `Bearer ${token}` })
      };
    } catch {
      this._tokenPromise = null;
      return {};
    }
  };

  getTransformedConfig = async config => ({
    ...config,
    headers: {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      ...this.getJWTTokenConfig(config)
    }
  });

  prepareRequestsConfig = async config => {
    try {
      return this.getTransformedConfig(config);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  handleResponseOfRequest = error => {
    const blockedCodes = [401, 403];

    if (error && error.response) {
      const errorResponse = error.response;

      if (includes(blockedCodes, errorResponse.status)) {
        // TODO
        // this.authModule.signOut();
        this.removeToken();
      }
    }

    return Promise.reject(error);
  };

  configureAxiosClient = (oConfig, httpClient = axios) => {
    httpClient.defaults.baseURL = oConfig?.baseUrl;

    httpClient.interceptors.request.use(
      this.prepareRequestsConfig
    );

    httpClient.interceptors.response.use(
      oResponse => oResponse.data,
      this.handleResponseOfRequest
    );
  };
}

export default AuthHelper;
