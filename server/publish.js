Meteor.publish("candidateDocListEmployementVerification", function (candidateID, rId) {

    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });

    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].employmentVerificationLetters && candDocData.fetch()[0].employmentVerificationLetters.documentId.length > 0) {

        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].employmentVerificationLetters.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListPaySlips", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });

    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].employmentpaySlips && candDocData.fetch()[0].employmentpaySlips.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].employmentpaySlips.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});

Meteor.publish("candidateDocListeducationCredentials", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].educationCredentials && candDocData.fetch()[0].educationCredentials.documentId.length > 0) {

        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].educationCredentials.documentId
            }
        })
        return [candDocData, DocData];
    }
    else {
        return [candDocData];

    }
});
Meteor.publish("candidateDocListpassport", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].passport && candDocData.fetch()[0].passport.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].passport.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});

Meteor.publish("candidateDocListupdatedResume", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });

    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].updatedResume && candDocData.fetch()[0].updatedResume.documentId.length > 0) {

        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].updatedResume.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListpreviouspassport", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].previouspassport && candDocData.fetch()[0].previouspassport.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].previouspassport.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});

Meteor.publish("candidateDocListpreviousApprovalNotices", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].previousApprovalNotices && candDocData.fetch()[0].previousApprovalNotices.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].previousApprovalNotices.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListi_94", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].i_94 && candDocData.fetch()[0].i_94.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].i_94.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});

Meteor.publish("candidateDocListeducationEvaluation", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].educationEvaluation && candDocData.fetch()[0].educationEvaluation.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].educationEvaluation.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListsocialSecurityCard", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].socialSecurityCard && candDocData.fetch()[0].socialSecurityCard.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].socialSecurityCard.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListh4_h1_cos_Marriage_Certificate", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].h4_h1_cos_Marriage_Certificate && candDocData.fetch()[0].h4_h1_cos_Marriage_Certificate.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].h4_h1_cos_Marriage_Certificate.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListh4_h1_cos_Spouse_h1_b_approvalNotice", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].h4_h1_cos_Spouse_h1_b_approvalNotice && candDocData.fetch()[0].h4_h1_cos_Spouse_h1_b_approvalNotice.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].h4_h1_cos_Spouse_h1_b_approvalNotice.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListh4_h1_cos_Spouse_passport_visaStamp_i_94", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].h4_h1_cos_Spouse_passport_visaStamp_i_94 && candDocData.fetch()[0].h4_h1_cos_Spouse_passport_visaStamp_i_94.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].h4_h1_cos_Spouse_passport_visaStamp_i_94.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListh4_h1_cos_Spouse_recent_w2", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].h4_h1_cos_Spouse_recent_w2 && candDocData.fetch()[0].h4_h1_cos_Spouse_recent_w2.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].h4_h1_cos_Spouse_recent_w2.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocListh4_h1_cos_Spouse_payStubs", function (candidateID, rId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = candidateID
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0 && candDocData.fetch()[0].h4_h1_cos_Spouse_payStubs && candDocData.fetch()[0].h4_h1_cos_Spouse_payStubs.documentId.length > 0) {
        var DocData = Uploads.find({
            _id: {
                $in: candDocData.fetch()[0].h4_h1_cos_Spouse_payStubs.documentId
            }
        })
        return [candDocData, DocData];
    }

    return [candDocData];
});
Meteor.publish("candidateDocList", function (candidateID, rId) {

    var currentUser = user.findOne({ _id: this.userId });

    if (candidateID == null && currentUser && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    });

    var candDocDataCommon = commonUserDocsUpload.find({
        candidateId: candidateID
    });
    var candidateData = user.findOne({ _id: candidateID });
    var employeeList = user.find({ _id: { $in: candidateData.profile.employerId } }, { fields: { 'profile.name': 1, 'profile.role': 1 } });
    if (candDocDataCommon.fetch().length > 0) {
        var candidateDocList = [];
        if (candDocDataCommon.fetch()[0].employerUploadDoc && candDocDataCommon.fetch()[0].employerUploadDoc.length > 0) {
            candDocDataCommon.fetch()[0].employerUploadDoc.forEach(function (d, i) {
                if (d.documentData) {
                    candidateDocList.push(d.documentData);
                }
                if (d.candidateDocData) {
                    candidateDocList.push(d.candidateDocData);
                }
            })
        }
        if (candDocDataCommon.fetch()[0].attorneyUploadDoc && candDocDataCommon.fetch()[0].attorneyUploadDoc.length > 0) {
            candDocDataCommon.fetch()[0].attorneyUploadDoc.forEach(function (d, i) {
                if (d.documentData) {
                    candidateDocList.push(d.documentData);
                }
                if (d.candidateDocData) {
                    candidateDocList.push(d.candidateDocData);
                }
            })
        }
        employerDocList.forEach(function (d, i) {
            if (candDocDataCommon.fetch()[0][d.key] && candDocDataCommon.fetch()[0][d.key].documentData) {
                candidateDocList.push(candDocDataCommon.fetch()[0][d.key].documentData);
            }
            if (candDocDataCommon.fetch()[0][d.key] && candDocDataCommon.fetch()[0][d.key].candidateDocData) {
                candidateDocList.push(candDocDataCommon.fetch()[0][d.key].candidateDocData);
            }

        });
        employerSpecificDocList.forEach(function (d, i) {
            if (candDocDataCommon.fetch()[0][d.key] && candDocDataCommon.fetch()[0][d.key].documentData) {
                candidateDocList.push(candDocDataCommon.fetch()[0][d.key].documentData);
            }
        });
        attorneySpecificDocList.forEach(function (d, i) {
            if (candDocDataCommon.fetch()[0][d.key] && candDocDataCommon.fetch()[0][d.key].documentData) {
                candidateDocList.push(candDocDataCommon.fetch()[0][d.key].documentData);
            }
        });

        var DocData = Uploads.find({
            _id: {
                $in: candidateDocList
            }
        });
        return [candDocData, DocData, candDocDataCommon, employeeList];
    }
    else {
        return [candDocData, employeeList];

    }
});

