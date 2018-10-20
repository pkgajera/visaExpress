

Template.connects.helpers({
  categoryList:function(){
      if(Meteor.user() && Meteor.user().profile.role == "candidate")
      {
        return connectCategoryForCandidate;
      }
      else
      {
        return connectCategoryForEmploAtto;  
      }
  },
  userList :function(){
      debugger;
      return user.find({_id:{$ne:Meteor.userId()}},{fields:{'profile.name':1,'_id':1}}).fetch();
  }
});


Template.connects.onRendered(function () {
    $('#connectForm').parsley({
        trigger: 'blur'
    });
});



Template.connects.events({
    'submit #connectForm': function (event, t) {
        showLoadingMask();
        event.preventDefault();
        debugger;

        var connectWith = '';
        if(event.target.connectWith)
        {
            connectWith = event.target.connectWith.value;
        }
        var category = event.target.category.value;
        var subject = event.target.subject.value;
        var info = event.target.info.value;
      
            obj = {
                connectWith: connectWith,
                category: category,
                subject: subject,
                info: info,
                
            };
       
            if (obj.subject =="" || obj.info == "" || obj.category == "") {
                    FlashMessages.sendError('Please enter subject and info fields.');
                    hideLoadingMask();
            }
            else {
               
                 Meteor.call("generateNewTicketConnect", obj, function (error, result) {
                    hideLoadingMask();
                    debugger;
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess('Connect ticket generated successfully..');
                        event.target.connectWith.value = "";
                        event.target.category.value = "";
                        event.target.subject.value = "";
                        event.target.info.value = "";
                    }
                });
            }
        
        //prevent Submit
        return false;
    },
    'change #userRole': function (e, t) {
        if ($(e.currentTarget).val() == "candidate") {
            $('#candidateSection').show();
        }
        else {
            $('#candidateSection').hide();
        }
    }

});
