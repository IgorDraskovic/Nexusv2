export default class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;

    // Object to store our user properties
    this.current = null;
  }

  // Try to authenticate by registering or logging in
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      // On success...
      (res) => {
        // Set the JWT token
        this._JWT.save(res.data.user.token);

        // Store the user's info for easy lookup
        this.current = res.data.user;

        return res;
      }
    );
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    //hard reload of current state to flush all data
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    //promise
    let deferred = this._$q.defer();

    //check for JWT token
    //no token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      //resolve now to stop executing - no token
      return deferred.promise;
    }
    //token & current user
    if (this.current) {
      deferred.resolve(true);


    //if current user not set - get from server
    } else {
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
        headers: {
          Authorization: 'Token ' + this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          deferred.resolve(true);
        },
        //error - invalid token
        (err) => {
          //wrong token, destroy
          this._JWT.destroy();
          deferred.resolve(false);
        }
      );
    }

    return deferred.promise;

  }
}
