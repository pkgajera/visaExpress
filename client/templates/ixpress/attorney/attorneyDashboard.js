Template.attorneyDashboard.events({
  'click #newcandidate': function(event, template) {
    event.preventDefault();  
    Router.go('createEmployer');
  }
});
  
  