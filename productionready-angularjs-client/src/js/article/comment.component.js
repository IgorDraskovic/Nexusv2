class CommentCtrl {
  constructor() {
    'ngInject'


  }
}

let Comment = {
  bindings: {
    data: '='
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment
