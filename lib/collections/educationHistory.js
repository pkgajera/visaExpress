educationHistory = new Mongo.Collection('educationHistory');

var Schema = {};

Schema.educationData = new SimpleSchema({

    nameofSchool: {
        type: String,
        optional: true
    },
    fieldOfStudySchool: {
        type: String,
        optional: true
    },
    degree: {
        type: String,
        optional:true
    },
    degreeEvaluated: {
        type: String,
        optional: true
    },
    recievedDate: {
        type: Date,
        optional:true
    },
    city: {
        type: String,
        optional:true

    },
    state: {
        type: String,
        optional:true
    },
    country: {
        type: String,
        optional:true
    },
    zipCode: {
        type: Number,
        optional:true
    },
    streetAddress: {
        type: String,
        optional:true
    },
    attendedFromDate: {
        type: Date,
        optional:true
    },
    attendedToDate: {
        type: Date,
        optional:true
    },
    totalYears: {
        type: Number,
        optional:true
    }
});

educationHistory.attachSchema(new SimpleSchema({
  candidateId: {
      type: String
  },
    highSchool: {
        type: Schema.educationData,
    },
    bachelor: {
        type: Schema.educationData,
    },
    master: {
        type: Schema.educationData,
        optional:true
    },
    phd: {
        type: Schema.educationData,
        optional:true
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

// educationHistory.attachSchema(educationHistory);
