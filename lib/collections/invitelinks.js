inviteLink = new Mongo.Collection('inviteLink');

var Schema = {};

inviteLink.attachSchema(new SimpleSchema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    employerId:{
        type: String,
        optional:true
    },
    // inviteRole: {
    //     type: String
    // },
    status: {
        type: String,
        defaultValue:'open'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date()
            }
        }
    },
    createdBy: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return this.userId
            }
        }
    },
    lastUpdateAt: {
        type: Date,
        autoValue: function() {
            return new Date()
        }
    },
    lastUpdatedBy: {
        type: String,
        autoValue: function() {
            return this.userId
        }
    }
}));
