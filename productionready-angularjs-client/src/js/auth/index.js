import angular from 'angular';

//create the module where functionality attaches to
let authModule = angular.module('app.auth', []);

//Include our ui-router config
import AuthConfig from './auth.config';
authModule.config(AuthConfig);


export default authModule;
