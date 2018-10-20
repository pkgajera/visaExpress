Template.comments.events({
  "submit #commentsform": function(e, t){
      showLoadingMask();
    debugger;
    e.preventDefault();
    var candidateId = readCookie('candiateId')
    if(candidateId == null && Meteor.user().profile.role == "candidate")
    {
      candidateId = Meteor.userId()
    }
    var comment = e.target.comment.value
    if(comment)
    {
      Meteor.call("addCommnets", comment,candidateId,Template.currentData().keyField, function(error, result){
        hideLoadingMask();
        if(error){
          FlashMessages.sendError(error.reason);
        }
        if(result){
          FlashMessages.sendSuccess('comment added successfully.');
        }
      });
    }else {
      FlashMessages.sendError("Please add comment on Input box.");
      hideLoadingMask();
    }
event.target.comment.value = "";
  }
});
