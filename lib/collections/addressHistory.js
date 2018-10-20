addressHistory = new Mongo.Collection('addressHistory');

var Schema = {};

addressHistory.attachSchema(new SimpleSchema({
  candidateId: {
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
    from: {
        type: Date
    },
    to: {
        type: Date
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
