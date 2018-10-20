//var pdfFiller   = Npm.require('pdffiller');
Meteor.methods({

    // insert method
    common_insert: function (key, values) {
        values.createdAt = new Date();

        // Meteor.call('auditTrailLog', 'Insert', key + 'insert');
        var insertSync = Meteor.wrapAsync(global[key].insert, global[key]);
        return insertSync(values);
    },
    // update method
    common_update: function (key, id, values) {

        // Meteor.call('auditTrailLog', 'Update', key + " " + id + ' updated');

        var updateSync = Meteor.wrapAsync(global[key].update, global[key]);
        return updateSync({
            _id: id
        }, {
                $set: values
            });
    },

    // remove method
    common_remove: function (key, id) {
        // Meteor.call('auditTrailLog', 'Delete', key + " " + id + ' deleted');
        return global[key].remove({
            _id: id
        });
    },

    // soft delete method
    common_soft_delete: function (key, id, values) {
        // Meteor.call('auditTrailLog', 'soft Delete', key + " " + id + ' deleted');
        console.log(id, values);
        var updateSync = Meteor.wrapAsync(global[key].update, global[key]);
        return updateSync({
            _id: id
        }, {
                $set: values
            });
    },

    createNewUser: function (userObj) {
        var roles = ['attorney', 'employer']
        userObj['isCompany'] = false;
        var companyName = userObj.email.split('@')[1].split('.')[0];
        var isCompanyExist = companyList.findOne({ companyName: companyName });
        if (userObj.role == "employer" && !isCompanyExist) {
            companyList.insert({
                companyName: companyName
            });
            userObj['isCompany'] = true;
        }

        if (roles.indexOf(userObj.role) > -1) {
            var CreateUserId = Accounts.createUser({
                email: userObj.email,
                password: userObj.password,
                profile: {
                    name: userObj.name,
                    role: userObj.role,
                    isCompany: userObj.isCompany
                }
            });

            return Accounts.sendVerificationEmail(CreateUserId);
        }
    },

    createNewEmployerCandidateUsingEnroll: function (userObj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });

        if (currentUser.profile.role == 'attorney') {
            var existingUser = user.findOne({
                "emails.address": userObj.email
            });
            if (existingUser) {
                if (existingUser.profile.attorneyId && existingUser.profile.employerId && (existingUser.profile.employerId.indexOf(userObj.employerId) >= 0)) {
                    //throw exception
                    throw new Meteor.Error(200, 'This user is already linked with another users.');
                } else {
                    if (existingUser.profile.role != 'attorney' && !existingUser.profile.attorneyId) {

                        var invitelinkid = inviteLink.insert({
                            from: this.userId,
                            to: existingUser._id,
                            employerId: userObj.employerId
                        })

                        let link = Meteor.absoluteUrl() + "invite-send/" + invitelinkid;

                        let subj = "Invitation Link for iExpress"

                        SSR.compileTemplate("enrollTemplate", Assets.getText("emailTemplate/ixpresstocandidate.html"));

                        var textDecore = '';
                        var senderName = '';
                        if (existingUser.profile.role == "candidate") {
                            textDecore = 'Please, click below and create your account to upload your documents.';
                        }
                        else {
                            textDecore = 'Please, follow the link to create an account. ';
                        }
                        senderName = currentUser.profile.name;

                        var html = SSR.render("enrollTemplate", { url: link, user: existingUser, textDecore: textDecore, senderName: senderName, comments: userObj.comments });

                        Meteor.call("sendEmail", userObj.email, existingUser.profile.name, subj, html);

                    }
                    else if ((existingUser.profile.employerId.indexOf(userObj.employerId) >= 0) && existingUser.profile.attorneyId == this.userId) {
                        var invitelinkid = inviteLink.insert({
                            from: this.userId,
                            to: existingUser._id,
                            employerId: userObj.employerId
                        })

                        let link = Meteor.absoluteUrl() + "invite-send/" + invitelinkid;

                        let subj = "Invitation Link for iExpress"

                        SSR.compileTemplate("enrollTemplate", Assets.getText("emailTemplate/ixpresstocandidate.html"));

                        var textDecore = '';
                        var senderName = '';
                        if (existingUser.profile.role == "candidate") {
                            textDecore = 'Please, click below and create your account to upload your documents.';
                        }
                        else {
                            textDecore = 'Please, follow the link to create an account. ';
                        }
                        senderName = currentUser.profile.name;

                        var html = SSR.render("enrollTemplate", { url: link, user: existingUser, textDecore: textDecore, senderName: senderName, comments: userObj.comments });

                        Meteor.call("sendEmail", userObj.email, existingUser.profile.name, subj, html);

                    }
                    else {
                        throw new Meteor.Error(200, 'This user is already linked with another users.');
                    }
                }
                //send Mail to existingUser
                // Meteor.call("sendEmail", userObj.email,existingUser.profile.name,comments, subj, body);
            } else {
                if (userObj.role == 'employer') {

                    userObj['isCompany'] = false;
                    var companyName = userObj.email.split('@')[1].split('.')[0];
                    var isCompanyExist = companyList.findOne({ companyName: companyName });
                    if (!isCompanyExist) {
                        companyList.insert({
                            companyName: companyName
                        });
                        userObj['isCompany'] = true;
                    }

                    Accounts.createUser({
                        email: userObj.email,
                        profile: {
                            name: userObj.name,
                            role: userObj.role,
                            attorneyId: this.userId,
                            comments: userObj.comments,
                            isCompany: userObj.isCompany
                        }
                    });
                } else {
                    var result = Accounts.createUser({
                        email: userObj.email,
                        profile: {
                            name: userObj.name,
                            role: userObj.role,
                            attorneyId: this.userId,
                            employerId: [userObj.employerId],
                            comments: userObj.comments,
                            visaType: userObj.visaType,
                            processStatus: userObj.processStatus,
                            dob: userObj.dob,
                            phone: userObj.phone,
                            location: userObj.location
                        }
                    });
                    if (result) {
                        var proposedJobInfo = proposedJob.findOne({ userId: Meteor.userId() });
                        if (proposedJobInfo) {
                            delete proposedJobInfo._id;
                            proposedJobInfo['userId'] = result;
                            proposedJobInfo['employerId'] = userObj.employerId;
                            proposedJob.insert(proposedJobInfo);
                        }

                    }
                }

                var newUser = Accounts.findUserByEmail(userObj.email);
                Accounts.sendEnrollmentEmail(newUser._id);
            }
        }
    },

    createNewAttorneyCandidateUsingEnroll: function (userObj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        console.log(currentUser.profile.role);
        if (currentUser.profile.role == 'employer') {
            var existingUser = user.findOne({
                "emails.address": userObj.email
            });
            console.log('test');

            if (existingUser) {
                // if (existingUser.profile.attorneyId && existingUser.profile.employerId)
                if (existingUser.profile.attorneyId && (existingUser.profile.attorneyId != currentUser.profile.attorneyId)) {
                    // already link to another user
                    throw new Meteor.Error(200, 'This user is already linked with another users.');
                } else {
                    if (existingUser.profile.role == 'candidate' || existingUser.profile.role == 'attorney') {

                        var invitelinkid = inviteLink.insert({
                            from: this.userId,
                            to: existingUser._id
                        })

                        let link = Meteor.absoluteUrl() + "invite-send/" + invitelinkid;
                        // let html = "<html><body>" +
                        //     "<div>" +
                        //     "Dear " + existingUser.profile.name + ",<br><br>" +
                        //     currentUser.profile.name + "  is sent you invitation link, click on below Link to accept invitation<br><br>" + link +"<br><br>"+
                        //     userObj.comments +
                        //     "</div>" +
                        //     "</body></html>";
                        let subj = "Invitation Link for iExpress"

                        SSR.compileTemplate("enrollTemplate", Assets.getText("emailTemplate/ixpresstocandidate.html"));

                        var textDecore = '';
                        var senderName = '';
                        if (existingUser.profile.role == "candidate") {
                            textDecore = 'Please, click below and create your account to upload your documents.';
                        }
                        else {
                            textDecore = 'Please, follow the link to create an account. ';
                        }
                        senderName = currentUser.profile.name;

                        var html = SSR.render("enrollTemplate", { url: link, user: existingUser, textDecore: textDecore, senderName: senderName, comments: userObj.comments });

                        Meteor.call("sendEmail", userObj.email, existingUser.profile.name, subj, html);

                    }

                }
                // var newUser = Accounts.findUserByEmail(userObj.email);
                //
                // Accounts.sendEnrollmentEmail(newUser._id);
            } else {
                if (userObj.role == 'attorney' && !currentUser.profile.attorneyId) {
                    var attorneyData = Accounts.createUser({
                        email: userObj.email,
                        profile: {
                            name: userObj.name,
                            role: userObj.role,
                            comments: userObj.comments
                        }
                    });
                    user.update({
                        _id: this.userId
                    }, {
                            $set: {
                                'profile.attorneyId': attorneyData
                            }
                        });
                    // var existingCandidate = user.find({'profile.employerId':this.userId,'profile.attorneyId':{ '$exists' : false }}).fetch();

                    user.update({
                        'profile.employerId': this.userId,
                        'profile.attorneyId': {
                            '$exists': false
                        }
                    }, {
                            $set: {
                                'profile.attorneyId': attorneyData
                            }
                        }, {
                            multi: true
                        });


                } else if (userObj.role == 'candidate') {
                    var objprofile = {
                        name: userObj.name,
                        role: userObj.role,
                        employerId: [this.userId],
                        comments: userObj.comments,
                        visaType: userObj.visaType,
                        processStatus: userObj.processStatus,
                        dob: userObj.dob,
                        phone: userObj.phone,
                        location: userObj.location
                    }
                    if (currentUser.profile.attorneyId) {
                        objprofile['attorneyId'] = currentUser.profile.attorneyId
                    }
                    var res = Accounts.createUser({
                        email: userObj.email,
                        profile: objprofile
                    });
                    if (res) {
                        var proposedJobInfo = proposedJob.findOne({ userId: Meteor.userId() });
                        if (proposedJobInfo) {
                            delete proposedJobInfo._id;
                            proposedJobInfo['userId'] = res;
                            proposedJobInfo['employerId'] = Meteor.userId();
                            proposedJob.insert(proposedJobInfo);
                        }

                    }
                } else {
                    throw new Meteor.Error(200, 'This user is already linked with another users.');
                }

                var newUser = Accounts.findUserByEmail(userObj.email);
                Accounts.sendEnrollmentEmail(newUser._id);
            }


        }
    },

    insertCandidateGenInfo: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateGenInfoExist = candidateInfo.findOne({
            candidateId: this.userId
        });
        var isDocApprovalByEmployeeOrAttorney = candidateDocApproval.findOne({
            candidateId: this.userId
        })

        if (currentUser.profile.role == "candidate" && candidateGenInfoExist) {
            if (isDocApprovalByEmployeeOrAttorney && isDocApprovalByEmployeeOrAttorney.generalInfo && !isDocApprovalByEmployeeOrAttorney.generalInfo.approvalDocData.employerApproval && !isDocApprovalByEmployeeOrAttorney.generalInfo.approvalDocData.attorneyApproval) {
                obj['candidateId'] = this.userId
                return candidateInfo.update({
                    _id: candidateGenInfoExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Your Information is locked..');
            }

        } else {
            obj['candidateId'] = this.userId
            var result = candidateInfo.insert(obj);
            if (result) {
                Meteor.call("candidateDocumentUpdateMethod", result, "generalInfo")
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidateInfo');
            }
        }

    },
    candidateDocumentUpdateMethod: function (docId, docType) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateDocApprovalExist = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateDocApprovalExist) {
            var obj = {};
            obj[docType] = {
                documentId: docId,
                approvalDocData: {
                    candidateApproval: true,
                    employerApproval: false,
                    attorneyApproval: false
                }
            }
            return candidateDocApproval.update({
                _id: candidateDocApprovalExist._id
            }, {
                    $set: obj
                });
        } else {
            var obj = {};
            obj['candidateId'] = this.userId;
            obj[docType] = {
                documentId: docId,
                approvalDocData: {
                    candidateApproval: true,
                    employerApproval: false,
                    attorneyApproval: false
                }
            }
            return candidateDocApproval.insert(obj)
        }
    },
    insertCandidateEmpHistory: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateEmploInfoExist = employementHistory.findOne({
            candidateId: this.userId
        })
        var isDocApprovalByEmployeeOrAttorney = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateEmploInfoExist) {
            if (isDocApprovalByEmployeeOrAttorney && isDocApprovalByEmployeeOrAttorney.employmentHistory && !isDocApprovalByEmployeeOrAttorney.employmentHistory.approvalDocData.employerApproval && !isDocApprovalByEmployeeOrAttorney.employmentHistory.approvalDocData.attorneyApproval) {
                obj['candidateId'] = this.userId

                return employementHistory.update({
                    _id: candidateEmploInfoExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Your Information is locked..');
            }
        } else {
            obj['candidateId'] = this.userId;

            var result = employementHistory.insert(obj, function (err, res) {
                console.log(err, res);
            });
            console.log(result);
            if (result) {
                Meteor.call("candidateDocumentUpdateMethod", result, "employmentHistory")
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidateInfo');
            }
        }

    },
    insertCandidateEduHistory: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateEmploInfoExist = educationHistory.findOne({
            candidateId: this.userId
        })
        var isDocApprovalByEmployeeOrAttorney = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateEmploInfoExist) {
            if (isDocApprovalByEmployeeOrAttorney && isDocApprovalByEmployeeOrAttorney.educationHistory && !isDocApprovalByEmployeeOrAttorney.educationHistory.approvalDocData.employerApproval && !isDocApprovalByEmployeeOrAttorney.educationHistory.approvalDocData.attorneyApproval) {
                obj['candidateId'] = this.userId

                return educationHistory.update({
                    _id: candidateEmploInfoExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Your Information is locked..');
            }
        } else {
            obj['candidateId'] = this.userId;

            var result = educationHistory.insert(obj, function (err, res) {
                console.log('err', err);
                console.log('result', res);
            });
            console.log(result);
            if (result) {
                Meteor.call("candidateDocumentUpdateMethod", result, "educationHistory")
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidateInfo');
            }
        }

    },
    documentUploadMethodForCandidate: function (docId, docType) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateDocApprovalExist = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateDocApprovalExist) {
            var obj = {};
            if (candidateDocApprovalExist[docType]) {
                if (candidateDocApprovalExist[docType]['documentId'].length > 0) {
                    obj[docType + '.documentId'] = docId;
                    return candidateDocApproval.update({
                        _id: candidateDocApprovalExist._id
                    }, {
                            $push: obj
                        });
                }
                else {
                    obj[docType] = {
                        documentId: [docId],
                        approvalDocData: {
                            candidateApproval: true,
                            employerApproval: false,
                            attorneyApproval: false
                        }
                    };
                    return candidateDocApproval.update({
                        _id: candidateDocApprovalExist._id
                    }, {
                            $set: obj
                        });
                }

            } else {
                obj[docType] = {
                    documentId: [docId],
                    approvalDocData: {
                        candidateApproval: true,
                        employerApproval: false,
                        attorneyApproval: false
                    }
                }

                return candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $set: obj
                    });
            }

        } else {
            var obj = {};
            obj['candidateId'] = this.userId;
            obj[docType] = {
                documentId: [docId],
                approvalDocData: {
                    candidateApproval: true,
                    employerApproval: false,
                    attorneyApproval: false
                }
            }
            return candidateDocApproval.insert(obj)
        }
    },

    removeDocumentCandidate: function (docId, docType) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateDocApprovalExist = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateDocApprovalExist) {
            var obj = {};
            var docCount = candidateDocApprovalExist[docType]['documentId'].length;
            if (docCount == 1) {
                obj[docType] = {
                    documentId: [],
                    approvalDocData: {
                        candidateApproval: false,
                        employerApproval: false,
                        attorneyApproval: false
                    }
                }
                candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $set: obj
                    });
            }
            else {
                obj[docType + '.documentId'] = docId;

                return candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $pop: obj
                    });

            }

        }
    },
    removeDocumentEmployer: function (docId, candidateId) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });

        var docData = commonUserDocsUpload.findOne({
            candidateId: candidateId
        });

        if (currentUser.profile.role == "employer" && docData) {

            return commonUserDocsUpload.update({
                _id: docData._id
            }, { $pull: { "employerUploadDoc": { 'documentData': docId } } }, function (err) { console.log(err) });
        }
    },
    removeDocumentAttorney: function (docId, candidateId) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });

        var docData = commonUserDocsUpload.findOne({
            candidateId: candidateId
        });

        if (currentUser.profile.role == "attorney" && docData) {

            return commonUserDocsUpload.update({
                _id: docData._id
            }, { $pull: { "attorneyUploadDoc": { 'documentData': docId } } }, function (err) { console.log(err) });
        }
    },
    employerApproveDoc: function (fieldkey, ischecked, candidateId) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateData = user.findOne({
            _id: candidateId
        });

        var candidateDocApprovalExist = candidateDocApproval.findOne({
            candidateId: candidateId
        });
        
        if (currentUser.profile.role == "employer" && candidateData.profile.employerId.indexOf(this.userId) > -1 && candidateDocApprovalExist) {
            if (candidateDocApprovalExist[fieldkey] && candidateDocApprovalExist[fieldkey]['documentId'].length > 0) {
                var obj = {};

                var field = (fieldkey + ".approvalDocData.employerApproval");
                obj[field] = ischecked;
                return candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Document is not approved from candidate');
            }
        } else {
            throw new Meteor.Error(200, 'This Candidate may be not link with you or Document is not approved from candidate');
        }

    },
    attorneyApproveDoc: function (fieldkey, ischecked, candidateId) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateData = user.findOne({
            _id: candidateId
        });

        var candidateDocApprovalExist = candidateDocApproval.findOne({
            candidateId: candidateId
        });

        if (currentUser.profile.role == "attorney" && candidateData.profile.attorneyId == this.userId && candidateDocApprovalExist) {
            if (candidateDocApprovalExist[fieldkey] && candidateDocApprovalExist[fieldkey]['documentId'].length > 0) {
                var obj = {};

                var field = (fieldkey + ".approvalDocData.attorneyApproval");
                obj[field] = ischecked;
                return candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Document is not approved from candidate');
            }
        } else {
            throw new Meteor.Error(200, 'This Candidate may be not link with you or Document is not approved from candidate');
        }

    },
    addCommnets: function (comment, candidateId, keyField) {
        var currentUser = user.findOne({
            _id: this.userId
        });
        var candidateData = user.findOne({
            _id: candidateId
        });

        var candidateDocApprovalExist = candidateDocApproval.findOne({
            candidateId: candidateId
        });
        if (candidateDocApprovalExist) {
            var obj = {};

            if (candidateDocApprovalExist['comments']) {

                obj['comments'] = {
                    commentorId: this.userId,
                    commenterName: currentUser.profile.name,
                    comment: comment,
                    keyField: keyField,
                    commentDate: new Date()
                }

                return candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $push: obj
                    });
            } else {
                obj['comments'] = [{
                    commentorId: this.userId,
                    commenterName: currentUser.profile.name,
                    comment: comment,
                    keyField: keyField,
                    commentDate: new Date()
                }]
                return candidateDocApproval.update({
                    _id: candidateDocApprovalExist._id
                }, {
                        $set: obj
                    });
            }
        } else {
            var obj = {};
            obj['candidateId'] = candidateId;
            obj['comments'] = [{
                commentorId: this.userId,
                commenterName: currentUser.profile.name,
                comment: comment,
                keyField: keyField,
                commentDate: new Date()
            }]
            return candidateDocApproval.insert(obj)
        }
    },
    commondocumentUploadMethodForCandidate_employee: function (docId, candidateId, docType) {

        var currentUser = user.findOne({
            _id: this.userId
        });

        var candidateData = user.findOne({
            _id: candidateId
        });

        var candidateDocApprovalExist = commonUserDocsUpload.findOne({
            candidateId: candidateId
        });

        if (currentUser.profile.role == "employer" && candidateData.profile.employerId == this.userId) {
            if (candidateDocApprovalExist) {
                var obj = {};

                if (docType) {

                    if (candidateDocApprovalExist[docType]) {
                        obj[docType] = {
                            documentData: docId
                        }

                        commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: {
                                    "employerId": currentUser._id
                                }
                            });
                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: obj
                            });
                    } else {
                        obj[docType] = {
                            documentData: docId
                        }

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: obj
                            });
                    }
                }
                else {
                    if (candidateDocApprovalExist['employerUploadDoc'] && candidateDocApprovalExist['employerUploadDoc'].length > 0) {

                        obj['employerUploadDoc'] = {
                            documentData: docId
                        }
                        commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: {
                                    "employerId": currentUser._id
                                }
                            });
                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $push: obj
                            });
                    } else {
                        obj['employerUploadDoc'] = [{
                            documentData: docId
                        }]

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: obj
                            });
                    }
                }

            } else {
                if (docType) {
                    var obj = {};
                    obj['candidateId'] = candidateId;
                    obj['employerId'] = currentUser._id;
                    obj[docType] = {
                        documentData: docId
                    };
                    return commonUserDocsUpload.insert(obj)
                }
                else {
                    var obj = {};
                    obj['candidateId'] = candidateId;
                    obj['employerId'] = currentUser._id;
                    obj['employerUploadDoc'] = [{
                        documentData: docId
                    }];
                    return commonUserDocsUpload.insert(obj)
                }

            }
        }

    },
    commondocumentUploadMethodForCandidate_attorney: function (docId, candidateId, docType) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateData = user.findOne({
            _id: candidateId
        })

        var candidateDocApprovalExist = commonUserDocsUpload.findOne({
            candidateId: candidateId
        });

        if (currentUser.profile.role == "attorney" && candidateData.profile.attorneyId == this.userId) {
            if (candidateDocApprovalExist) {
                var obj = {};
                if (docType) {
                    if (candidateDocApprovalExist[docType]) {

                        obj[docType] = {
                            documentData: docId
                        }

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: obj
                            });
                    } else {
                        obj[docType] = {
                            documentData: docId
                        }

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: obj
                            });
                    }
                }
                else {
                    if (candidateDocApprovalExist['attorneyUploadDoc'] && candidateDocApprovalExist['attorneyUploadDoc'].length > 0) {

                        obj['attorneyUploadDoc'] = {
                            documentData: docId
                        }

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $push: obj
                            });
                    } else {
                        obj['attorneyUploadDoc'] = [{
                            documentData: docId
                        }]

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id
                        }, {
                                $set: obj
                            });
                    }
                }

            } else {
                if (docType) {
                    var obj = {};
                    obj['candidateId'] = candidateId;
                    obj[docType] = {
                        documentData: docId
                    };
                    return commonUserDocsUpload.insert(obj)
                }
                else {
                    var obj = {};
                    obj['candidateId'] = candidateId;
                    obj['attorneyUploadDoc'] = [{
                        documentData: docId
                    }];
                    return commonUserDocsUpload.insert(obj)
                }

            }
        }

    },
    candidateUploadCommonDoc: function (docId, uploadDocId, uploadDocType, docType) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });

        var candidateDocApprovalExist = commonUserDocsUpload.findOne({
            candidateId: currentUser._id
        });

        if (currentUser.profile.role == "candidate") {
            if (docType) {
                if (candidateDocApprovalExist && uploadDocType == "employer") {
                    if (candidateDocApprovalExist[docType]) {

                        var filterobj = { _id: candidateDocApprovalExist._id };
                        filterobj[docType + '.documentData'] = docId;

                        var setObj = {};
                        setObj[docType + '.candidateDocData'] = uploadDocId;
                        console.log('filterobj', filterobj);
                        console.log('setObj', setObj);
                        return commonUserDocsUpload.update(filterobj, {
                            $set: setObj
                        });
                    }
                }
            }
            else {
                if (candidateDocApprovalExist && uploadDocType == "employer") {
                    if (candidateDocApprovalExist['employerUploadDoc']) {

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id,
                            "employerUploadDoc.documentData": docId
                        }, {
                                $set: {
                                    "employerUploadDoc.$.candidateDocData": uploadDocId
                                }
                            });
                    }
                }
                if (candidateDocApprovalExist && uploadDocType == "attorney") {
                    if (candidateDocApprovalExist['attorneyUploadDoc']) {

                        return commonUserDocsUpload.update({
                            _id: candidateDocApprovalExist._id,
                            "attorneyUploadDoc.documentData": docId
                        }, {
                                $set: {
                                    "attorneyUploadDoc.$.candidateDocData": uploadDocId
                                }
                            });
                    }
                }
            }

        }

    },
    'sendEmail': function (to, name, subj, body) {
        this.unblock();
        // Email.send({
        //     name: name,
        //     to: to,
        //     subject: subj,
        //     from: '<prashanth.somanolla@atriait.com>',
        //     text: comments,
        //     text: body,
        // });

        Email.send({
            to: to,
            from: '<prashanth.somanolla@atriait.com>',
            subject: subj,
            html: body
        });
    },

    sendVerificationLink: function (obj) {
        userId = Meteor.userId();
        if (userId) {
            return Accounts.sendVerificationEmail(userId);
        }
    },

    'file-upload': function (fileInfo, fileData) {
        console.log("received file " + fileInfo.name + " data: " + fileData);
        fs.writeFile(fileInfo.name, fileData);
    },
    acceptInviteLinkFromUser: function (id) {
        var inviteLinkdetail = inviteLink.findOne({ _id: id, status: 'open' });
        if (inviteLinkdetail) {
            var currentUser = Meteor.users.findOne({
                _id: inviteLinkdetail.from
            });
            var existingUser = user.findOne({
                "_id": inviteLinkdetail.to
            });
            if (currentUser.profile.role == 'attorney') {

                if (existingUser.profile.attorneyId && existingUser.profile.employerId && existingUser.profile.employerId.indexOf(inviteLinkdetail.employerId) == -1) {
                    //throw exception
                    //  throw new Meteor.Error(200, 'You are already linked with another users.');
                    user.update({
                        _id: existingUser._id
                    }, {
                            $push: {
                                'profile.employerId': inviteLinkdetail.employerId
                            }
                        })
                } else {
                    if (existingUser.profile.role != 'attorney' && !existingUser.profile.attorneyId) {


                        user.update({
                            _id: existingUser._id
                        }, {
                                $set: {
                                    'profile.attorneyId': currentUser._id
                                }
                            })
                        if (existingUser.profile.role == "candidate" && existingUser.profile.employerId.indexOf(inviteLinkdetail.employerId) == -1) {
                            user.update({
                                _id: existingUser._id
                            }, {
                                    $push: {
                                        'profile.employerId': inviteLinkdetail.employerId
                                    }
                                })
                        }
                    }
                }
                inviteLink.update({ _id: inviteLinkdetail._id }, {
                    $set: {
                        status: "accepted"
                    }
                })
            }
            else if (currentUser.profile.role == 'employer') {
                if (existingUser.profile.attorneyId && (existingUser.profile.attorneyId != currentUser.profile.attorneyId)) {
                    // already link to another user
                    throw new Meteor.Error(200, 'You are  already linked with another users.');
                } else {
                    console.log(existingUser.profile.role);
                    if (existingUser.profile.role == 'candidate') {
                        console.log(existingUser.profile.attorneyId);
                        console.log(currentUser.profile.attorneyId);
                        if (!existingUser.profile.attorneyId && currentUser.profile.attorneyId) {
                            user.update({
                                _id: existingUser._id
                            }, {
                                    $set: {
                                        'profile.attorneyId': currentUser.profile.attorneyId
                                    }
                                })
                        }
                        if (!existingUser.profile.employerId) {
                            user.update({
                                _id: existingUser._id
                            }, {
                                    $set: {
                                        'profile.employerId': [currentUser._id]
                                    }
                                })

                        } else if (existingUser.profile.employerId.indexOf(currentUser._id) == -1 && existingUser.profile.attorneyId && existingUser.profile.attorneyId == currentUser.profile.attorneyId) {
                            user.update({
                                _id: existingUser._id
                            }, {
                                    $push: {
                                        'profile.employerId': currentUser._id
                                    }
                                })
                        } else {
                            throw new Meteor.Error(200, 'You are already linked with another users.');
                            //this user blongs to another user.
                        }

                    } else if (existingUser.profile.role == 'attorney' && !currentUser.profile.attorneyId) {
                        user.update({
                            _id: currentUser._id
                        }, {
                                $set: {
                                    'profile.attorneyId': existingUser._id
                                }
                            });

                        user.update({
                            'profile.employerId': currentUser._id,
                            'profile.attorneyId': {
                                '$exists': false
                            }
                        }, {
                                $set: {
                                    'profile.attorneyId': existingUser._id
                                }
                            }, {
                                multi: true
                            });
                    }
                    inviteLink.update({ _id: inviteLinkdetail._id }, {
                        $set: {
                            status: "accepted"
                        }
                    })

                }
            }
        }

    },
    insertCandidateAddressHistory: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateAddressInfoExist = addressHistory.findOne({
            candidateId: this.userId
        })
        var isDocApprovalByEmployeeOrAttorney = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateAddressInfoExist) {
            if (isDocApprovalByEmployeeOrAttorney && isDocApprovalByEmployeeOrAttorney.addressHistory && !isDocApprovalByEmployeeOrAttorney.addressHistory.approvalDocData.employerApproval && !isDocApprovalByEmployeeOrAttorney.addressHistory.approvalDocData.attorneyApproval) {
                obj['candidateId'] = this.userId

                return addressHistory.update({
                    _id: candidateAddressInfoExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Your Information is locked..');
            }
        } else {
            obj['candidateId'] = this.userId;

            var result = addressHistory.insert(obj, function (err, res) {
                console.log(err, res);
            });
            console.log(result);
            if (result) {
                Meteor.call("candidateDocumentUpdateMethod", result, "addressHistory")
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidateInfo');
            }
        }

    },


    insertCandidateAddresses: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateAddressesInfoExist = candidateAddresses.findOne({
            candidateId: this.userId
        })
        var isDocApprovalByEmployeeOrAttorney = candidateDocApproval.findOne({
            candidateId: this.userId
        })
        if (currentUser.profile.role == "candidate" && candidateAddressesInfoExist) {
            if (isDocApprovalByEmployeeOrAttorney && isDocApprovalByEmployeeOrAttorney.candidateAddresses && !isDocApprovalByEmployeeOrAttorney.candidateAddresses.approvalDocData.employerApproval && !isDocApprovalByEmployeeOrAttorney.candidateAddresses.approvalDocData.attorneyApproval) {
                obj['candidateId'] = this.userId

                return addressHistory.update({
                    _id: candidateAddressesInfoExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Your Information is locked..');
            }
        } else {
            obj['candidateId'] = this.userId;

            var result = candidateAddresses.insert(obj, function (err, res) {
                console.log(err, res);
            });
            console.log(result);
            if (result) {
                Meteor.call("candidateDocumentUpdateMethod", result, "candidateAddresses")
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidateInfo');
            }
        }

    },

    insertCandidateRelativesInfo: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var candidateRelativesInfoExist = relativesInfo.findOne({
            candidateId: this.userId
        });
        var isDocApprovalByEmployeeOrAttorney = candidateDocApproval.findOne({
            candidateId: this.userId
        })

        if (currentUser.profile.role == "candidate" && candidateRelativesInfoExist) {
            if (isDocApprovalByEmployeeOrAttorney && isDocApprovalByEmployeeOrAttorney.relativesInfo && !isDocApprovalByEmployeeOrAttorney.relativesInfo.approvalDocData.employerApproval && !isDocApprovalByEmployeeOrAttorney.relativesInfo.approvalDocData.attorneyApproval) {
                obj['candidateId'] = this.userId
                return relativesInfo.update({
                    _id: candidateRelativesInfoExist._id
                }, {
                        $set: obj
                    });
            } else {
                throw new Meteor.Error(200, 'Your Information is locked..');
            }

        } else {
            obj['candidateId'] = this.userId
            var result = relativesInfo.insert(obj);
            if (result) {
                Meteor.call("candidateDocumentUpdateMethod", result, "relativesInfo")
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidateInfo');
            }
        }

    },

    insertCandidateProfile: function (obj) {
        var currentUser = user.findOne({
            _id: this.userId
        });
        var candidateProfileInfoExist = userProfile.findOne({
            userId: this.userId
        });

        if (currentUser.profile.role == "candidate" && candidateProfileInfoExist) {
            obj['userId'] = this.userId
            return userProfile.update({
                _id: candidateProfileInfoExist._id
            }, {
                    $set: obj
                });
        } else {
            obj['userId'] = this.userId
            var result = userProfile.insert(obj);
            if (result) {
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidate Profile Info.');
            }
        }
    },
    insertAttorneyProfile: function (obj) {
        var currentUser = user.findOne({
            _id: this.userId
        });
        var attorneyProfileInfoExist = userProfile.findOne({
            userId: this.userId
        });

        if (currentUser.profile.role == "attorney" && attorneyProfileInfoExist) {
            obj['userId'] = this.userId
            return userProfile.update({
                _id: attorneyProfileInfoExist._id
            }, {
                    $set: obj
                });
        } else {
            obj['userId'] = this.userId
            var result = userProfile.insert(obj);
            if (result) {
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidate Profile Info.');
            }
        }
    },

    insertEmployerProfile: function (obj) {
        var currentUser = user.findOne({
            _id: this.userId
        });
        var employerProfileInfoExist = userProfile.findOne({
            userId: this.userId
        });

        if (currentUser.profile.role == "employer" && employerProfileInfoExist) {
            obj['userId'] = this.userId
            return userProfile.update({
                _id: employerProfileInfoExist._id
            }, {
                    $set: obj
                });
        } else {
            obj['userId'] = this.userId
            var result = userProfile.insert(obj);
            if (result) {
                return result;
            } else {
                throw new Meteor.Error(200, 'you can not insert candidate Profile Info.');
            }
        }
    },

    insertProposedJob: function (obj) {
        var currentUser = Meteor.users.findOne({
            _id: this.userId
        });
        var proposedJobInfoExist = proposedJob.findOne({
            userId: obj.userId
        })
        if ((currentUser.profile.role == "attorney" || currentUser.profile.role == "employer") && proposedJobInfoExist) {

            return proposedJob.update({
                _id: proposedJobInfoExist._id
            }, {
                    $set: obj
                });
        } else {
            if ((currentUser.profile.role == "attorney" || currentUser.profile.role == "employer")) {
                return proposedJob.insert(obj, function (err, res) {
                    console.log(err, res);
                });
            } else {
                throw new Meteor.Error(200, 'You can not insert Proposed Job Info');
            }
        }

    },
    uploadEmployerProfileDocs: function (docId, docType) {

        var currentUser = user.findOne({
            _id: this.userId
        });

        var employerProfileDocExist = employerProfileDoc.findOne({
            employerId: this.userId
        });

        if (currentUser.profile.role == "employer") {
            if (employerProfileDocExist) {
                var obj = {};
                obj[docType] = docId
                return employerProfileDoc.update({
                    _id: employerProfileDocExist._id
                }, {
                        $set: obj
                    });

            } else {
                var obj = {};
                obj['employerId'] = this.userId;
                obj[docType] = docId;
                return employerProfileDoc.insert(obj)
            }
        }

    },
    generateNewTicketConnect: function (ticketObj) {

        var currentUser = user.findOne({
            _id: this.userId
        });

        var obj = {};
        obj['requestorId'] = this.userId;
        obj['category'] = ticketObj.category;
        obj['subject'] = ticketObj.subject;
        obj['ticketConnect'] = [{
            userId: this.userId,
            info: ticketObj.info
        }];
       

        if (currentUser.profile.role == "candidate") {
            obj['connectWith'] = currentUser.profile.employerId;
        }
        else
        {
            if(!ticketObj.connectWith)
            {
                 throw new Meteor.Error(200, 'Please select Connect With.');
            }
        obj['connectWith'] = [ticketObj.connectWith];

        }

        return connects.insert(obj);

    },
    addTicketComment: function (comment, id) {

        var currentUser = user.findOne({
            _id: this.userId
        });

        var obj = {};
        obj['userId'] = this.userId;
        obj['info'] = comment;

        return connects.update({ _id: id }, { $push: { 'ticketConnect': obj }, $set: { 'ticketStatus': 'processing' } });

    },
    ticketStatusUpdate: function (status, id) {
        return connects.update({ _id: id }, { $set: { 'ticketStatus': status } });
    },
    sendMessageOnchat:function(message,chatUserId,chatId){
      
        var chatData = messages.findOne({$or: [{'requestorId': this.userId,'resonsorId':chatUserId}, {'requestorId': chatUserId,'resonsorId':this.userId}]});
        if(chatData)
        {
                var obj ={
                'userId': this.userId,
                'message':message,
                'isRead':false
            }
            return messages.update({_id:chatData._id},{$push:{'message':obj}});

        }
        else{
            var obj = {};
            obj['requestorId'] = this.userId;
            obj['resonsorId'] = chatUserId;
            obj['message'] = [{
                'userId': this.userId,
                'message':message
            }];
          return messages.insert(obj);
        }
    },
    messagesRead:function(selectedID){
           messages.find({
                _id: selectedID,
                "message.isRead": false
            })
            .forEach(function(chat) {
                var updatedItems = _.map(chat.message, function(message) {
                    if (!message.isRead) {
                        messages.update({  _id: selectedID,"message.isRead": false}, {$set: {"message.$.isRead": true}});
                    }
                    return message;
                });
            });
    },
    makeEmployerAsAdmin:function(employerId){
        return user.update({_id:employerId},{$set:{'profile.isCompany':true}});
    },
    pdfFillerMethodForSubmitFieldInPdfFormat: function (dataJson) {

        var pdfFiller = require('pdffiller');

        var sourcePDF = "/localPdf/test.pdf";
        var destinationPDF = "/outputPdf/test_complete.pdf";
        var data = {
            "part1_1_Family_Name": "part1_1_Family_Name",
            "part1_1_First_Name": "part1_1_First_Name",
            "part1_1_Middle_Name": "part1_1_Middle_Name",
            "part1_2_Company_Organization": "part1_2_Company_Organization",
            "part1_3_In_Case_of_Name": "part1_3_In_Case_of_Name",
            "part1_3_Street_Number_Name": "part1_3_Street_Number_Name",
            "part1_3_City_or_Town": "part1_3_City_or_Town",
            "part1_3_State": "part1_3_State",
            "part1_3_ZipCode": "part1_3_ZipCode",
            "part1_3_Postal_Code": "12345",
            "part1_3_Country": "part1_3_Country",
            "part1_4_Daytime_Telephone_Number": "1234567890",
            "part1_4_MobileNo": "0123456789",
            "part1_4_EmailId": "part1_4_EmailId",
            "part1_5_FEI_Number": "part1_5_FEI_Number",
            "part1_5_IRS_Number": "012345678",
            "part1_5_SSN": "012345678",
            "part2_5_Total_Num_Petition": "2",
            "part3_2_Family_Name": "part3_2_Family_Name",
            "part3_2_First_Name": "part3_2_First_Name",
            "part3_2_Middle_Name": "part3_2_Middle_Name",
            "part3_3_Family_Name": "part3_3_Family_Name",
            "part3_3_First_Name": "part3_3_First_Name",
            "part3_3_Middle_Name": "part3_3_Middle_Name",
            "part3_4_DOB": "part3_4_DOB",
            "part3_4_Alien_Num": "123456789",
            "part3_4_Country_Of_Birth": "part3_4_Country_Of_Birth",
            "part3_4_Province_of_Birth": "part3_4_Province_of_Birth",
            "part3_4_Country_of_Citizenship": "part3_4_Country_of_Citizenship",
            "part3_5_Date_of_last_Arrival": "part3_5_Date_of_last_Arrival",
            "part3_5_I94_Arri_Dep_Rec_Number": "123456789",
            "part3_5_passport_Number": "part3_5_passport_Number",
            "part3_5_Date_Passport_issued": "part3_5_Date_Passport_issued",
            "part3_5_Date_passport_Expire": "part3_5_Date_passport_Expire",
            "part3_5_Passport_Country_of_issuance": "part3_5_Passport_Country_of_issuance",
            "part3_5_curr_nonimmigrant_status": "part3_5_curr_nonimmigrant_status",
            "part3_5_Date_Status_Expires_D_S": "part3_5_Date_Status_Expires_D_S",
            "part3_5_SEVIS_Number": "part3_5_SEVIS_Number",
            "part3_5_EAD_Number": "part3_5_EAD_Number",
            "part3_6_Street_Number_Name": "part3_6_Street_Number_Name",
            "part4_1_office_Address_city": "part4_1_office_Address_city",
            "part4_1_US_State_Foreign_Country": "part4_1_US_State_Foreign_Country",
            "part4_1_Street_Number_Name": "part4_1_Street_Number_Name",
            "part4_1_City": "part4_1_City",
            "part4_1_State": "part4_1_State",
            "part4_1_Province": "part4_1_Province",
            "part4_1_Country": "part4_1_Country",
            "part5_1_Job_Title": "part5_1_Job_Title",
            "part5_1_LCA_ETA_Case_Number": "part5_1_LCA_ETA_Case_Number",
            "part5_3_Street_Number_Name": "part5_3_Street_Number_Name",
            "part5_3_City_or_Town": "part5_3_City_or_Town",
            "part5_8_Hour_period": "part5_8_Hour_period",
            "part5_9_Wages": "part5_9_Wages",
            "part5_9_Time_Period": "part5_9_Time_Period",
            "part5_10_other_Compensation": "part5_10_other_Compensation",
            "part5_11_Dates_Of_Emply_From": "part5_11_Dates_Of_Emply_From",
            "part5_11_Dates_Of_Emply_To": "part5_11_Dates_Of_Emply_To",
            "part5_12_Type_Of_Business": "part5_12_Type_Of_Business",
            "part5_13_year_Established": "part5_13_year_Established",
            "part5_14_Curr_Num_of_Emplo_in_US": "15",
            "part5_14_Gross_Annual_income": "1000000",
            "part5_14_Net_Annu_Income": "2000000",
            "part5_3_Zip_Code": "123456",
            "part5_3_State": "part5_3_State",
            "part7_1_Family_Name": "part7_1_Family_Name",
            "part7_1_First_Name": "part7_1_First_Name",
            "part7_1_Title": "part7_1_Title",
            "part7_2_Date_of_Signature": "part7_2_Date_of_Signature",
            "part7_3_EmailID": "part7_3_EmailID",
            "part7_3_DayTime_Number": "0123456789",
            "part8_1_Family_Name": "part8_1_Family_Name",
            "part8_1_First_Name": "part8_1_First_Name",
            "part8_2_Business_Organization_Name": "part8_2_Business_Organization_Name",
            "part8_3_Street_Number_Name": "part8_3_Street_Number_Name",
            "part8_3_City": "part8_3_City",
            "part8_3_postal_code": "123456",
            "part8_3_Number": "12345",
            "part8_3_State": "part8_3_State",
            "part8_3_ZipCode": "123456",
            "part8_4_Daytime_Number": "123456789",
            "part8_4_Fax_Number": "1234567",
            "part8_4_EmailID": "part8_4_EmailID",
            "part8_3_province": "part8_3_province",
            "part8_3_Country": "part8_3_Country",
            "part8_5_Date_of_Signature": "part8_5_Date_of_Signature",
            "H_1_Name_of_petitioner": "H_1_Name_of_petitioner",
            "H_2_Name_of_Beneficiary": "H_2_Name_of_Beneficiary",
            "H1B_name_Of_Petitioner": "H1B_name_Of_Petitioner",
            "H1B_name_Of_Benificiery": "H1B_name_Of_Benificiery",
            "H1B_Primary_Field_of_Study": "H1B_Primary_Field_of_Study",
            "H1B_Rate_of_Pay_Per_Year": "2000000",
            "H1B_Dot_Code": "030",
            "H1B_NAICS_Code": "1234567"
        };

        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
            if (err) throw err;
            else {
                console.log("In callback (we're done).");

            }
        });

    },
    zipFileGenerate: function () {

        var zip = new EasyZip();


        //zip a folder and change folder destination name
        var destinationpath = 'C:/data/uploadGallery/'
        var files = [
            { source: 'E:/MeteorProject/inventory.json', target: 'easyzip.js' },
            // {target : 'img'},//if source is null,means make a folder 
            { source: 'E:/MeteorProject/push_notifications_server.js', target: 'lib/tmp.js' }
        ];
        var zip4 = new EasyZip();
        zip4.batchAdd(files, function () {
            zip4.writeToFile(destinationpath + 'batchadd.zip');
        });

    }

});


