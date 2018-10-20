Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

userRoles = ["attorney", "employer", "candidate"];

var loginPath = "login";

var defaultAttorneyPath = "employerList";
var defaultEmployerPath = "createAttorneyCandidate";
var defaultCandidatePath = "cand_dashboard";

var roleMap = [{
        route: "employerList",
        roles: ["attorney","employer"]
    },
    {
        route: "createEmployerCandidate",
        roles: ["attorney"]
    },
    {
        route: "createAttorneyCandidate",
        roles: ["employer"]
    },
    {
        route: "candidateList",
        roles: ["attorney","employer"]
    },
    {
        route: "createEmployerFromAttorney",
        roles: ["attorney"]
    },
    {
        route: "createCandidateFromAttorney",
        roles: ["attorney"]
    },
    {
        route: "candidateProfile",
        roles: ["candidate"]
    },
    {
        route: "attorneyProfile",
        roles: ["attorney"]
    },
    {
        route: "employerProfile",
        roles: ["employer","attorney"]
    }
];

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
    if(routeName == "employerList" && Meteor.user() && Meteor.user().profile.role == "employer" && !Meteor.user().profile.isCompany)
    {
        return false;
    }
    if (!routeName) {
        // route without name - enable access (?)
        return true;
    }

    if (!roleMap || roleMap.length === 0) {
        // this app don't have role map - enable access
        return true;
    }

    var roleMapItem = _.find(roleMap, function(roleItem) {
        return roleItem.route == routeName;
    });
    if (!roleMapItem) {
        // page is not restricted
        return true;
    }

    if (!Meteor.user() || !Meteor.user().profile.role) {
        // user is not logged in
        return false;
    }

    // this page is restricted to some role(s), check if user is in one of allowedRoles
    var allowedRoles = roleMapItem.roles;
    var granted = _.intersection(allowedRoles, [Meteor.user().profile.role]);
    if (!granted || granted.length === 0) {
        return false;
    }
    return true;
};


var loginrequired = function() {

    if (Meteor.userId()) {
      if(Meteor.user())
      {
        if (Meteor.user().profile.role == userRoles[0]) {
            if (!routeGranted(this.route.getName())) {
                Router.go(defaultAttorneyPath);
            } else {
                this.next();
            }
        } else if (Meteor.user().profile.role == userRoles[1]) {
            if (!routeGranted(this.route.getName())) {
                if(this.route.getName() == "employerList" && Meteor.user().profile.isCompany)
                {
                    this.next();
                }
                else
                {
                    Router.go(defaultEmployerPath);
                }
            } else {
                this.next();
            }
        } else if (Meteor.user().profile.role == userRoles[2]) {
            if (!routeGranted(this.route.getName())) {
                Router.go(defaultCandidatePath);
            } else {
                this.next();
            }
        }
      }
      else {
          this.next();
      }
    } else {
        Router.go(loginPath);
    }
};

var goToDashboard = function(pause) {
    debugger;
    if (Meteor.userId()) {
        if (Meteor.user() != undefined && Meteor.user().profile != undefined) {

            if (Meteor.user().profile.role == userRoles[0]) {
                Router.go(defaultAttorneyPath);
            } else if (Meteor.user().profile.role == userRoles[1]) {
                Router.go(defaultEmployerPath);
            } else if (Meteor.user().profile.role == userRoles[2]) {
                Router.go(defaultCandidatePath);
            }
        } else {
            LaunchScreen.hold();
        }
    } else {
        this.next();
    }
};

if (Meteor.isClient) {
    dataReadyHold = LaunchScreen.hold();

    Router.onBeforeAction(loginrequired, {
        except: ['register', 'login', 'enrollAccount','invitesend','inviteaccept','verify-email','forgotPassword','resetPassword']
    });
    Router.onBeforeAction(goToDashboard, {
      only: ['login','register']
    });
}

Router.route('/', function() {
    Router.go('register');
});

Router.route('/dashboard', function() {
    this.render('dashboard');
});

Router.route('/upload', function() {
    this.render('upload');
});

Router.route('/employerDashboard', function() {
    this.render('employerDashboard');
});
Router.route('/employerDocuments', function() {
    this.render('employerDocuments');
});

Router.route('/attorneyList', function() {
    this.render('attorneyList');
});

// Router.route('/verify-email/:token', {
//     name: 'verify-email',
//     action(params) {
//       debugger;
//         Accounts.verifyEmail(this.params.token, (error) => {
//             if (error) {
//                 Bert.alert(error.reason, 'danger');
//             } else {
//                 FlowRouter.go('/');
//                 Bert.alert('Email verified! Thanks!', 'success');
//             }
//         });
//     }
// });


