employementHistory = new Mongo.Collection('employementHistory');

var Schema = {};

employementHistory.attachSchema(new SimpleSchema({
  candidateId: {
      type: String
  },
    name: {
        type: String
    },
    jobTitle: {
        type: String
    },
    jobDescription: {
        type: String
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
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    fax: {
        type: String
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    ifthisisYourCurrentEmployement: {
        type: Boolean
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

// employementHistory.attachSchema(employementHistory);
