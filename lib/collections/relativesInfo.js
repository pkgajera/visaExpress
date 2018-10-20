relativesInfo = new Mongo.Collection('relativesInfo');

var Schema = {};

relativesInfo.attachSchema(new SimpleSchema({
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
        allowedValues: ['single', 'married', 'divorced', 'widow', 'partner', 'separated'],
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
    fax: {
        type: Number
    },
    email: {
        type: String
    },
    socialSecurityNumber: {
        type: String
    },
    countryOfNationality: {
        type: String
    },
    alienNumber: {
        type: String
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
        type: String
    },
    arrivalCityPortOfEntry: {
        type: String
    },
    arrivalStatePortOfEntry: {
        type: String
    },
    higestEducation: {
        type: String
    },
    fieldOfStudy: {
        type: String
    },
    notes: {
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

// candidateInfo.attachSchema(candidateInfo);