Router.route('/signup', function() {
    this.render('signup');
});

Router.route('/index', function() {
    this.render('index');
});

Router.route('/fileListUpload', function() {
    this.render('fileListUpload');
});

Router.route('/attorneyDashboard', function() {
    this.render('attorneyDashboard');
});

Router.map(function() {

  this.route('candidateProfile', {
          path: '/candidateProfile',
          waitOn:function(){
            Meteor.subscribe("profileData"); 
          },
          data: function () {
          if (this.ready()) {
                  return {
                      candidateProfileData: userProfile.findOne({userId:Meteor.userId()})
                  }
              }
          }
      });

       this.route('attorneyProfile', {
          path: '/attorneyProfile',
          waitOn:function(){
            Meteor.subscribe("profileData");
          },
          data: function () {
          if (this.ready()) {
                  return {
                      attorneyProfileData: userProfile.findOne({userId:Meteor.userId()})
                  }
              }
          }
      });

       this.route('employerProfile', {
          path: '/employerProfile/:_id?',
          waitOn:function(){
              var employerId = Meteor.userId();
               if(this.params._id)
            {
                employerId=this.params._id;
            }
            Meteor.subscribe("employerProfileData",employerId);
          },
          data: function () {
          if (this.ready()) {
               var employerId = Meteor.userId();
               if(this.params._id)
            {
                employerId=this.params._id;
            }
                  return {
                      employerProfileData: userProfile.findOne({userId:employerId})
                  }
              }
          }
      });

  this.route('register', {
      path: '/register',
      layoutTemplate: false,
  });
  this.route('login', {
      path: '/login',
layoutTemplate: false,
  });
    this.route('enrollAccount', {
        path: '/enroll-account/:token',
      layoutTemplate: false,
    });
    this.route('createAttorneyCandidate', {
        path: '/createAttorneyCandidate',
        // onBeforeAction: function() {
        //     if (this.ready()) {
        //         // Handle for launch screen defined in app-body.js
        //         dataReadyHold.release();
        //     }
        //     this.next();
        // },
    });

    this.route('createEmployerCandidate', {
        path: '/createEmployerCandidate',
        // onBeforeAction: function() {
        //     if (this.ready()) {
        //         // Handle for launch screen defined in app-body.js
        //         dataReadyHold.release();
        //     }
        //     this.next();
        // },
    });

    this.route('createEmployerFromAttorney', {
        path: '/createEmployerFromAttorney'
    });
    this.route('createCandidateFromAttorney', {
        path: '/createCandidateFromAttorney'
    });

    this.route('candidateList', {
        path: '/candidateList/:_id',
        waitOn:function(){
          Meteor.subscribe("employerList");
        }
    });

    this.route('employerList', {
        path: '/employerList',
        waitOn:function(){
          Meteor.subscribe("employerList");
        }
    });
    this.route('employmentVerification', {
        path: '/employmentVerification',
        waitOn:function(){
          debugger;
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListEmployementVerification",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });

    this.route('cand_dashboard', {
        path: '/cand_dashboard',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          if(!candidtID && Meteor.user() && Meteor.user().profile.role == 'candidate')
          {
            candidtID = Meteor.userId();
            document.cookie = "candiateId="+Meteor.userId();
          }
          return [
            // Meteor.subscribe("candidateDocList",candidtID),Meteor.subscribe("candidateDocListForCommon",candidtID)
                  Meteor.subscribe("candidateDocList",candidtID)
            ];
        }
    });
    this.route('cand_info', {
        path: '/cand_info',
        waitOn:function(){
          debugger;
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateGenInfo",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    candidateData: candidateInfo.findOne({}),
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });

    this.route('cand_emp_history', {
        path: '/cand_emp_history',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateEmpHis",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    candidateEmployementData: employementHistory.findOne({}),
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('edu_history', {
        path: '/edu_history',
        waitOn:function(){
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateEduHis",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    candidateEducationData: educationHistory.findOne({}),
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });

    this.route('payslips', {
        path: '/payslips',
        waitOn:function(){
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListPaySlips",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('educationalCredentials', {
        path: '/educationalCredentials',
        waitOn:function(){
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListeducationCredentials",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('passport', {
        path: '/passport',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListpassport",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('resume', {
        path: '/resume',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListupdatedResume",candidtID);
        },
        data: function () {
        if (this.ready()) {
          debugger;
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('previousPassport', {
        path: '/previousPassport',
        waitOn:function(){
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListpreviouspassport",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('previousApproval', {
        path: '/previousApproval',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListpreviousApprovalNotices",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('i94', {
        path: '/i94',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListi_94",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('educationEvaluation', {
        path: '/educationEvaluation',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListeducationEvaluation",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('ssCard', {
        path: '/ssCard',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListsocialSecurityCard",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('marriageCertificate', {
        path: '/marriageCertificate',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListh4_h1_cos_Marriage_Certificate",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('spouseH1B', {
        path: '/spouseH1B',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListh4_h1_cos_Spouse_h1_b_approvalNotice",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('spousePassport', {
        path: '/spousePassport',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListh4_h1_cos_Spouse_passport_visaStamp_i_94",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('spouseRecentw2', {
        path: '/spouseRecentw2',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListh4_h1_cos_Spouse_recent_w2",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });
    this.route('spousePaystubs', {
        path: '/spousePaystubs',
        waitOn:function(){
          var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateDocListh4_h1_cos_Spouse_payStubs",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });


    this.route('address_history', {
        path: '/address_history',
        waitOn:function(){
          debugger;
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateAddressHistory",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    candidateAddressData: addressHistory.findOne({}),
                    approvalData: candidateDocApproval.findOne({})
                }
            }
            else {
              this.next();
            }
        }
    });

      this.route('connects', {
        path: '/connects',
        waitOn:function(){
          Meteor.subscribe("connectsDetail");
        }
    });

this.route('connectList', {
        path: '/connectList',
    });

    this.route('connectView', {
        path: '/connectView/:_id',
        waitOn:function(){
          Meteor.subscribe("connectsDetailView",this.params._id);
        },
        data: function () {
        if (this.ready()) {
                return {
                    connectsData: connects.findOne({_id:this.params._id})
                }
            }
            else {
              this.next();
            }
        }
    });

     this.route('proposedJob', {
        path: '/proposedJob/:_type/:employerId?',
        waitOn:function(){
          debugger;
            var candidtID = null;
            var employerId = null;
            if(this.params.employerId)
            {
                employerId=this.params.employerId;
            }
            if(this.params._type == 'candidate')
            {
                candidtID = readCookie('candiateId');
            }
            else
            {
                candidtID = Meteor.userId();
            }
          Meteor.subscribe("candidateProposedJob",candidtID,employerId);
        },
        data: function () {
        if (this.ready()) {
                return {
                    proposedJobData: proposedJob.findOne({})
                }
            }
            else {
              this.next();
            }
        }
    });

    this.route('cand_addresses', {
        path: '/cand_addresses',
        waitOn:function(){
          debugger;
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateAddresses",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    candidateAddressesData: candidateAddresses.findOne({}),
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });

 this.route('relatives_info', {
        path: '/relatives_info',
        waitOn:function(){
          debugger;
            var candidtID = readCookie('candiateId');
          Meteor.subscribe("candidateRelativeInfo",candidtID);
        },
        data: function () {
        if (this.ready()) {
                return {
                    candidateRelativeData: relativesInfo.findOne({}),
                    approvalData: candidateDocApproval.findOne({})
                }
            }
        }
    });


        this.route('forgotPassword', {
            path: '/forgot-password',
        layoutTemplate: false,
        });
        this.route('resetPassword', {
            path: '/reset-password/:token',
        layoutTemplate: false,
        });
        this.route('changePassword', {
            path: '/change-password'
        });

    this.route('invitesend', {
        path: '/invite-send/:_id',
      layoutTemplate: false,
      waitOn:function(){
        Meteor.call("acceptInviteLinkFromUser", this.params._id, function(error, result){
          debugger;
          if(error){
            FlashMessages.sendError(error.reason);
             Router.go('login');
          }
        else{
            FlashMessages.sendSuccess("Now, You are linked with invited user..");
            Meteor.logout();

            document.cookie = 'candiateId=; expires='+new Date()+';';
             Router.go('inviteaccept');
          }
        });
      },
    });

    this.route('inviteaccept', {
        path: '/inviteaccept',
      layoutTemplate: false

    });

    this.route('verify-email', {
        path: '/verify-email/:token',
      layoutTemplate: false,
      action(params) {
        debugger;
          Accounts.verifyEmail(this.params.token, (err) => {
            if (err) {
            if (err.message == 'Verify email link expired [403]' && !verificationFlag) {
                FlashMessages.sendError("Verify email link expired.");
            } else {
                FlashMessages.sendError(err.reason);
            }
            Router.go('login');
        } else {
            FlashMessages.sendSuccess("Your account verified successfully.");
              Router.go('login');
        }

          });
      }
    });

    this.route('chatPanel', {
        path: '/message',
    waitOn:function(){
          Meteor.subscribe("chatSubscription");
        },
    });

});
