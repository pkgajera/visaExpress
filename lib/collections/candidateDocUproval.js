candidateDocApproval = new Mongo.Collection('candidateDocApproval');

var Schema = {};

Schema.formDocDataEdit = new SimpleSchema({
    documentId: {
        type: String,
        optional: true
    },
    approvalDocData: {
        type: Schema.approvalDocData,
        optional: true
    }
});

Schema.formDocDataupload = new SimpleSchema({
    documentId: {
        type: [String],
        optional: true
    },
    approvalDocData: {
        type: Object,
        blackbox: true,
        optional: true
    }
});

Schema.approvalDocData = new SimpleSchema({
    candidateApproval: {
        type: Boolean,
        optional: true
    },
    employerApproval: {
        type: Boolean,
        optional: true
    },
    attorneyApproval: {
        type: Boolean,
        optional: true
    }
});
Schema.candidateDocApproval = new SimpleSchema({
    candidateId: {
        type: String
    },
    generalInfo: {
        type: Object,
        blackbox: true,
        optional: true
    },
    employmentHistory: {
        type: Object,
        blackbox: true,
        optional: true
    },
    educationHistory: {
        type: Object,
        blackbox: true,
        optional: true
    },
    employmentVerificationLetters: {
        type: Object,
        blackbox: true,
        optional: true
    },
    employmentpaySlips: {
        type: Object,
        blackbox: true,
        optional: true
    },
    educationCredentials: {
        type: Object,
        blackbox: true,
        optional: true
    },
    passport: {
        type: Object,
        blackbox: true,
        optional: true
    },
    updatedResume: {
        type: Object,
        blackbox: true,
        optional: true
    },
    previouspassport: {
        type: Object,
        blackbox: true,
        optional: true
    },
    previousApprovalNotices: {
        type: Object,
        blackbox: true,
        optional: true
    },
    i_94: {
        type: Object,
        blackbox: true,
        optional: true
    },
    educationEvaluation: {
        type: Object,
        blackbox: true,
        optional: true
    },
    socialSecurityCard: {
        type: Object,
        blackbox: true,
        optional: true
    },
    h4_h1_cos_Marriage_Certificate: {
        type: Object,
        blackbox: true,
        optional: true
    },
    h4_h1_cos_Spouse_h1_b_approvalNotice: {
        type: Object,
        blackbox: true,
        optional: true
    },
    h4_h1_cos_Spouse_passport_visaStamp_i_94: {
        type: Object,
        blackbox: true,
        optional: true
    },
    h4_h1_cos_Spouse_recent_w2: {
        type: Object,
        blackbox: true,
        optional: true
    },
    h4_h1_cos_Spouse_payStubs: {
        type: Object,
        blackbox: true,
        optional: true
    },
    addressHistory: {
        type: Object,
        blackbox: true,
        optional: true
    },
    candidateAddresses: {
        type: Object,
        blackbox: true,
        optional: true
    },
    relativesInfo: {
        type: Object,
        blackbox: true,
        optional: true
    },
    comments: {
        type: [Object],
        blackbox: true,
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
});
candidateDocApproval.attachSchema(Schema.candidateDocApproval)
