candidateProfile = new Mongo.Collection('candidateProfile');

var Schema = {};

candidateProfile.attachSchema(new SimpleSchema({
    candidateId: {
        type: String
    },
    title: {
        type: String,
        allowedValues: ['mr', 'ms'],
        optional: true
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String
    },
    benificiaryName: {
        type: String,
        optional: true
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

