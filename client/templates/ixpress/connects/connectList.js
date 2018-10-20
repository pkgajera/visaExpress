Template.connectListViewTable.helpers({
    selector: function () {
        var currentUser = Meteor.user();
        if (currentUser) {
            return { $or: [ {'requestorId': currentUser._id}, { 'connectWith': { $elemMatch: { $eq : currentUser._id } } } ],"ticketStatus": { $ne: 'close' } }
         }
        // else if(currentUser && currentUser.profile.role == "employer"){
        //     return {
        //         "ticketStatus": { $ne: 'close' },
        //         "profile.attorneyId": Meteor.userId()
        //     };
        // }
        // else if(currentUser && currentUser.profile.role == "attorney"){
        //     return {
        //         "ticketStatus": { $ne: 'close' },
        //         "profile.attorneyId": Meteor.userId()
        //     };
        // }
    }
});

Template.connectList.events({
    "click #connectCreate": function (e, t) {
        e.preventDefault();
        Router.go('connects');
    }
});

Template.connectListViewTable.events({
    "click #connectCreate": function (e, t) {
        e.preventDefault();
        Router.go('connects');
    },
     "click #view-ticket-button": function (e, t) {
        e.preventDefault();
        debugger;
        Router.go('connectView', {
            _id: $(e.currentTarget).attr('data-id')
        });
    }
});
