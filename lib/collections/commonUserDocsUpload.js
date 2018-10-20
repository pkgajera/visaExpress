commonUserDocsUpload = new Mongo.Collection('commonUserDocsUpload');

var Schema = {};

Schema.UploadDoc = new SimpleSchema({
    documentData: {
        type: String,
        optional: true
    },
    candidateDocData: {
        type: String,
        optional: true
    }
});


commonUserDocsUpload.attachSchema(new SimpleSchema({
    candidateId: {
        type: String
    },
    employerId:{
      type:String,
      optional: true
    },
    employerUploadDoc:{
      type:[Schema.UploadDoc],
      optional: true
    },
    attorneyUploadDoc:{
      type:[Schema.UploadDoc],
      optional: true
    },
    offer_letter:{
      type:Schema.UploadDoc,
      optional: true
    },
    confidentiality_and_non_compete_agreement:{
      type:Schema.UploadDoc,
      optional: true
    },
    employee_agreement:{
      type:Schema.UploadDoc,
      optional: true
    },
    right_to_control:{
      type:Schema.UploadDoc,
      optional: true
    },
    performance_review:{
      type:Schema.UploadDoc,
      optional: true
    },
    job_itinerary:{
      type:Schema.UploadDoc,
      optional: true
    },
    i_129H_1_129H_petition_support_letter:{
      type:Schema.UploadDoc,
      optional: true
    },
    client_letter:{
      type:Schema.UploadDoc,
      optional: true
    },
    msa:{
      type:Schema.UploadDoc,
      optional: true
    },
    po_wo:{
      type:Schema.UploadDoc,
      optional: true
    },
    credential_evaluation_document:{
      type:Schema.UploadDoc,
      optional: true
    },
    lca:{
      type:Schema.UploadDoc,
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
