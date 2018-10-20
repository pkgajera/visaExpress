Template.commentsread.helpers({
  commentsArray: function(){
    // if(Router.current().route._path == "/cand_info")
    // {
    //   keyField = "generalInfo";
    // }
    var commentsArray = [];
if(this.approvalData && this.approvalData.comments)
{
  commentsArray = this.approvalData.comments.filter(function(d,i){
    return d.keyField == Template.currentData().keyField
  })
}

return Enumerable.From(commentsArray).OrderByDescending('$.commentDate').ToArray();
  }
});
