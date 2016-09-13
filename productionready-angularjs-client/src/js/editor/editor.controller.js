class EditorCtrl {
  constructor() {
    'ngInject';

    //article Object

    this.article = {
      title: '',
      description: '',
      body: '',
      tagList: []
    }

  }



addTag() {
  //if tag is not in array...
  if (!this.article.tagList.includes(this.tagField)) {
    this.article.tagList.push(this.tagField);
    this.tagField = '';
  }
}

removeTag(tagName) {
  this.article.tagList = this.article.tagList.filter((slug) => slug != tagName);
  }

}

export default EditorCtrl;
