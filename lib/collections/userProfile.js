userProfile = new Mongo.Collection('userProfile');

var Schema = {};

userProfile.attachSchema(new SimpleSchema({
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
    benificiaryName: {
        type: String,
        optional: true
    },
    companyName: {
        type: String,
        optional: true
    },
    email: {
        type: String,
        optional: true
    },
    phone: {
        type: Number,
        optional: true
    },
    street: {
        type: String,
        optional: true
    },
    unit: {
        type: String,
        optional: true
    },
    city: {
        type: String,
        optional: true
    },
    state: {
        type: String,
        optional: true
    },
    country: {
        type: String,
        optional: true
    },
    zipCode: {
        type: Number,
        optional: true
    },
    rateofPayPerYear: {
        type: Number,
        optional: true
    },
    petitioner: {
        type: String,
        optional: true
    },
    from: {
        type: String,
        optional: true
    },
    to: {
        type: String,
        optional: true
    },
    businessType: {
        type: String,
        optional: true
    },
    year: {
        type: String,
        optional: true
    },
    numberofEmp: {
        type: String,
        optional: true
    },
    grossIncome: {
        type: String,
        optional: true
    },
    netIncome: {
        type: String,
        optional: true
    },
    inCareOfName: {
        type: String,
        optional: true
    },
    number: {
        type: String,
        optional: true
    },
    province: {
        type: String,
        optional: true
    },
    FEI_Number: {
        type: String,
        optional: true
    },
    I94_Arrival_Dep_Record_Number: {
        type: String,
        optional: true
    },
    curr_nonimmigrant_status: {
        type: String,
        optional: true
    },
    Date_Status_Expires_D_S: {
        type: String,
        optional: true
    },
    SEVIS_Number: {
        type: String,
        optional: true
    },
    LCA_ETA_Case_Number: {
        type: String,
        optional: true
    },
    DayTime_Number: {
        type: Number,
        optional: true
    },
    Fax_Number: {
        type: Number,
        optional: true
    },
    Primary_Field_of_Study: {
        type: String,
        optional: true
    },
    levelOfEducation: {
        type: String,
        optional: true
    },
    titleOfCompanyRepresentative: {
        type: String,
        optional: true
    },
    numberofH1BEmp: {
        type: String,
        optional: true
    },
    natureOfEmpbusi: {
        type: String,
        optional: true
    },
    isTRPFunding: {
        type: String,
        optional: true,
         allowedValues: ['yes', 'no'],
    },
    permonceReviewProcess: {
        type: String,
        optional: true
    },
    county: {
        type: String,
        optional: true
    },
    countyOfEmployer: {
        type: String,
        optional: true
    },
    personelAddressStreet: {
        type: String,
        optional: true
    },
    personelAddressCity: {
        type: String,
        optional: true
    },
    personelAddressState: {
        type: String,
        optional: true
    },
    personelAddressZipCode: {
        type: Number,
        optional: true
    },
    personelAddressCounty: {
        type: String,
        optional: true
    },
    isSameAddress:{
        type: Boolean,
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
