Template.CandEmpHistory.events({
    "submit #emphistoryform": function(event){
        showLoadingMask();
        event.preventDefault();
        var obj = {
            name: event.target.name.value,
            jobTitle: event.target.jobTitle.value,
            jobDescription: event.target.jobDescription.value,
            street: event.target.street.value,
            unit: event.target.unit.value,
            city: event.target.city.value,
            state: event.target.state.value,
            zipCode: event.target.zipCode.value,
            country: event.target.country.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            fax: event.target.fax.value,
            from: event.target.from.value,
            to: event.target.to.value,
            ifthisisYourCurrentEmployement: event.target.ifthisisYourCurrentEmployement.checked
        };

        Meteor.call('insertCandidateEmpHistory', obj, function(err, res) {
            hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Candidate employement history saved successfully.');
                setTimeout(function () {
                  $('.datepicker').datepicker({
                      autoclose: true,
                      todayHighlight: true
                  }).on('changeDate',function () {
                    $(this).parsley().validate();
                    });
                }, 1000);

            }
        });

      },


});

Template.CandEmpHistory.onRendered(function() {
  $('#emphistoryform').parsley({
      trigger: 'blur'
  });
setTimeout(function () {
  $('.datepicker').datepicker({
      autoclose: true,
      todayHighlight: true
  }).on('changeDate',function () {
    $(this).parsley().validate();
    });
}, 1000);


});

Template.CandEmpHistory.helpers({
  isCandidate: function () {
    if (Meteor.user())
    {
      if (Meteor.user().profile.role == "candidate" && !this.approvalData) {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.employmentHistory) {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && this.approvalData.employmentHistory && this.approvalData.employmentHistory.approvalDocData.employerApproval == false && this.approvalData.employmentHistory.approvalDocData.attorneyApproval == false) {
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


// Template.CandEmpHistory.helpers({
//   isCandidate:function(){
//     if(Meteor.user().profile.role == "candidate" && !this.approvalData)
//     {
//       return true;
//     }
//     else if(Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.employmentHistory)
//     {
//       return true;
//     }
//     else {
//       return false;
//     }
//   }
//
// });