Meteor.publish("candidateGenInfo", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }

    var candidateGenInfo = candidateInfo.find({
        candidateId: candidateID
    });

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    }, { fields: { generalInfo: 1, comments: 1 } });

    return [candidateGenInfo, candDocData];
});

Meteor.publish("candidateEmpHis", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candidateEmpHis = employementHistory.find({
        candidateId: candidateID
    });

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    }, { fields: { employmentHistory: 1, comments: 1 } });

    return [candidateEmpHis, candDocData];
});
Meteor.publish("candidateEduHis", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candidateEduHis = educationHistory.find({
        candidateId: candidateID
    });

    var candDocData = candidateDocApproval.find({
        candidateId: this.userId
    }, { fields: { educationHistory: 1, comments: 1 } });

    return [candidateEduHis, candDocData];
});

Meteor.publishComposite("tabular_candidate", function (tableName, ids, fields) {

    this.unblock(); // requires meteorhacks:unblock package
    // var askerid=[];
    return {
        find: function () {
            this.unblock(); // requires meteorhacks:unblock package

            return user.find({});
        },
        children: [{
            find: function (userObj) {
                this.unblock(); // requires meteorhacks:unblock package
                // Publish the related user
                return user.find({
                    _id: userObj.profile.employerId
                });
            }
        }]
    }
});
Meteor.publish("candidateDocListForCommon", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candDocData = commonUserDocsUpload.find({
        candidateId: candidateID
    });
    if (candDocData.fetch().length > 0) {
        var candidateDocList = [];
        if (candDocData.fetch()[0].employerUploadDoc && candDocData.fetch()[0].employerUploadDoc.length > 0) {
            candDocData.fetch()[0].employerUploadDoc.forEach(function (d, i) {
                if (d.documentData) {
                    candidateDocList.push(d.documentData);
                }
                if (d.candidateDocData) {
                    candidateDocList.push(d.candidateDocData);
                }
            })
        }
        if (candDocData.fetch()[0].attorneyUploadDoc && candDocData.fetch()[0].attorneyUploadDoc.length > 0) {
            candDocData.fetch()[0].attorneyUploadDoc.forEach(function (d, i) {
                if (d.documentData) {
                    candidateDocList.push(d.documentData);
                }
                if (d.candidateDocData) {
                    candidateDocList.push(d.candidateDocData);
                }
            })
        }

        var DocData = Uploads.find({
            _id: {
                $in: candidateDocList
            }
        });
        return [candDocData, DocData];
    }
    return [candDocData];
});

Meteor.publish("employerList", function () {
    var currentUser = user.findOne({ _id: this.userId });
    if (currentUser && currentUser.profile.role == "employer" && currentUser.profile.isCompany) {
        return user.find({ "profile.attorneyId": currentUser.profile.attorneyId, "profile.role": "employer" });
    }
    return user.find({ "profile.attorneyId": this.userId, "profile.role": "employer" });
});
Meteor.publish("autocompleteEmployer", function (selector, options) {
    selector['profile.attorneyId'] = this.userId;
    selector['profile.role'] = 'employer';

    Autocomplete.publishCursor(user.find(selector, options), this);
    this.ready();
});
Meteor.publish("candidateAddressHistory", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candidateAddressHistory = addressHistory.find({
        candidateId: candidateID
    });

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    }, { fields: { addressHistory: 1, comments: 1 } });

    return [candidateAddressHistory, candDocData];
});

Meteor.publish("candidateAddresses", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }
    var candidateAddressesData = candidateAddresses.find({
        candidateId: candidateID
    });

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    }, { fields: { candidateAddresses: 1, comments: 1 } });

    return [candidateAddressesData, candDocData];
});

