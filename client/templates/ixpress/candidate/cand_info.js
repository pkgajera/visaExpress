Template.CandInfo.events({
    "submit #candidateInfo": function(event) {
        showLoadingMask();
        event.preventDefault();
        debugger;

        var obj = {
            title: event.target.title.value,
            firstName: event.target.firstName.value,
            middleName: event.target.middleName.value,
            lastName: event.target.lastName.value,
            maidenName: event.target.maidenName.value,
            otherName: event.target.otherName.value,
            maritalStatus: event.target.maritalStatus.value,
            gender: event.target.gender.value,
            dateOfBirth: new Date(event.target.dateOfBirth.value),
            cityOfBirth: event.target.cityOfBirth.value,
            stateOfBirth: event.target.stateOfBirth.value,
            countryOfBirth: event.target.countryOfBirth.value,
            cellPhone: event.target.cellPhone.value,
            dayPhone: event.target.dayPhone.value,
            eveningPhone: event.target.eveningPhone.value,
            socialSecurityNumber: event.target.socialSecurityNumber.value,
            countryOfNationality: event.target.countryOfNationality.value,
            alienNumber: event.target.alienNumber.value,
            passportNumber: event.target.passportNumber.value,
            passportIssueingCountry: event.target.passportIssueingCountry.value,
            passportIssuedDate: new Date(event.target.passportIssuedDate.value),
            passportExpireDate: new Date(event.target.passportExpireDate.value),
            arrivalDateLastEntryDateInUS: new Date(event.target.arrivalDateLastEntryDateInUS.value),
            arrivalCityPortOfEntry: event.target.arrivalCityPortOfEntry.value,
            arrivalStatePortOfEntry: event.target.arrivalStatePortOfEntry.value,
            higestEducation: event.target.higestEducation.value,
            fieldOfStudy: event.target.fieldOfStudy.value,
            notes: event.target.notes.value,
            email: event.target.email.value
        };

        Meteor.call('insertCandidateGenInfo', obj, function(err, res) {
          hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Candidate Info saved successfully.');
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
Template.CandInfo.onRendered(function() {
  $('#candidateInfo').parsley({
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

Template.CandInfo.helpers({
isCandidate:function(){
  if(Meteor.user())
  {
    if(Meteor.user().profile.role == "candidate" && !this.approvalData)
    {
      return true;
    }
    else if(Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.generalInfo)
    {
      return true;
    }
    else if(Meteor.user().profile.role == "candidate" && this.approvalData && this.approvalData.generalInfo && this.approvalData.generalInfo.approvalDocData.employerApproval==false && this.approvalData.generalInfo.approvalDocData.attorneyApproval==false)
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
