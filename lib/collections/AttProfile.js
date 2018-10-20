attorneyProfile = new Mongo.Collection('attorneyProfile');

var Schema = {};

attorneyProfile.attachSchema(new SimpleSchema({
    userId: {
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
    companyName: {
        type: String,
        optional: true
    },
     email: {
        type: String
    },
    phone: {
        type: Number
    },
    street: {
        type: String
    },
    unit: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
        type: Number
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