Router.route("/PdfDownload/:candidateId/:employerId", function () {



    var sourcePDF = "/root/base_pdf/test.pdf";
    var destinationPDF = "/root/pdf_upload/test_complete.pdf";
    var data = {
        "part1_1_Family_Name": "part1_1_Family_Name",
        "part1_1_First_Name": "part1_1_First_Name",
        "part1_1_Middle_Name": "part1_1_Middle_Name",
        "part1_2_Company_Organization": "part1_2_Company_Organization",
        "part1_3_In_Case_of_Name": "part1_3_In_Case_of_Name",
        "part1_3_Street_Number_Name": "part1_3_Street_Number_Name",
        "part1_3_City_or_Town": "part1_3_City_or_Town",
        "part1_3_State": "part1_3_State",
        "part1_3_ZipCode": "part1_3_ZipCode",
        "part1_3_Postal_Code": "12345",
        "part1_3_Country": "part1_3_Country",
        "part1_4_Daytime_Telephone_Number": "1234567890",
        "part1_4_MobileNo": "0123456789",
        "part1_4_EmailId": "part1_4_EmailId",
        "part1_5_FEI_Number": "part1_5_FEI_Number",
        "part1_5_IRS_Number": "012345678",
        "part1_5_SSN": "012345678",
        "part2_5_Total_Num_Petition": "2",
        "part3_2_Family_Name": "part3_2_Family_Name",
        "part3_2_First_Name": "part3_2_First_Name",
        "part3_2_Middle_Name": "part3_2_Middle_Name",
        "part3_3_Family_Name": "part3_3_Family_Name",
        "part3_3_First_Name": "part3_3_First_Name",
        "part3_3_Middle_Name": "part3_3_Middle_Name",
        "part3_4_DOB": "part3_4_DOB",
        "part3_4_Alien_Num": "123456789",
        "part3_4_Country_Of_Birth": "part3_4_Country_Of_Birth",
        "part3_4_Province_of_Birth": "part3_4_Province_of_Birth",
        "part3_4_Country_of_Citizenship": "part3_4_Country_of_Citizenship",
        "part3_5_Date_of_last_Arrival": "part3_5_Date_of_last_Arrival",
        "part3_5_I94_Arri_Dep_Rec_Number": "123456789",
        "part3_5_passport_Number": "part3_5_passport_Number",
        "part3_5_Date_Passport_issued": "part3_5_Date_Passport_issued",
        "part3_5_Date_passport_Expire": "part3_5_Date_passport_Expire",
        "part3_5_Passport_Country_of_issuance": "part3_5_Passport_Country_of_issuance",
        "part3_5_curr_nonimmigrant_status": "part3_5_curr_nonimmigrant_status",
        "part3_5_Date_Status_Expires_D_S": "part3_5_Date_Status_Expires_D_S",
        "part3_5_SEVIS_Number": "part3_5_SEVIS_Number",
        "part3_5_EAD_Number": "part3_5_EAD_Number",
        "part3_6_Street_Number_Name": "part3_6_Street_Number_Name",
        "part4_1_office_Address_city": "part4_1_office_Address_city",
        "part4_1_US_State_Foreign_Country": "part4_1_US_State_Foreign_Country",
        "part4_1_Street_Number_Name": "part4_1_Street_Number_Name",
        "part4_1_City": "part4_1_City",
        "part4_1_State": "part4_1_State",
        "part4_1_Province": "part4_1_Province",
        "part4_1_Country": "part4_1_Country",
        "part5_1_Job_Title": "part5_1_Job_Title",
        "part5_1_LCA_ETA_Case_Number": "part5_1_LCA_ETA_Case_Number",
        "part5_3_Street_Number_Name": "part5_3_Street_Number_Name",
        "part5_3_City_or_Town": "part5_3_City_or_Town",
        "part5_8_Hour_period": "part5_8_Hour_period",
        "part5_9_Wages": "part5_9_Wages",
        "part5_9_Time_Period": "part5_9_Time_Period",
        "part5_10_other_Compensation": "part5_10_other_Compensation",
        "part5_11_Dates_Of_Emply_From": "part5_11_Dates_Of_Emply_From",
        "part5_11_Dates_Of_Emply_To": "part5_11_Dates_Of_Emply_To",
        "part5_12_Type_Of_Business": "part5_12_Type_Of_Business",
        "part5_13_year_Established": "part5_13_year_Established",
        "part5_14_Curr_Num_of_Emplo_in_US": "15",
        "part5_14_Gross_Annual_income": "1000000",
        "part5_14_Net_Annu_Income": "2000000",
        "part5_3_Zip_Code": "123456",
        "part5_3_State": "part5_3_State",
        "part7_1_Family_Name": "part7_1_Family_Name",
        "part7_1_First_Name": "part7_1_First_Name",
        "part7_1_Title": "part7_1_Title",
        "part7_2_Date_of_Signature": "part7_2_Date_of_Signature",
        "part7_3_EmailID": "part7_3_EmailID",
        "part7_3_DayTime_Number": "0123456789",
        "part8_1_Family_Name": "part8_1_Family_Name",
        "part8_1_First_Name": "part8_1_First_Name",
        "part8_2_Business_Organization_Name": "part8_2_Business_Organization_Name",
        "part8_3_Street_Number_Name": "part8_3_Street_Number_Name",
        "part8_3_City": "part8_3_City",
        "part8_3_postal_code": "123456",
        "part8_3_Number": "12345",
        "part8_3_State": "part8_3_State",
        "part8_3_ZipCode": "123456",
        "part8_4_Daytime_Number": "123456789",
        "part8_4_Fax_Number": "1234567",
        "part8_4_EmailID": "part8_4_EmailID",
        "part8_3_province": "part8_3_province",
        "part8_3_Country": "part8_3_Country",
        "part8_5_Date_of_Signature": "part8_5_Date_of_Signature",
        "H_1_Name_of_petitioner": "H_1_Name_of_petitioner",
        "H_2_Name_of_Beneficiary": "H_2_Name_of_Beneficiary",
        "H1B_name_Of_Petitioner": "H1B_name_Of_Petitioner",
        "H1B_name_Of_Benificiery": "H1B_name_Of_Benificiery",
        "H1B_Primary_Field_of_Study": "H1B_Primary_Field_of_Study",
        "H1B_Rate_of_Pay_Per_Year": "2000000",
        "H1B_Dot_Code": "030",
        "H1B_NAICS_Code": "1234567"
    };
    /*
    pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
        if (err) throw err;
        console.log("In callback (we're done).");
    });
    
    
    */


    var self = this;
    var fs = Npm.require("fs");
    //var pdfFiller   = Npm.require('pdffiller');
    switch (Meteor.absoluteUrl()) {
        case "http://localhost:3000/":
            basePdfpath = 'C:/data/basePdf/';
            pdfUploadPath = 'C:/data/uploadPdf/';
            break;
        case "http://localhost:80/":
            basePdfpath = '/var/trunck/basePdf/';
            pdfUploadPath = '/var/trunck/uploadPdf/';
            break;
        default:
            basePdfpath = '/root/base_pdf/';
            pdfUploadPath = '/root/pdf_upload/';
    }
    var sourcePDF = basePdfpath + "test.pdf";
    var destinationPDF = pdfUploadPath + "test_complete.pdf";
    // var destinationPDF =  "C:/data/uploadPdf/test_complete.pdf";
    var candidateId = this.params.candidateId;
    var employerId = this.params.employerId;

    console.log('candidateId', this.params.candidateId);
    console.log('employerId', this.params.employerId);

    var candidateMappingWithComAtto = user.findOne({ _id: candidateId });
    var candidtaInfo = candidateInfo.findOne({ candidateId: candidateId });
    var candidateAddresshistory = addressHistory.findOne({ candidateId: candidateId })
    var candidateEmployementHistory = employementHistory.findOne({ candidateId: candidateId });

    var employerProfileData = userProfile.findOne({ userId: employerId });
    var AttorenyprofileData = userProfile.findOne({ userId: candidateMappingWithComAtto.profile.attorneyId });
    var candidateProfileData = userProfile.findOne({ userId: candidateId });

    // console.log('candidateMappingWithComAtto',candidateMappingWithComAtto);
    // console.log('candidtaInfo',candidtaInfo);
    // console.log('candidateAddresshistory',candidateAddresshistory);
    // console.log('candidateEmployementHistory',candidateEmployementHistory);
    // console.log('employerProfileData',employerProfileData);
    // console.log('AttorenyprofileData',AttorenyprofileData);
    // console.log('candidateProfileData',candidateProfileData);
    // console.log('AttorenyprofileData.DayTime_Number', AttorenyprofileData.DayTime_Number);
    var data_final = {
        "part1_1_Family_Name": candidtaInfo ? candidtaInfo.lastName : '',
        "part1_1_First_Name": candidtaInfo ? candidtaInfo.firstName : '',
        "part1_1_Middle_Name": candidtaInfo ? candidtaInfo.middleName : '',
        "part1_2_Company_Organization": employerProfileData ? employerProfileData.companyName : '',
        "part1_3_In_Case_of_Name": employerProfileData ? employerProfileData.inCareOfName : '',
        "part1_3_Street_Number_Name": employerProfileData ? employerProfileData.street : '',
        "part1_3_Number": employerProfileData ? employerProfileData.number.toString() : '',
        "part1_3_City_or_Town": employerProfileData ? employerProfileData.city : '',
        "part1_3_State": employerProfileData ? employerProfileData.state : '',
        "part1_3_ZipCode": employerProfileData ? employerProfileData.zipCode.toString() : '',
        "part1_3_Province": employerProfileData ? employerProfileData.province : '',
        "part1_3_Postal_Code": employerProfileData ? employerProfileData.zipCode.toString() : '',
        "part1_3_Country": employerProfileData ? employerProfileData.country : '',
        "part1_4_Daytime_Telephone_Number": candidtaInfo ? candidtaInfo.dayPhone.toString() : '',
        "part1_4_MobileNo": candidtaInfo ? candidtaInfo.cellPhone.toString() : '',
        "part1_4_EmailId": candidtaInfo ? candidtaInfo.email : '',
        "part1_5_FEI_Number": employerProfileData ? employerProfileData.FEI_Number.toString() : '',
        // "part1_5_IRS_Number" : "012345678",
        "part1_5_SSN": candidtaInfo ? candidtaInfo.socialSecurityNumber : '',
        "part2_5_Total_Num_Petition": "1",
        "part3_2_Family_Name": candidtaInfo ? candidtaInfo.lastName : '',
        "part3_2_First_Name": candidtaInfo ? candidtaInfo.firstName : '',
        "part3_2_Middle_Name": candidtaInfo ? candidtaInfo.middleName : '',
        "part3_3_Family_Name": candidtaInfo ? candidtaInfo.lastName : '',
        "part3_3_First_Name": candidtaInfo ? candidtaInfo.firstName : '',
        "part3_3_Middle_Name": candidtaInfo ? candidtaInfo.middleName : '',
        "part3_4_DOB": candidtaInfo ? moment(candidtaInfo.dateOfBirth).format('MM/DD/YYYY') : '',
        "part3_4_SSN": candidtaInfo ? candidtaInfo.socialSecurityNumber : '',
        "part3_4_Alien_Num": candidtaInfo ? candidtaInfo.alienNumber : '',
        "part3_4_Country_Of_Birth": candidtaInfo ? candidtaInfo.countryOfBirth : '',
        "part3_4_Province_of_Birth": candidtaInfo ? candidtaInfo.stateOfBirth : '',
        "part3_4_Country_of_Citizenship": candidtaInfo ? candidtaInfo.countryOfNationality : '',
        "part3_5_Date_of_last_Arrival": candidtaInfo ? moment(candidtaInfo.arrivalDateLastEntryDateInUS).format('MM/DD/YYYY') : '',
        "part3_5_I94_Arri_Dep_Rec_Number": "",
        "part3_5_passport_Number": candidtaInfo ? candidtaInfo.passportNumber : '',
        "part3_5_Date_Passport_issued": candidtaInfo ? moment(candidtaInfo.passportIssuedDate).format('MM/DD/YYYY') : '',
        "part3_5_Date_passport_Expire": candidtaInfo ? moment(candidtaInfo.passportExpireDate).format('MM/DD/YYYY') : '',
        "part3_5_Passport_Country_of_issuance": candidtaInfo ? candidtaInfo.passportIssueingCountry : '',
        "part3_5_curr_nonimmigrant_status": "",
        "part3_5_Date_Status_Expires_D_S": "N/A",
        "part3_5_SEVIS_Number": "N/A",
        "part3_5_EAD_Number": "part3_5_EAD_Number",
        "part3_6_Street_Number_Name": "N/A",
        // "part4_1_office_Address_city" : "part4_1_office_Address_city",
        // "part4_1_US_State_Foreign_Country" : "part4_1_US_State_Foreign_Country",
        // "part4_1_Street_Number_Name" : "part4_1_Street_Number_Name",
        // "part4_1_City" : "part4_1_City",
        // "part4_1_State" : "part4_1_State",
        // "part4_1_Province" : "part4_1_Province",
        // "part4_1_Country" : "part4_1_Country",
        "part5_1_Job_Title": candidateEmployementHistory ? candidateEmployementHistory.jobTitle : '',
        "part5_1_LCA_ETA_Case_Number": "",
        "part5_3_Street_Number_Name": candidateEmployementHistory ? candidateEmployementHistory.street : '',
        "part5_3_City_or_Town": candidateEmployementHistory ? candidateEmployementHistory.city : '',
        // "part5_8_Hour_period" : "part5_8_Hour_period",
        // "part5_9_Wages" : "part5_9_Wages",
        // "part5_9_Time_Period" : "part5_9_Time_Period",
        // "part5_10_other_Compensation" : "part5_10_other_Compensation",
        "part5_11_Dates_Of_Emply_From": employerProfileData ? moment(employerProfileData.from).format('MM/DD/YYYY') : '',
        "part5_11_Dates_Of_Emply_To": employerProfileData ? moment(employerProfileData.to).format('MM/DD/YYYY') : '',
        "part5_12_Type_Of_Business": employerProfileData ? employerProfileData.businessType : '',
        "part5_13_year_Established": employerProfileData ? employerProfileData.year : '',
        "part5_14_Curr_Num_of_Emplo_in_US": employerProfileData ? employerProfileData.numberofEmp : '',
        "part5_14_Gross_Annual_income": employerProfileData ? employerProfileData.grossIncome : '',
        "part5_14_Net_Annu_Income": employerProfileData ? employerProfileData.netIncome : '',
        "part5_3_Zip_Code": candidateEmployementHistory ? candidateEmployementHistory.zipCode.toString() : '',
        "part5_3_State": candidateEmployementHistory ? candidateEmployementHistory.state : '',
        "part7_1_Family_Name": employerProfileData ? employerProfileData.lastName : '',
        "part7_1_First_Name": employerProfileData ? employerProfileData.firstName : '',
        "part7_1_Title": employerProfileData ? employerProfileData.title : '',
        // "part7_2_Date_of_Signature" : "part7_2_Date_of_Signature",
        "part7_3_EmailID": employerProfileData ? employerProfileData.email : '',
        "part7_3_DayTime_Number": employerProfileData ? employerProfileData.DayTime_Number.toString() : '',
        "part8_1_Family_Name": AttorenyprofileData ? AttorenyprofileData.lastName : '',
        "part8_1_First_Name": AttorenyprofileData ? AttorenyprofileData.firstName : '',
        "part8_2_Business_Organization_Name": AttorenyprofileData ? AttorenyprofileData.companyName : '',
        "part8_3_Street_Number_Name": AttorenyprofileData ? AttorenyprofileData.street : '',
        "part8_3_City": AttorenyprofileData ? AttorenyprofileData.city : '',
        "part8_3_postal_code": AttorenyprofileData ? AttorenyprofileData.zipCode.toString() : '',
        "part8_3_Number": AttorenyprofileData ? AttorenyprofileData.number : '',
        "part8_3_State": AttorenyprofileData ? AttorenyprofileData.state : '',
        "part8_3_ZipCode": AttorenyprofileData ? AttorenyprofileData.zipCode.toString() : '',
        "part8_4_Daytime_Number": AttorenyprofileData ? AttorenyprofileData.DayTime_Number.toString() : '',
        "part8_4_Fax_Number": AttorenyprofileData ? AttorenyprofileData.Fax_Number.toString() : '',
        "part8_4_EmailID": AttorenyprofileData ? AttorenyprofileData.email : '',
        "part8_3_province": AttorenyprofileData ? AttorenyprofileData.province : '',
        "part8_3_Country": AttorenyprofileData ? AttorenyprofileData.country : '',
        "part8_5_Date_of_Signature": '',
        "H_1_Name_of_petitioner": employerProfileData ? employerProfileData.petitioner : '',
        "H_2_Name_of_Beneficiary": candidateProfileData ? candidateProfileData.firstName : '',
        "H1B_name_Of_Petitioner": employerProfileData ? employerProfileData.petitioner : '',
        "H1B_name_Of_Benificiery": candidateProfileData ? candidateProfileData.firstName : '',
        "H1B_Primary_Field_of_Study": candidateProfileData ? candidateProfileData.Primary_Field_of_Study : '',
        "H1B_Rate_of_Pay_Per_Year": AttorenyprofileData ? AttorenyprofileData.rateofPayPerYear.toString() : '',
        "H1B_Dot_Code": "030",
        "H1B_NAICS_Code": ""
    };
    var generatedFileName = "";
    if (candidtaInfo) {
        generatedFileName = candidtaInfo.firstName + '_' + candidtaInfo.lastName + '_' + employerId + ".pdf";
    }
    else {
        generatedFileName = candidateId + '_' + employerId + ".pdf"
    }

    pdfFiller.fillForm("/root/base_pdf/test.pdf", "/root/pdf_upload/" + generatedFileName, JSON.parse(JSON.stringify(data_final)), function (err) {
        if (err) throw err;
        else {
            console.log("In callback (we're done).");
            var file = fs.readFileSync("/root/pdf_upload/" + generatedFileName);
            var headers = {
                //'Content-type': 'image/png',
                'Content-Disposition': "attachment; filename=" + generatedFileName
            };

            self.response.writeHead(200, headers);
            return self.response.end(file);

        }
    });
    // var file = fs.readFileSync(destinationPDF);
    //         var headers = {
    //             //'Content-type': 'image/png',
    //             'Content-Disposition': "attachment; filename="+candidtaInfo.lastName+'_'+candidtaInfo.firstName+'_'+employerId+".pdf"
    //         };
    //
    //         self.response.writeHead(200, headers);
    //         return self.response.end(file);

}, { where: 'server' });





