Template.employerViewTable.helpers({
    selector: function () {
        var currentUser = Meteor.user();
        if (currentUser && currentUser.profile.role == "employer" && currentUser.profile.isCompany) {
            var email_domain = currentUser.emails[0].address.split('@')[1];
            // var domainString = '^([a-zA-Z0-9_.-])+\@(('+email_domain+')+.)+([a-zA-Z0-9]{2,4})+$';
            return {
                "profile.role": 'employer',
                "profile.attorneyId": currentUser.profile.attorneyId,
                'emails.0.address': {
                                 $regex: email_domain,
                                    $options: 'i'
                                        }
            };
        }
        else {
            return {
                "profile.role": 'employer',
                "profile.attorneyId": Meteor.userId()
            };
        }
    }
});

Template.employerViewTable.events({
    "click #view-candidate-button-list": function (e, t) {
        e.preventDefault();
        debugger;
        Router.go('candidateList', {
            _id: $(e.currentTarget).attr('data-id')
        });
    },
     "click #view-employer-profile": function (e, t) {
        e.preventDefault();
        debugger;
        Router.go('employerProfile', {
            _id: $(e.currentTarget).attr('data-id')
        });
    },
     "click #admin-candidate-button-list": function (e, t) {
        e.preventDefault();
        debugger;
        Meteor.call("makeEmployerAsAdmin",$(e.currentTarget).attr('data-id'),function(err,res){
if(res)
{
    FlashMessages.sendSuccess('Company registered as admin successfully..');
}
        })
    },
    
});
