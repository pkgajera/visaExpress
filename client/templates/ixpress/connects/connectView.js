

Template.connectView.helpers({
 connectsMainReason:function(){
     var connectData = connects.findOne({});
     if(connectData)
     {
     return connectData.ticketConnect[0];
     }
 },
 requestorName:function(reqID){
     var userData = user.findOne({_id:reqID});
     debugger;
     if(userData)
     {
    return userData.profile.name;
     }
     return '';
 },
 otherUserConnects:function(){
     var allConnectsData = connects.findOne({});
     if(allConnectsData)
     {
var ticketConnectArray = allConnectsData.ticketConnect
     ticketConnectArray.splice(0,1);
     return ticketConnectArray;
    }
    else
    {
        return [];
    }
     
 },
 isRequestor:function(reqID){
if(Meteor.userId() == reqID)
{
return false;
}
else
{
return true;
}
 },
 isTicketClose:function(status){
if(status == "pending" || status == "processing")
{
return true;
}
else
{
return false;
}
 }
});


Template.connectView.onRendered(function () {
    $('#connectForm').parsley({
        trigger: 'blur'
    });
});



Template.connectView.events({
    'submit #connectComment': function (event, t) {
        showLoadingMask();
        event.preventDefault();
        debugger;
var comment = event.target.comments.value;
if(comment)
{
     Meteor.call("addTicketComment", comment,Router.current().params._id, function (error, result) {
                    hideLoadingMask();
                    debugger;
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        event.target.comments.value = "";
                    }
                });

}
else
{
hideLoadingMask();
FlashMessages.sendError('Please enter Comment');
}
        //prevent Submit
        return false;
    },
    'change #connectStatus':function(event,t)
    {
         showLoadingMask();
        event.preventDefault();
        var connectStatus = $(event.currentTarget).val();
if(connectStatus)
{
         Meteor.call("ticketStatusUpdate",connectStatus,Router.current().params._id, function (error, result) {
                    hideLoadingMask();
                    debugger;
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                         FlashMessages.sendSuccess('Ticket Status Updated successfully..');
                    }
                });
}


    }
   
});
