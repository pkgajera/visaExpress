
proposedJob = new Mongo.Collection('proposedJob');

var Schema = {};

proposedJob.attachSchema(new SimpleSchema({
    userId: {
        type: String
    },
    employerId: {
        type: String, 
        optional: true
    },
    title: {
        type: String,
        optional: true
    },
    jobDescription: {
        type: String
    },
    lineOfBusiness: {
        type: String,
         allowedValues: ['yes', 'no'],
        optional: true
    },
    skills: {
        type: String
    },
    souceOfTools: {
        type: String,
        optional: true
    },
    streetName: {
        type: String,
        optional: true
    },
    streetNumber: {
        type: String
    },
    
    city: {
        type: String
    },
    
    state: {
        type: String
    },
    
    
    zipCode: {
        type: Number
    },
    
    country: {
        type: String,
    },
    
    durationOfWork: {
        type: String
    },
   
    phoneNumber: {
        type: Number
    },
    email: {
        type: String
    },
    dateOfProject: {
        type: String
    },
    nameOfProject: {
        type: String
    },
    
     addWork: {
        type: String,
        allowedValues: ['yes', 'no'],
        optional: true
    },
    
    howLongToWork: {
        type: String
    },
    
    modeOfPay: {
        type: String
    },
    
    
    taxTreatment: {
        type: String
    },
    
    empRoles: {
        type: String
    },
    
    rulesRegulations: {
        type: String,
        allowedValues: ['yes', 'no'],
        optional: true
    },
    
    report: {
        type: String
    },
    
    rateOfPay: {
        type: String
    },
    
    otherCompensation: {
        type: String
    },
    
    NumberOfHoursPerWeek: {
        type: String
    },
    
    dailyWorkSchedule: {
        type: String
    },
    
    
    datesOfExpectedEmployee: {
        type: String
    },
    
     jobUnionized: {
        type: String,
        allowedValues: ['yes', 'no'],
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
