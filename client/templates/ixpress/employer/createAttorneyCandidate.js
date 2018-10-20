Template.createAttorneyCandidate.events({
    'submit #contactform': function (event, t) {
        showLoadingMask();
        event.preventDefault();
        debugger;
        var email = trimInput(event.target.email.value);
        var name = trimInput(event.target.name.value);
        var role = trimInput(event.target.role.value);
        var comments = trimInput(event.target.comments.value);
        var visaType = trimInput(event.target.visaType.value);
        var processStatus = trimInput(event.target.processStatus.value);
        var dob = trimInput(event.target.dob.value);
        var phone = trimInput(event.target.phone.value);
        var location = trimInput(event.target.location.value);
        var obj = {};
        if (role == 'candidate') {
            obj = {
                email: email,
                name: name,
                role: role,
                comments: comments,
                visaType: visaType,
                processStatus: processStatus,
                dob: dob,
                phone: phone,
                location: location,
            };
        }
        else {
            obj = {
                email: email,
                name: name,
                role: role,
                comments: comments,
            };
        }

        if (obj.role == 'attorney' && Meteor.user().profile.attorneyId) {
            hideLoadingMask();
            FlashMessages.sendError('You are already linked with another attorney.');
        }
        else {
            if (isNotEmpty(role) && isEmail(email) && IsBusinessEmailRoleWise(email, obj.role)) {

                Meteor.call("createNewAttorneyCandidateUsingEnroll", obj, function (error, result) {
                    hideLoadingMask();
                    debugger;
                    if (error) {
                        FlashMessages.sendError(error.reason);
                    } else {
                        FlashMessages.sendSuccess('Invitation sent successfully..');
                        event.target.email.value = "";
                        event.target.name.value = "";
                        event.target.comments.value = "";
                        event.target.visaType.value = "";
                        event.target.processStatus.value = "";
                        event.target.dob.value = "";
                        event.target.phone.value = "";
                        event.target.location.value = "";
                        // Router.go('/login');
                    }
                });
            }
            else {
                hideLoadingMask();
            }
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


Template.createAttorneyCandidate.onRendered(function () {

    $('#contactform').parsley({
        trigger: 'blur'
    });
 // If this code is commented, there will be two validation messages (one for each field).
    $.listen('parsley:field:validated', function(fieldInstance){
        if (fieldInstance.$element.is(":hidden")) {
            // hide the message wrapper
            fieldInstance._ui.$errorsWrapper.css('display', 'none');
            // set validation result to true
            fieldInstance.validationResult = true;
            return true;
        }
    });
    $('.datepicker').datepicker({
        autoclose: true,
        todayHighlight: true

    }).on('changeDate', function () {
        $(this).parsley().validate();
    });



});

Template.createAttorneyCandidate.helpers({
  visaType:function(){
      return visaStatus;
  },
  processType :function(){
      return processStatus;
  }
});

var trimInput = function (val) {
    return val.replace(/^\$*|\$*$/g, "");
}

//Check For Empty Fields
isNotEmpty = function (value) {
    if (value && value !== '') {
        return true;
    }
    FlashMessages.sendError("Please fill in all fields");
    return false;
};

isEmail = function (value) {
    var filter = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError('Please use a avalid email address');
    return false;
};

var IsBusinessEmailRoleWise = function (value, userType) {
    if (userType == "candidate") {
        return true;
    }
    var filter = /^([\w-.]+@(?!gmail\.)(?!yahoo\.)(?!hotmail\.)(?!ymail\.)(?!hotmail\.)([\w-]+.)+[\w-]{2,4})?$/;

    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError('Please enter your business email, we do not accept Gmail, Yahoo, Hotmail, etc.');
    return false;
};
