Template.AddressHistory.events({
    "submit #addresshistoryform": function(event){
        showLoadingMask();
        event.preventDefault();
        var obj = {
            street: event.target.street.value,
            unit: event.target.unit.value,
            city: event.target.city.value,
            state: event.target.state.value,
            zipCode: event.target.zipCode.value,
            country: event.target.country.value,
            from: event.target.from.value,
            to: event.target.to.value,

        };

        Meteor.call('insertCandidateAddressHistory', obj, function(err, res) {
            hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Candidate Address history saved successfully.');
                setTimeout(function () {
                  $('.datepicker').datepicker({
                      autoclose: true,
                      todayHighlight: true
                  }).on('changeDate',function () {
                    $(this).parsley().validate();
                    });
                },1000);
            }
        });

      },


});

Template.AddressHistory.onRendered(function() {
  $('#addresshistoryform').parsley({
      trigger: 'blur'
  });
  setTimeout(function () {
    $('.datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    }).on('changeDate',function () {
      $(this).parsley().validate();
      });
  },1000);


});

Template.AddressHistory.helpers({
  isCandidate: function () {
    if(Meteor.user())
    {
      if (Meteor.user().profile.role == "candidate" && !this.approvalData) {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.addressHistory) {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && this.approvalData.addressHistory && this.approvalData.addressHistory.approvalDocData.employerApproval == false && this.approvalData.addressHistory.approvalDocData.attorneyApproval == false) {
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
