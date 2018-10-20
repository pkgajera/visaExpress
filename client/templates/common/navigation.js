Template.navigation.onRendered(function() {

    // Initialize metsiMenu plugin to sidebar menu
  //  $('#side-menu').metisMenu();

    // Sparkline bar chart data and options used under Profile image on navigation
    // $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
    //     type: 'bar',
    //     barWidth: 7,
    //     height: '30px',
    //     barColor: '#62cb31',
    //     negBarColor: '#53ac2a'
    // });
   // Meteor.subscribe("chatSubscription");
   // Meteor.subscribe("chatHistory");

});

Template.navigation.events({

    // Colapse menu in mobile mode after click on element
    'click #side-menu a:not([href$="\\#"])': function(){
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        }
    },
    'click #linkLogout': function(){
      document.cookie = 'candiateId=; expires='+new Date()+';';
      Meteor.logout();
      Router.go('login');
  }
});

Template.navigation.helpers({

    //   messageCountSum: function () {
    //     var currentUser = Meteor.user();
    //     var messageCountSum=0;
        
    //     if (currentUser) {
    //         var userDet =  user.find({ _id: { $ne: Meteor.userId() } }, { fields: {'_id': 1} }).fetch();
    //         userDet.forEach(function(d,i){
    //         var messageCount = 0;
    //         var message =  messages.findOne({$or: [{'requestorId': Meteor.userId(),'resonsorId':d._id}, {'requestorId': d._id,'resonsorId':Meteor.userId()}]});
    //         if(message)
    //         {
    //           messageCount =  message.message.filter(function(dd,ii){
    //                 return dd.userId != Meteor.userId() && dd.isRead == false;
    //             }).length;

    //             messageCountSum = messageCountSum + messageCount;
    //         }
    //         });
    //     }

    //     return messageCountSum;
    // },

});