Router.route("/zipFileGenerate/:docArray/:candidateId", function () {
    var self = this;

    var candidateId = this.params.candidateId;
    var candidateData = user.findOne({ _id: candidateId });
    var currentTime = moment().format('x');
    var destinationZipFilePath = fileUploadPath + candidateData.profile.name + '_' + currentTime + '.zip';
    var fs = Npm.require('fs');
    var archiver = Npm.require('archiver');
    var output = fs.createWriteStream(destinationZipFilePath);
    var archive = archiver('zip');

    output.on('close', function () {
        var file = fs.readFileSync(destinationZipFilePath);
        var headers = {
            'Content-Disposition': "attachment; filename=" + candidateData.profile.name + '_' + currentTime + '.zip'
        };

        self.response.writeHead(200, headers);
        return self.response.end(file);
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    //archive.append(null, { name: 'directory/' });
    // archive.bulk([
    //   { expand: true, cwd: 'C:/data/uploadGallery/', src: ['Uploads-3hXmbqdR5qoYeqzgb-1233441_208599252635220_1278030729_n.jpg'], dest: 'source'},
    //   { expand: true, cwd: 'C:/data/uploadGallery/', src: ['Uploads-BYcXs3Y4EmDRohAP7-PivotMockup.jpg'], dest: 'source' },
    //   { expand: true, cwd: 'C:/data/uploadGallery/', src: ['Uploads-5cxeBgmSncQwd9uxe-Visi Logo 1,200Px.png'], dest: 'source' },
    //   { expand: true, cwd: 'C:/data/uploadGallery/', src: ['Uploads-qbnhQAnbYmpRuddzT-iXpress - Things to do.xlsx - Docs.pdf'], dest: 'pdf' }
    // ]);
    var docArray = this.params.docArray.split(',');
    var docApprovalData = candidateDocApproval.findOne({ candidateId: candidateId });
    
    docArray.forEach(function (d, i) {
        if (docApprovalData[d] && docApprovalData[d].documentId.length > 0) {
            docApprovalData[d].documentId.forEach(function (dd, ii) {

                var uploadedDoc = Uploads.findOne({ _id: dd });
                
                archive.append(fs.createReadStream(fileUploadPath + uploadedDoc.copies.Uploads.key), { name: d + '/' + uploadedDoc.original.name });

            })
        }
    })
    archive.finalize();

}, { where: 'server' });
