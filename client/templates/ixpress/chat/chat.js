var chatHistorySub = null;

Template.chatPanel.helpers({
    userList: function () {
        var currentUser = Meteor.user();
        var userListWithStatus =[];
        if (currentUser) {
            var userDet =  user.find({ _id: { $ne: Meteor.userId() } }, { fields: { 'profile.name': 1, '_id': 1, status: 1 } }).fetch();
            userDet.forEach(function(d,i){
            var userJson={};

            var messageCount=0;
            var message =  messages.findOne({$or: [{'requestorId': Meteor.userId(),'resonsorId':d._id}, {'requestorId': d._id,'resonsorId':Meteor.userId()}]});
            if(message)
            {
              messageCount =  message.message.filter(function(dd,ii){
                    return dd.userId != Meteor.userId() && dd.isRead == false;
                }).length;
            }
            userJson['_id'] = d._id;
            userJson['name'] = d.profile.name;
            userJson['status'] = d.status;
            userJson['messageCount'] = messageCount == 0 ?'':messageCount;
                userListWithStatus.push(userJson);
            });
        }
        return userListWithStatus;
    },
    chatHistory: function () {
        // return Session.get('chatHistory');
        var chat = messages.findOne({$or: [{'requestorId':  Meteor.userId(),'resonsorId':Session.get('selectedUserId')}, {'requestorId': Session.get('selectedUserId'),'resonsorId': Meteor.userId()}]});
          if (chat) {
                Session.set('chatId', chat._id);
                if(chat.message && chat.message.slice(-1)[0].userId != Meteor.userId())
                {
                Meteor.call('messagesRead',chat._id);
                }
                chat.message.slice(-1)[0] 
               // Session.set('chatHistory', chat.message);
               return chat.message;
            }
            else{
                 Session.set('chatId', '');
               // Session.set('chatHistory', []);
               return [];
            }

    },
    ischatUser: function (userId) {
        if (userId == Meteor.userId()) {
            return 'right';
        }
        else {
            return 'left';
        }
    },
    userName: function (userId) {
        if (userId == Meteor.userId()) {
            return Meteor.user().profile.name;
        }
        else {
            var userDet = user.findOne({ _id: userId });
            return userDet.profile.name;
        }
    },
    chatId: function () {
        return Session.get('chatId');
    }
});

Template.chatPanel.onCreated(function () {
  
                Session.set('chatId', '');
                // Session.set('chatHistory', []);
                Session.set('selectedUserId','');

});

Template.chatPanel.onRendered(function () {

Meteor.subscribe('chatHistory');
$('.chatBot').hide();
//   var self = this;
//       Tracker.autorun(function (obj) {
//     var chat = messages.findOne({});
//             if (chat) {
//                 Session.set('chatId', chat._id);
//                 Session.set('chatHistory', chat.message);
//             }
//             else{
//                  Session.set('chatId', '');
//                 Session.set('chatHistory', []);
//             }
//   });

});



Template.chatPanel.events({
    "submit #chatForm": function (e, t) {
        e.preventDefault();
        var message = $('#messageInput').val();
        var chatUser = $('#messageInput').attr('chat-user');
        var chatId = $('#messageInput').attr('chatId')
        if (message.trim() && chatUser.trim()) {
            Meteor.call("sendMessageOnchat", message, chatUser,chatId);
            $('#messageInput').val('');
            $(".chat-discussion").animate({
				        scrollTop:  $('.chat-discussion').height()
				   });
        }
    },
    "click .chatUser": function (e, t) {
        e.preventDefault();
        $('.chatUser').removeClass('selected-userbg')
        var selectedUserId = $(e.currentTarget).attr('data-userid');
        $('#messageInput').attr('chat-user', selectedUserId);
        Session.set('selectedUserId', selectedUserId);
        $('.chatBot').show();
        // if(chatHistorySub)
        // {
        // chatHistorySub.stop();
        // }
       //chatHistorySub = Meteor.subscribe('chatHistory', Session.get('selectedUserId'));
       $(e.currentTarget).addClass('selected-userbg');
       $(".chat-discussion").animate({
				        scrollTop:  $('.chat-discussion').height()
				   });
    }

});
