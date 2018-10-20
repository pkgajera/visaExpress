Template.attorneyProfile.events({
    "submit #attorneyProfile": function(event) {
        showLoadingMask();
        event.preventDefault();
        debugger;

        var obj = {
            title: event.target.title.value,
            firstName: event.target.firstName.value,
            middleName: event.target.middleName.value,
            lastName: event.target.lastName.value,
            companyName: event.target.companyName.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            street: event.target.street.value,
            unit: event.target.unit.value,
            city: event.target.city.value,
            state: event.target.state.value,
            zipCode: event.target.zipCode.value,
            country: event.target.country.value,
            rateofPayPerYear: event.target.rateofPayPerYear.value,
            number: event.target.number.value,
            Fax_Number: event.target.Fax_Number.value,
            province: event.target.province.value,
            DayTime_Number: event.target.DayTime_Number.value,

        };

        Meteor.call('insertAttorneyProfile', obj, function(err, res) {
          hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Attorney Profile saved successfully.');
            }
        });

    },
});
Template.attorneyProfile.onRendered(function() {
  $('#attorneyProfile').parsley({
      trigger: 'blur'
  });
// setTimeout(function () {
//   $('.datepicker').datepicker({
//       autoclose: true,
//       todayHighlight: true
//   });
// }, 1000);
});


Template.attorneyProfile.helpers({
isAttorney:function(){
  if(Meteor.user())
  {
    if(Meteor.user().profile.role == "attorney")
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
