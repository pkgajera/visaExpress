Accounts.emailTemplates.siteName = "www.iXpress.Co";
Accounts.emailTemplates.from     = "iXpress <noreply@ixpress.co>";

SSR.compileTemplate("verifyEmailTemplate", Assets.getText("emailTemplate/verifyEmailTemplate.html"));
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[www.iXpress.Co] Verify Your Email Address";
  },
  html( user, url ) {
        urlWithoutHash = url.replace( 'https://chatapp-sailaja.c9users.io/emp_register/#/', '' );
        var textDecore = 'to verify your email address, visit the following link';
        var html = SSR.render("verifyEmailTemplate", {url: urlWithoutHash,user:user,textDecore:textDecore });
        return html;
  }
};

Accounts.urls.verifyEmail = (token) => {
    return Meteor.absoluteUrl('verify-email/' + token);
};
Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl('reset-password/' + token);
};

SSR.compileTemplate("verifyEmailTemplate", Assets.getText("emailTemplate/verifyEmailTemplate.html"));
Accounts.emailTemplates.resetPassword = {
  subject() {
    return "[www.iXpress.Co] Reset Your Password";
  },
  html( user, url ) {
        urlWithoutHash = url.replace( 'https://chatapp-sailaja.c9users.io/emp_register/#/', '' );
        var textDecore = 'To reset your password, visit the following link';
        var html = SSR.render("verifyEmailTemplate", {url: urlWithoutHash,user:user,textDecore:textDecore });
        return html;
  }
};


Accounts.urls.enrollAccount = function (token) {
  return Meteor.absoluteUrl('enroll-account/' + token);
};
SSR.compileTemplate("enrollTemplate", Assets.getText("emailTemplate/ixpresstocandidate.html"));
Accounts.emailTemplates.enrollAccount.html = function (createdUser, url) {
    var textDecore = '';
    var senderName = '';
    if(createdUser.profile.role == "candidate")
    {
      textDecore = 'Please, click below and create your account to upload your documents.';
    }
    else {
      textDecore = 'Please, follow the link to create an account. ';
    }
    if(createdUser.profile.attorneyId)
    {
      senderName = user.findOne({_id:createdUser.profile.attorneyId}).profile.name
    }
    else {
      senderName = user.findOne({_id:createdUser.profile.employerId[0]}).profile.name;
    }
    var html = SSR.render("enrollTemplate", {url: url,user:createdUser,textDecore:textDecore,senderName:senderName,comments:createdUser.profile.comments });
    return html;
};


Accounts.validateLoginAttempt(function (loginAttempt) {
    if (!loginAttempt.allowed) {
          throw new Meteor.Error(901,loginAttempt.error.reason);
    } else {

        // In some cases this method isn't invoked with a correct user object...
        if (!loginAttempt.user) {
            throw new Meteor.Error(903, informationMessages.notValidUser);
        }

        // If email verification is required check if the user has a valid email address and don't allow the login if he has none
            if (!loginAttempt.user.emails[0].verified) {
             throw new Meteor.Error(902, informationMessages.emailVerifiedFirst);
            }
            else if(loginAttempt.user.profile.isDeleted){
                throw new Meteor.Error(902, informationMessages.AccountRemoved);
            }
        // We have a correct login!
        return true;
    }
});
