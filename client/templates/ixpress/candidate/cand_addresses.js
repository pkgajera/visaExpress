Template.CandAddresses.events({
    "submit #candidateaddressesform": function(event){
        showLoadingMask();
        event.preventDefault();
        var obj = {
            mailing_careof: event.target.mailing_careof.value,
            mailing_street: event.target.mailing_street.value,
            mailing_unit: event.target.mailing_unit.value,
            mailing_city: event.target.mailing_city.value,
            mailing_state: event.target.mailing_state.value,
            mailing_zipCode: event.target.mailing_zipCode.value,
            mailing_country: event.target.mailing_country.value,

            us_careof: event.target.us_careof.value,
            us_street: event.target.us_street.value,
            us_unit: event.target.us_unit.value,
            us_city: event.target.us_city.value,
            us_state: event.target.us_state.value,
            us_zipCode: event.target.us_zipCode.value,

            abroad_careof: event.target.abroad_careof.value,
            abroad_street: event.target.abroad_street.value,
            abroad_unit: event.target.abroad_unit.value,
            abroad_city: event.target.abroad_city.value,
            abroad_state: event.target.abroad_state.value,
            abroad_zipCode: event.target.abroad_zipCode.value,
            abroad_country: event.target.abroad_country.value,

            consulate_careof: event.target.consulate_careof.value,
            consulate_street: event.target.consulate_street.value,
            consulate_unit: event.target.consulate_unit.value,
            consulate_city: event.target.consulate_city.value,
            consulate_state: event.target.consulate_state.value,
            consulate_zipCode: event.target.consulate_zipCode.value,
            consulate_country: event.target.consulate_country.value,



        };

        Meteor.call('insertCandidateAddresses', obj, function(err, res) {
            hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Candidate Addresses saved successfully.');
            }
        });

      },


});

Template.CandAddresses.onRendered(function() {
  $('#candidateaddressesform').parsley({
      trigger: 'blur'
  });

});

Template.CandAddresses.helpers({
  isCandidate: function () {
    if(Meteor.user())
    {
      if (Meteor.user().profile.role == "candidate" && !this.approvalData) {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.candidateAddresses) {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && this.approvalData.candidateAddresses && this.approvalData.candidateAddresses.approvalDocData.employerApproval == false && this.approvalData.candidateAddresses.approvalDocData.attorneyApproval == false) {
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
