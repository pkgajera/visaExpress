//Declare Users collection
var Schema = {};

//Declare Users profile schema
Schema.UserProfile = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    role: {
        type: String,
        optional: true
    },
    state: {
        type: String,
        optional: true
    },
    contactno: {
        type: String,
        optional: true
    },
    zipcode: {
        type: String,
        optional: true
    },
    attorneyId: {
        type: String,
        optional: true
    },
    employerId: {
        type: [String],
        optional: true
    },
    comments:{
        type: String,
        optional: true
    },
    isCompany:{
        type:Boolean,
        defaultValue:false
    },
    visaType:{
        type: String,
        optional: true
    },
    processStatus:{
        type: String,
        optional: true
    },
     dob:{
        type: Date,
        optional: true
    },
     location:{
        type: String,
        optional: true
    },
     phone:{
        type: Number,
        optional: true
    },
});

this.user = Meteor.users;

//Declared Schema of users
Schema.user = new SimpleSchema({

    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String
    },
    "emails.$.verified": {
      type: Boolean
  },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
     status: {
              type: Object,
              optional: true,
              blackbox: true
          }
});

//Attached Schema with users collection
user.attachSchema(Schema.user);
