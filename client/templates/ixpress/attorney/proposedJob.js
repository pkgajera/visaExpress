Template.proposedJob.events({
    "submit #proposedJobForm": function(event){
        showLoadingMask();
        event.preventDefault();
var currentUser = Meteor.user();
          getValues($('#proposedJobForm'), (values) => {
            debugger;
             if(currentUser && currentUser.profile.role == "employer")
                {
                     values['employerId'] = Meteor.userId();
                }
                else if(currentUser && currentUser.profile.role == "attorney")
                {
                  values['employerId'] = Router.current().params.employerId;
                }

                if(readCookie('candiateId') == null || readCookie('candiateId') == "")
                {
                    values['userId'] = Meteor.userId();
                }
                else if(Router.current().params._type == "employer" || Router.current().params._type == "attorney")
                {
                  values['userId'] = Meteor.userId();
                  values['employerId'] = "";
                }
                else{
                    values['userId'] = readCookie('candiateId');
                }
                
               
               
             Meteor.call('insertProposedJob', values, function(err, res) {
            hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Proposed job saved successfully.');
            }
        });
        });

      },
});

Template.proposedJob.onRendered(function() {
  $('#proposedJobForm').parsley({
      trigger: 'blur'
  });
});

Template.proposedJob.helpers({
  ifNotCandidate: function () {
    if(Meteor.user())
    {
      if (Meteor.user().profile.role == "attorney" ||  Meteor.user().profile.role == "employer") {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

});
