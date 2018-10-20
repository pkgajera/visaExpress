Template.createEmployerCandidate.events({
    'submit #contactform': function(e, t) {
        showLoadingMask();
        e.preventDefault();
        debugger;
        var email = trimInput(event.target.email.value);
        var name = trimInput(event.target.name.value);
        var role = trimInput(event.target.role.value);
        var comments = trimInput(event.target.comments.value);
        var obj = {
            email: email,
            name: name,
            role: role,
            comments:comments
        };

        event.target.email.value = "";
        event.target.name.value = "";
        event.target.comments.value = "";


        if (isNotEmpty(role) && isEmail(email)) {

            Meteor.call("createNewEmployerCandidateUsingEnroll", obj, function(error, result) {
              hideLoadingMask();
                if (error) {
                    FlashMessages.sendError(error.reason);
                } else {
                    FlashMessages.sendSuccess('Invitation sent successfully..');
                    // Router.go('/login');
                }
            });

        }
        else {
          hideLoadingMask();
        }
        //prevent Submit
        return false;
    }

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

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError('Please use a avalid email address');
    return false;
};
