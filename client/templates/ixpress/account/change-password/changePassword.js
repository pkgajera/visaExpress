Template.changePassword.onRendered(function() {
    $('#changePasswordForm').parsley({
        trigger: 'blur'
    });

});

Template.changePassword.events({
    'submit #changePasswordForm': function(e) {
        e.preventDefault();
        showLoadingMask();
        $("#btnChangePassword").attr("disabled", true);

      var oldPassword = e.target.oldPassword.value
      var newPassword = e.target.password.value
            Accounts.changePassword(oldPassword, newPassword, function(error) {
                if (error) {
                    FlashMessages.sendError(error.reason);
                } else {
                    FlashMessages.sendSuccess('Password Updated Successfully');
                }
                  $("#btnChangePassword").attr("disabled", false);
                hideLoadingMask();
            });
    }
});
