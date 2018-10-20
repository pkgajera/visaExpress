employerProfile = new Mongo.Collection('employerProfile');

var Schema = {};

employerProfile.attachSchema(new SimpleSchema({
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
        type: String
       
    },

    lastName: {
        type: String
    },

    companyName: {
        type: String
       
    },

    petitioner: {
        type: String
        
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },

    from: {
        type: String,
    },
    to: {
        type: String
    },
    businessType: {
        type: String,
    },
    year: {
        type: String
    },
    numberofEmp: {
        type: String
    },
    grossIncome: {
        type: String
    },
    netIncome: {
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
