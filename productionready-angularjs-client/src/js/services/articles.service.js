export default class Articles {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;


  }

// get article from api
get(slug) {
  return this._$http({
    url: this._AppConstants.api + '/articles/' + slug,
    method: 'GET'
  }).then((res) => res.data.article);
}

// creates article
  save(article) {
    let request = {
      url: `${this._AppConstants.api}/articles`,
      method: 'POST',
      data: { article: article }
    };

    return this._$http(request).then((res) => res.data.article);
  }


}
