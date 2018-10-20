Template.candidateViewTable.helpers({

  selector: function () {
    return Session.get('candidateList');

  },

});
Template.candidateList.events({
  "change #emplyeeList": function (e, t) {
    selectorSet();
  },
});

function selectorSet() {
  var obj = {}
  var currentUserRole = Meteor.user().profile.role;
  if (currentUserRole == 'attorney') {
    if ($('#emplyeeList').val() != -1) {
      obj = {
        "profile.role": 'candidate',
        'profile.attorneyId': Meteor.userId(),
        'profile.employerId': $('#emplyeeList').val()
      };
    }
    else if (Router.current().params._id == 'optional') {
      obj = {
        "profile.role": 'candidate',
        'profile.attorneyId': Meteor.userId(),
      };
    } else {
      obj = {
        "profile.role": 'candidate',
        'profile.attorneyId': Meteor.userId(),
        'profile.employerId': Router.current().params._id
      };
    }

  } else {
    if (Meteor.user() && Meteor.user().profile.isCompany && Router.current().params._id == 'optional') {

      obj = {
        "profile.role": 'candidate',
        'profile.employerId': Meteor.userId()
      };

      
      
    }
    else if(Meteor.user() && Meteor.user().profile.isCompany && Router.current().params._id != 'optional')
    {
          obj = {
                "profile.role": 'candidate',
                  'profile.employerId': Router.current().params._id,
                'profile.attorneyId': Meteor.user().profile.attorneyId
            }
    }
    else {
      obj = {
        "profile.role": 'candidate',
        'profile.employerId': Meteor.userId()
      };
    }

  }

  Session.set('candidateList', obj);
}
Template.candidateList.onRendered(function () {
  selectorSet();
});
Template.candidateList.helpers({
  employerList: function () {
    return user.find({ "profile.attorneyId": Meteor.userId(), "profile.role": "employer" }).fetch();
  },
  employerIdhelper: function () {
    if (Router.current().params._id == 'optional') {
      return '';
    }
    else {
      return Router.current().params._id;
    }
  }
});
Template.candidateViewTable.events({
  "click #view-candidate-doc-list": function (e, t) {
    e.preventDefault();
    debugger;
    document.cookie = "candiateId=" + $(e.currentTarget).attr('data-id');
    Router.go('cand_dashboard');
  }
});
