Template.employerDashboard.events({
  'click #newcandidate': function(event, template) {
    event.preventDefault();  
    Router.go('newCandidate');
  },
  
  'click #newattorney': function(event, template) {
    event.preventDefault();  
    Router.go('newAttorney');
  },
  
});
Template.employerDashboard.onRendered(function(){

    $('#example1').dataTable( {
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        buttons: [
            //{extend: 'copy',className: 'btn-sm'},
            //{extend: 'csv',title: 'ExampleFile', className: 'btn-sm'},
            //{extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'},
            //{extend: 'print',className: 'btn-sm'}
        ]
    });


});

Template.employerDashboard.helpers({

    candid: function(){
   
       return Meteor.users.find({ "profile.candidid": Meteor.userId() })
  
  }
});



