import AuthHelper from './auth-helper';

class Auth {
  get configure() {
    return this._authHelper.configureAxiosClient;
  }

  constructor() {
    this._authHelper = new AuthHelper();
  }
}

const authModule = new Auth();

export { authModule, Auth };

export default authModule;
