connects = new Mongo.Collection('connects');

var Schema = {};

Schema.ticket = new SimpleSchema({
    userId:{
        type: String
    },
    info:{
        type: String
    },
    repliedDate:{
        type: Date,
        autoValue: function () {
                return new Date()
        }
    }
});


connects.attachSchema(new SimpleSchema({
    requestorId: {
        type: String
    },
    connectWith:{
        type: [String]
    },
    category: {
        type: String,
    },
    subject:{
        type: String
    },
    ticketConnect:{
      type:[Schema.ticket],
      optional: true
    },
    ticketStatus:{
        type: String,
        defaultValue:"pending"
    },  
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date()
            }
        }
    }
}));
