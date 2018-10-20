candidateAddresses = new Mongo.Collection('candidateAddresses');

var Schema = {};

candidateAddresses.attachSchema(new SimpleSchema({
  candidateId: {
      type: String
  },
 
    mailing_careof: {
        type: String
    },
    mailing_street: {
        type: String
    },
    mailing_unit: {
        type: String
    },
    mailing_city: {
        type: String
    },
    mailing_state: {
        type: String
    },
    mailing_country: {
        type: String
    },
    mailing_zipCode: {
        type: Number
    },
    
    us_careof: {
        type: String
    },
    us_street: {
        type: String
    },
    us_unit: {
        type: String
    },
    us_city: {
        type: String
    },
    us_state: {
        type: String
    },
    us_zipCode: {
        type: Number
    },
    
    abroad_careof: {
        type: String
    },
    abroad_street: {
        type: String
    },
    abroad_unit: {
        type: String
    },
    abroad_city: {
        type: String
    },
    abroad_state: {
        type: String
    },
    abroad_zipCode: {
        type: Number
    },
    abroad_country: {
        type: String
    },
    
    consulate_careof: {
        type: String
    },
    consulate_street: {
        type: String
    },
    consulate_unit: {
        type: String
    },
    consulate_city: {
         type: String
    },
    consulate_state: {
        type: String
    },
    consulate_zipCode: {
        type: Number
    },
    consulate_country: {
        type: String
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
