messages = new Mongo.Collection('messages');


var Schema = {};

Schema.message = new SimpleSchema({
    userId:{
        type: String
    },
    message:{
        type: String
    },
    repliedDate:{
        type: Date,
        autoValue: function () {
                return new Date()
        }
    },
    isRead:{
        type:Boolean,
        defaultValue:false
    }
});


messages.attachSchema(new SimpleSchema({
    requestorId: {
        type: String
    },
    resonsorId:{
        type: String
    },
    message:{
      type:[Schema.message],
      optional: true
    }
}));
