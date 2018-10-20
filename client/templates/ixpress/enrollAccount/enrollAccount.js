
Template.enrollAccount.events({
  "submit #resetPasswordForm": function(e, t){
    e.preventDefault();
    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      debugger;
      Accounts.resetPassword(Router.current().params['token'], password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
           FlashMessages.sendError(err.reason);
        } else {
          console.log('Your password has been changed. Welcome back!');
           FlashMessages.sendSuccess('Your password has been changed. Welcome back!');
           Router.go('login')
        }
      });
    }
  }
});