Meteor.publish("candidateRelativesInfo", function (candidateID) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null && currentUser.profile.role == "candidate") {
        candidateID = this.userId
    }

    var candidateRelativesInfo = relativesInfo.find({
        candidateId: candidateID
    });

    var candDocData = candidateDocApproval.find({
        candidateId: candidateID
    }, { fields: { relativesInfo: 1, comments: 1 } });

    return [candidateRelativesInfo, candDocData];
});

Meteor.publish("candidateProposedJob", function (candidateID, employerId) {
    var currentUser = user.findOne({ _id: this.userId });
    if (candidateID == null) {
        candidateID = this.userId
    }
    if (employerId != null) {
        var candidateProposedJob = proposedJob.find({
            userId: candidateID,
            employerId: employerId
        });
        if (candidateProposedJob.fetch().length == 0) {
            return proposedJob.find({
                userId: currentUser._id
            });
        }
        return candidateProposedJob;
    }
    else {
        var candidateProposedJob = proposedJob.find({
            userId: candidateID
        });
        if (candidateProposedJob.fetch().length == 0) {
            return proposedJob.find({
                userId: currentUser._id
            });
        }
        return candidateProposedJob;
    }

});

Meteor.publish("employerProfileData", function (employerId, rId) {
    var currentUser = user.findOne({ _id: this.userId });

    var employerProfileDocListArray = [];
    var userDetail = userProfile.find({ userId: employerId });
    var emplyeeDocDetail = employerProfileDoc.find({ employerId: employerId });

    employerProfileDocList.forEach(function (d, i) {
        if (emplyeeDocDetail.fetch()[0] && emplyeeDocDetail.fetch()[0][d.key]) {
            employerProfileDocListArray.push(emplyeeDocDetail.fetch()[0][d.key]);
        }
    });

    var uploadDocs = Uploads.find({
        _id: {
            $in: employerProfileDocListArray
        }
    });

    return [userDetail, emplyeeDocDetail, uploadDocs];

});

Meteor.publish("profileData", function () {
    if (this.userId) {
        return userProfile.find({ userId: this.userId })
    }
});


Meteor.publish("connectsDetail", function () {
    var currentUser = user.findOne({ _id: this.userId });
    if (currentUser.profile.role == 'attorney') {
        return user.find({ 'profile.attorneyId': this.userId }, { fields: { 'profile.name': 1, 'profile.role': 1 } })
    }
    else if (currentUser.profile.role == 'employer') {
        return user.find({ $or: [{ '_id': currentUser.profile.attorneyId }, { 'profile.employerId': { $elemMatch: { $eq: this.userId } } }] }, { fields: { 'profile.name': 1, 'profile.role': 1 } })
    }
});

Meteor.publishComposite("ticketUserName", function (tableName, ids, fields) {
    check(tableName, String);
    check(ids, Array);
    check(fields, Match.Optional(Object));


    this.unblock(); // requires meteorhacks:unblock package

    return {
        find: function () {
            this.unblock(); // requires meteorhacks:unblock package

            return connects.find({});
        },
        children: [{
            find: function (userObj) {
                this.unblock(); // requires meteorhacks:unblock package
                // Publish the related user
                return user.find({
                    _id: userObj.requestorId
                });
            }
        }]
    }
});

Meteor.publish("connectsDetailView", function (id) {
    var connectsuserData = connects.find({ _id: id });
    if (connectsuserData.fetch().length > 0) {
        var connectUser = connectsuserData.fetch()[0].connectWith;
        connectUser.push(connectsuserData.fetch()[0].requestorId);
        var userDetail = user.find({ _id: { $in: connectUser } });
        return [connectsuserData, userDetail];
    }

});

Meteor.publish("chatSubscription", function (id) {
    var currentUser = user.findOne({ _id: this.userId });
    var connectedUsers = [];

    if (currentUser && currentUser.profile.role == 'attorney') {
        var connectedUsersData = user.find({ 'profile.attorneyId': this.userId }, { fields: { status: 1, 'profile.name': 1, 'profile.role': 1 } });
        return connectedUsersData;
    }
    else if (currentUser && currentUser.profile.role == 'employer') {
        var connectedUsersData = user.find({ $or: [{ '_id': currentUser.profile.attorneyId }, { 'profile.employerId': { $elemMatch: { $eq: this.userId } } }] }, { fields: { status: 1, 'profile.name': 1, 'profile.role': 1 } })
        return connectedUsersData;
    }
    else if (currentUser && currentUser.profile.role == 'candidate') {
        var connectedUsersData = user.find({ $or: [{ '_id': currentUser.profile.attorneyId }, { '_id': { $in: currentUser.profile.employerId } }] }, { fields: { status: 1, 'profile.name': 1, 'profile.role': 1 } })
        return connectedUsersData;
    }

});

Meteor.publish("chatHistory", function (id) {
   
//   return messages.find({$or: [{'requestorId': this.userId,'resonsorId':id}, {'requestorId': id,'resonsorId':this.userId}]});
  return messages.find({$or: [{'requestorId': this.userId}, {'resonsorId':this.userId}]});

});



