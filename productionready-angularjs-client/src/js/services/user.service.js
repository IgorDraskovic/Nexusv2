export default class User {
  constructor(AppConstants, $http) {
    'ngInject';

    //reference to services for our methods to access
    this._AppConstants = AppConstants;
    this._$http = $http;
    //current user
    this.current = null;

  }

  //try to auth register or login
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this.current = res.data.user;

        return res;
      }
    );
  }
}
