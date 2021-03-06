class CommentCtrl {
  constructor(User) {
    'ngInject'

    //user only deletes comment
    if(User.current) {
      this.canModify = (User.current.username === this.data.author.username);
    } else {
        this.canModify = false;
      }
    }

}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&',
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment
