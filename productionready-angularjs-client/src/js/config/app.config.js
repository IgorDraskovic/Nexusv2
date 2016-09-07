function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    resolve: {
      auth: function(User) {
        return User.verifyAuth();
      }
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
