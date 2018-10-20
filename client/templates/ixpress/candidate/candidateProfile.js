Template.candidateProfile.events({
    "submit #candidateProfile": function(event) {
        showLoadingMask();
        event.preventDefault();
        debugger;

        var obj = {
            title: event.target.title.value,
            firstName: event.target.firstName.value,
            middleName: event.target.middleName.value,
            lastName: event.target.lastName.value,
            benificiaryName: event.target.benificiaryName.value,
            Primary_Field_of_Study:event.target.Primary_Field_of_Study.value,
            levelOfEducation:event.target.levelOfEducation.value,
        };

        Meteor.call('insertCandidateProfile', obj, function(err, res) {
          hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Candidate Profile saved successfully.');
            }
        });

    },
});
Template.candidateProfile.onRendered(function() {
  $('#candidateProfile').parsley({
      trigger: 'blur'
  });
// setTimeout(function () {
//   $('.datepicker').datepicker({
//       autoclose: true,
//       todayHighlight: true
//   });
// }, 1000);


});

Template.candidateProfile.helpers({
isCandidate:function(){
  if(Meteor.user())
  {
    if(Meteor.user().profile.role == "candidate")
    {
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
