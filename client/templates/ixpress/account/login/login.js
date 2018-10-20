Template.login.events({
    "submit .form-signin": function(event){
      //showLoadingMask();
        var email = event.target.email.value;
        var password = event.target.password.value;

      Meteor.loginWithPassword(email, password, function(err){
          if(err){
            hideLoadingMask();
              event.target.email.value = email;
              event.target.password.value = password;
              FlashMessages.sendError(err.reason);
          }

          else{
//hideLoadingMask();
              FlashMessages.sendSuccess('You are logged in');
               if(Meteor.user().profile.role =='attorney'){
              Router.go('/employerList');
              }
              else if(Meteor.user().profile.role =='employer'){
                  Router.go('/candidateList/optional');
              }
              else{
                 document.cookie = "candiateId="+Meteor.userId();
                   Router.go('/cand_dashboard');
              }

          }
      });

      //prevent submit

      return false;

    },



});
