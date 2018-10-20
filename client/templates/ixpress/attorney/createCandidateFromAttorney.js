
var autoCompleteEmployerID="";
Template.createCandidateFromAttorney.helpers({
  companySettings: function () {
      return {
          position: "bottom",
          limit: 5,
          rules: [
              {
                  collection: 'user',
                  subscription: 'autocompleteEmployer',
                  field: "profile.name",
                  template: Template.searchEmployerAutoSuggestion
              }]
      };
  },
  visaType:function(){
      return visaStatus;
  },
  processType :function(){
      return processStatus;
  }
});

Template.createCandidateFromAttorney.events({
    'submit #contactform': function(event, t) {
        showLoadingMask();
        event.preventDefault();
        debugger;
        var email = trimInput(event.target.email.value);
        var name = trimInput(event.target.name.value);
        var role = 'candidate';
        var comments = trimInput(event.target.comments.value);
        var employerId = autoCompleteEmployerID;
        var visaType = trimInput(event.target.visaType.value);
        var processStatus = trimInput(event.target.processStatus.value);
        var dob = trimInput(event.target.dob.value);
        var phone = trimInput(event.target.phone.value);
        var location = trimInput(event.target.location.value);

        var obj = {
            email: email,
            name: name,
            role: role,
            comments:comments,
            employerId: employerId,
            visaType: visaType,
            processStatus: processStatus,
            dob: dob,
            phone: phone,
            location: location,
        };

        

        if (isNotEmpty(role)) {

            Meteor.call("createNewEmployerCandidateUsingEnroll", obj, function(error, result) {
              hideLoadingMask();
                if (error) {
                    FlashMessages.sendError(error.reason);
                } else {
                    FlashMessages.sendSuccess('Invitation sent successfully..');
                    event.target.email.value = "";
                    event.target.name.value = "";
                    event.target.comments.value = "";
                    event.target.employerID.value="";
                    event.target.visaType.value = "";
                    event.target.processStatus.value = "";
                    event.target.dob.value = "";
                    event.target.phone.value="";
                    event.target.location.value="";
                    // Router.go('/login');
                }
            });

        }
        else {
          hideLoadingMask();
        }
        //prevent Submit
        return false;
    },
    "autocompleteselect #employerID": function (event, template, doc) {
        autoCompleteEmployerID = doc._id;
    },

});
Template.createCandidateFromAttorney.onRendered(function() {

    $('#contactform').parsley({
      trigger: 'blur'
  });

 $('.datepicker').datepicker({
      autoclose: true,
      todayHighlight: true

  }).on('changeDate',function () {
    $(this).parsley().validate();
    });



});

var trimInput = function(val) {
    return val.replace(/^\$*|\$*$/g, "");
}

//Check For Empty Fields
isNotEmpty = function(value) {
    if (value && value !== '') {
        return true;
    }
    FlashMessages.sendError("Please fill in all fields");
    return false;
};



