Template.header.events({

    'click .hide-menu': function (event) {

        event.preventDefault();

        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    },

    'click .right-sidebar-toggle': function (event) {
        event.preventDefault();
        $('#right-sidebar').toggleClass('sidebar-open');
    },
  //   'click #linkLogout': function(){
  //     Meteor.logout();
  //     Router.go('login');
  // }




});
