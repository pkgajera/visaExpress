Template.forgotPassword.events({
  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();
    debugger;
showLoadingMask();
    var forgotPasswordForm = $(e.currentTarget),
        email = (forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase()).trim();

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: email}, function(err) {
        hideLoadingMask();
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
              FlashMessages.sendError('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
            FlashMessages.sendError('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
          FlashMessages.sendSuccess('Email Sent. Check your mailbox.');
        }
      });

    }

    return false;
  },
});
//
// if (Accounts._resetPasswordToken) {
//   Session.set('resetPassword', Accounts._resetPasswordToken);
// }
//
// Template.resetPassword.helpers({
//  resetPassword: function(){
//    debugger;
//   return Session.get('resetPassword');
//  }
// });

Template.resetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Router.current().params['token'], password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
             FlashMessages.sendError(err.reason);
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
          FlashMessages.sendSuccess('Your password has been changed. Welcome back!');
          Router.go('login')
        }
      });
    }
    return false;
  }
});
