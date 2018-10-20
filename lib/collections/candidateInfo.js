candidateInfo = new Mongo.Collection('candidateInfo');

var Schema = {};

candidateInfo.attachSchema(new SimpleSchema({
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
    maidenName: {
        type: String,
        optional: true
    },
    otherName: {
        type: String,
        optional: true
    },
    maritalStatus: {
        type: String,
        optional: true,
        allowedValues: ['single', 'married', 'divorced', 'widow', 'seperated', 'partner'],
    },
    gender: {
        type: String,
        optional: true,
        allowedValues: ['male', 'female'],
    },
    dateOfBirth: {
        type: Date,
        optional: true
    },
    cityOfBirth: {
        type: String
    },
    stateOfBirth: {
        type: String
    },
    countryOfBirth: {
        type: String
    },
    cellPhone: {
        type: Number
    },
    dayPhone: {
        type: Number,
        optional: true
    },
    eveningPhone: {
        type: Number,
        optional: true
    },
    email: {
        type: String
    },
    socialSecurityNumber: {
        type: String,
        optional: true
    },
    countryOfNationality: {
        type: String
    },
    alienNumber: {
        type: String,
         optional: true
    },
    passportNumber: {
        type: String
    },
    passportIssueingCountry: {
        type: String
    },
    passportIssuedDate: {
        type: Date
    },
    passportExpireDate: {
        type: Date
    },
    arrivalDateLastEntryDateInUS: {
        type: String,
         optional: true
    },
    arrivalCityPortOfEntry: {
        type: String,
         optional: true
    },
    arrivalStatePortOfEntry: {
        type: String,
         optional: true
    },
    higestEducation: {
        type: String
    },
    fieldOfStudy: {
        type: String
    },
    notes: {
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

// candidateInfo.attachSchema(candidateInfo);
