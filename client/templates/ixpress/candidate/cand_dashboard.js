var candidateDocUpload = {};
var profilePic = "";
Template.CandDashboard.onRendered(function () {
  candidateDocUpload = {};
  profilePic = "";
  var self = this;
  Tracker.autorun(function (obj) {
    var commonDocUploadDAta = commonUserDocsUpload.find({}).fetch();
    console.log("message");
    if (!obj.firstRun) {
      var candidateId = readCookie('candiateId')
      self.subscribe("candidateDocList", candidateId, Random.id())
    }
  });
});
Template.CandDashboard.events({

  "click #employerApprove": function (e, t) {
    showLoadingMask();
    e.preventDefault();
    var currentUser = Meteor.user();
    if (currentUser.profile.role == "employer") {
      var fieldkey = $(e.currentTarget).attr('data-key');
      var ischecked = $(e.currentTarget).prop('checked');
      var candidateId = readCookie('candiateId');
      Meteor.call("employerApproveDoc", fieldkey, ischecked, candidateId, function (error, result) {
        hideLoadingMask();
        if (error) {
          FlashMessages.sendError(error.reason);
        }
        if (result) {
          FlashMessages.sendSuccess('Your action is stored successfully..');
        }
      });
    }
    else {
      FlashMessages.sendError("You are resticted for this action..");
      hideLoadingMask();
    }
  },
  "click #attorneyApprove": function (e, t) {
    showLoadingMask();
    e.preventDefault();
    var currentUser = Meteor.user();
    if (currentUser.profile.role == "attorney") {
      var fieldkey = $(e.currentTarget).attr('data-key');
      var ischecked = $(e.currentTarget).prop('checked');
      var candidateId = readCookie('candiateId');
      Meteor.call("attorneyApproveDoc", fieldkey, ischecked, candidateId, function (error, result) {
        hideLoadingMask();
        if (error) {
          FlashMessages.sendError(error.reason);
        }
        if (result) {
          FlashMessages.sendSuccess('Your action is stored successfully..');
        }
      });
    }
    else {
      FlashMessages.sendError("You are resticted for this action..");
      hideLoadingMask();
    }
  },
  'change .employeeUpload': function (event, template) {
    showLoadingMask();
    console.log("uploading...")
    debugger;
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
      var yourFile = new FS.File(file);

      Uploads.insert(yourFile, function (err, fileObj) {

        var profilePic = fileObj._id;
        var candidateId = readCookie('candiateId')
        if (candidateId == null && Meteor.user().profile.role == "candidate") {
          candidateId = Meteor.userId()
        }
        if ($(event.currentTarget).hasClass('commonDocEmployer')) {
          var docType = $(event.currentTarget).attr('doc-type');

          Meteor.call("commondocumentUploadMethodForCandidate_employee", profilePic, candidateId, docType, function (err) {
            if (err) {
              hideLoadingMask();
              FlashMessages.sendError(err.reason);
            } else {
              checkisFileUploadSuccessfully(profilePic);
            }
          });

        }
        else {
          Meteor.call("commondocumentUploadMethodForCandidate_employee", profilePic, candidateId, function (err) {
            if (err) {
              hideLoadingMask();
              FlashMessages.sendError(err.reason);
            } else {
              checkisFileUploadSuccessfully(profilePic);
            }
          });
        }


      });

    });
  },
  'change .attorneyUpload': function (event, template) {
    showLoadingMask();
    console.log("uploading...")
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
      var yourFile = new FS.File(file);

      Uploads.insert(yourFile, function (err, fileObj) {
        var profilePic = fileObj._id;
        var candidateId = readCookie('candiateId')
        if (candidateId == null && Meteor.user().profile.role == "candidate") {
          candidateId = Meteor.userId()
        }

        if ($(event.currentTarget).hasClass('commonDocAttorney')) {
          var docType = $(event.currentTarget).attr('doc-type');

          Meteor.call("commondocumentUploadMethodForCandidate_attorney", profilePic, candidateId,docType, function (err) {
            if (err) {
              hideLoadingMask();
              FlashMessages.sendError(err.reason);
            } else {
              checkisFileUploadSuccessfully(profilePic);
            }
          });
        }
        else {
          Meteor.call("commondocumentUploadMethodForCandidate_attorney", profilePic, candidateId, function (err) {
            if (err) {
              hideLoadingMask();
              FlashMessages.sendError(err.reason);
            } else {
              checkisFileUploadSuccessfully(profilePic);
            }
          });
        }


      });

    });
  },
  'change .candidateEmployerUpload': function (event, template) {
    showLoadingMask();
    console.log("uploading...")
    var self = this;
    debugger;
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
      var yourFile = new FS.File(file);

      Uploads.insert(yourFile, function (err, fileObj) {
        candidateDocUpload[self.employerDocId] = fileObj._id;
        $(event.target).parent().parent().find('.candidateUpload').attr('data-id', self.employerDocId);
        hideLoadingMask();
      });

    });
  },
  'click .candidateUpload': function (event, target) {
    showLoadingMask();
    var self = this;
    var uploadDocType = "";
    if (self.employerDocId) {
      uploadDocType = "employer";
    }
    else {
      uploadDocType = "attorney";

    }
    var attorneyOrEmployerDoc = $(event.currentTarget).attr('data-id');
    var uploadDocId = candidateDocUpload[attorneyOrEmployerDoc];
    if (attorneyOrEmployerDoc && uploadDocId) {
      if ($(event.currentTarget).hasClass('commonDocEmployer')) {
        var docType = $(event.currentTarget).attr('doc-type');
        Meteor.call("candidateUploadCommonDoc", attorneyOrEmployerDoc, uploadDocId, uploadDocType, docType, function (error, result) {
          if (error) {
            hideLoadingMask();
            FlashMessages.sendError(error.reason);
          }
          if (result) {
            var candidtID = readCookie('candiateId');
            checkisFileUploadSuccessfully(uploadDocId);
            FlashMessages.sendSuccess('Document uploaded successfully..');
          }
        });
      }
      else {
        Meteor.call("candidateUploadCommonDoc", attorneyOrEmployerDoc, uploadDocId, uploadDocType, function (error, result) {
          if (error) {
            hideLoadingMask();
            FlashMessages.sendError(error.reason);
          }
          if (result) {
            var candidtID = readCookie('candiateId');
            checkisFileUploadSuccessfully(uploadDocId);
            FlashMessages.sendSuccess('Document uploaded successfully..');
          }
        });

      }

    }
    else {
      hideLoadingMask();
      FlashMessages.sendError('Please select document first.. or You can not upload doc before company.');
    }

  },
  'change .candidateAttorneyUpload': function (event, template) {
    showLoadingMask();
    console.log("uploading...")
    var self = this;
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
      var yourFile = new FS.File(file);

      Uploads.insert(yourFile, function (err, fileObj) {
        hideLoadingMask();
        //  profilePic = fileObj._id;
        candidateDocUpload[self.attorneyDocId] = fileObj._id;
        $(event.target).parent().parent().find('.candidateUpload').attr('data-id', self.attorneyDocId);
      });

    });
  },
  'click #deleteFileButtonEmployerDoc ': function (event) {
    showLoadingMask();

    Meteor.call("removeDocumentEmployer", this.employerDocId, readCookie('candiateId'), function (error, result) {
      hideLoadingMask();
      if (error) {
        FlashMessages.sendError(error.reason);
      }
      else {
        FlashMessages.sendSuccess('Document removed successfully.');
      }
    });
  },
  'click #deleteFileButtonAttorneyDoc ': function (event) {
    showLoadingMask();

    Meteor.call("removeDocumentAttorney", this.attorneyDocId, readCookie('candiateId'), function (error, result) {
      hideLoadingMask();
      if (error) {
        FlashMessages.sendError(error.reason);
      }
      else {
        FlashMessages.sendSuccess('Document removed successfully.');
      }
    });
  },
  'click .pdfDownload': function (e, t) {
    e.preventDefault();
    var candidateId = readCookie('candiateId')
    var employerId = $('.employerValue').val();
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
    if (Meteor.user().profile.role == "employer") {
      employerId = Meteor.userId();
    }
    
    window.open('/PdfDownload/' + candidateId+'/'+employerId, '_blank');
  },
  'click #proposedJobDetail': function (e, t) {
    e.preventDefault();
    var employerId = $('.employerProosedValue').val();
    if (employerId) {
      Router.go('/proposedJob/candidate/' + employerId);

    }
    else {
      Router.go('/proposedJob/candidate/');

    }
  },
  'click #masterCheckBox':function(e,t)
  {
    if($(e.currentTarget).is(':checked'))
    {
        $('.i-checks').each(function(i,d){
          $(this).prop('checked',true);
        });
    }
    else
    {
      $('.i-checks').each(function(i,d){
         $(this).prop('checked',false);
       });
    }
  },
   'click .downloadZipFile': function (e, t) {
    e.preventDefault();
   var docArray = [];
    $('.i-checks').each(function(i,d){
      if($(this).prop('checked'))
      {
        docArray.push($(this).attr('name'))
      }
        });

 var candidateId = readCookie('candiateId')
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
if(docArray.length > 0)
{
   window.open('/zipFileGenerate/' + docArray+'/'+candidateId, '_blank');
}
else
{
  FlashMessages.sendError('Please check at least one document ');
}

  },


});

Template.CandDashboard.helpers({
  documentList: function () {
    var formateedArray = [];
    var documentList = candidateDocApproval.findOne({});
    debugger;
    arrDocuments.forEach(function (d, i) {
      var jsonFormat = {};
      jsonFormat['index'] = i + 1;
      jsonFormat['key'] = d.key;
      jsonFormat['value'] = d.value;
      jsonFormat['isDoc'] = d.isDoc;
      jsonFormat['routeName'] = d.routeName;
      jsonFormat['docCount'] = (documentList && documentList[d.key]) ? $.isArray(documentList[d.key].documentId) ? '(' + documentList[d.key].documentId.length + ')' : '' : '';
      jsonFormat['candidateApproval'] = (documentList && documentList[d.key]) ? documentList[d.key].approvalDocData.candidateApproval ? '<i class="fa fa-check"></i>' : '<i class="fa fa-close"></i>' : '<i class="fa fa-close"></i>';
      jsonFormat['employerApproval'] = (documentList && documentList[d.key]) ? documentList[d.key].approvalDocData.employerApproval ? '<i class="fa fa-check"></i>' : '<i class="fa fa-close"></i>' : '<i class="fa fa-close"></i>';
      jsonFormat['attorneyApproval'] = (documentList && documentList[d.key]) ? documentList[d.key].approvalDocData.attorneyApproval ? '<i class="fa fa-check"></i>' : '<i class="fa fa-close"></i>' : '<i class="fa fa-close"></i>';
      jsonFormat['candidateApprovalbinary'] = (documentList && documentList[d.key]) ? documentList[d.key].approvalDocData.candidateApproval ? true : false : false;
      jsonFormat['employerApprovalbinary'] = (documentList && documentList[d.key]) ? documentList[d.key].approvalDocData.employerApproval ? true : false : false;
      jsonFormat['attorneyApprovalbinary'] = (documentList && documentList[d.key]) ? documentList[d.key].approvalDocData.attorneyApproval ? true : false : false;
      formateedArray.push(jsonFormat);
    })
    return formateedArray;
  },
  theFilesForEmployer: function () {
    var candidateId = readCookie('candiateId')
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
    var docData = commonUserDocsUpload.findOne({
      candidateId: candidateId
    });
    if (docData && docData.employerUploadDoc) {
      var documentDataArray = [];
      docData.employerUploadDoc.forEach(function (d, i) {
        var documentData = {};
        documentData["employerDoc"] = Uploads.findOne({ _id: d.documentData });
        documentData["employerDocId"] = d.documentData
        if (d.candidateDocData) {
          documentData["candidateDocData"] = Uploads.findOne({ _id: d.candidateDocData });
        }
        else {
          documentData["candidateDocData"] = false;
        }
        documentDataArray.push(documentData);
      })
      return documentDataArray;
    }
    return [];
  },
  theFilesForEmployerCommon: function () {
    var candidateId = readCookie('candiateId')
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
    var docData = commonUserDocsUpload.findOne({
      candidateId: candidateId
    });
    var formateedArray = [];
    debugger;
    employerDocList.forEach(function (d, i) {
      var jsonFormat = {};
      jsonFormat['key'] = d.key;
      jsonFormat['value'] = d.value;
      jsonFormat["employerDoc"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? Uploads.findOne({ _id: docData[d.key]['documentData'] }) : false;
      jsonFormat["employerDocId"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? docData[d.key]['documentData'] : '';

      if (docData && docData[d.key] && docData[d.key]['candidateDocData']) {
        jsonFormat["candidateDocData"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? Uploads.findOne({ _id: docData[d.key]['candidateDocData'] }) : false;
      }
      else {
        jsonFormat["candidateDocData"] = false;
      }
      formateedArray.push(jsonFormat);
    });
    return formateedArray;


  },
  theFilesForEmployerSpecificCommon: function () {
    var candidateId = readCookie('candiateId')
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
    var docData = commonUserDocsUpload.findOne({
      candidateId: candidateId
    });
    var formateedArray = [];
    debugger;
    employerSpecificDocList.forEach(function (d, i) {
      var jsonFormat = {};
      jsonFormat['key'] = d.key;
      jsonFormat['value'] = d.value;
      jsonFormat["employerDoc"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? Uploads.findOne({ _id: docData[d.key]['documentData'] }) : false;
      jsonFormat["employerDocId"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? docData[d.key]['documentData'] : '';

      formateedArray.push(jsonFormat);
    });
    return formateedArray;


  },

  theFilesForAttorneySpecificCommon: function () {
    var candidateId = readCookie('candiateId')
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
    var docData = commonUserDocsUpload.findOne({
      candidateId: candidateId
    });
    var formateedArray = [];
    debugger;
    attorneySpecificDocList.forEach(function (d, i) {
      var jsonFormat = {};
      jsonFormat['key'] = d.key;
      jsonFormat['value'] = d.value;
      jsonFormat["attorneyDoc"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? Uploads.findOne({ _id: docData[d.key]['documentData'] }) : false;
      jsonFormat["attorneyDocId"] = (docData && docData[d.key] && docData[d.key]['documentData']) ? docData[d.key]['documentData'] : '';

      formateedArray.push(jsonFormat);
    });
    return formateedArray;


  },

  theFilesForAttorney: function () {
    var candidateId = readCookie('candiateId')
    if (candidateId == null && Meteor.user().profile.role == "candidate") {
      candidateId = Meteor.userId()
    }
    var docData = commonUserDocsUpload.findOne({
      candidateId: candidateId
    });
    if (docData && docData.attorneyUploadDoc) {
      var documentDataArray = [];
      docData.attorneyUploadDoc.forEach(function (d, i) {
        var documentData = {};
        documentData["attorneyDoc"] = Uploads.findOne({ _id: d.documentData });
        documentData["attorneyDocId"] = d.documentData
        if (d.candidateDocData) {
          documentData["candidateDocData"] = Uploads.findOne({ _id: d.candidateDocData });
        }
        else {
          documentData["candidateDocData"] = false;
        }
        documentDataArray.push(documentData);
      })
      return documentDataArray;
    }
    return [];
  },
  employeeDDL: function () {
    if (Meteor.user() && Meteor.user().profile.role == "candidate") {
      return user.find({ _id: { $in: Meteor.user().profile.employerId } }, { fields: { 'profile.name': 1, _id: 1 } }).fetch();
    }
    if (Meteor.user() && Meteor.user().profile.role == "attorney") {
      return user.find({ _id: { $ne: Meteor.userId() } }, { fields: { 'profile.name': 1, _id: 1 } }).fetch();
    }
  }
});
Template.CandDashboard.onRendered(function () {
  // Function for collapse hpanel

  $('.showhide').on('click', function (event) {
    event.preventDefault();
    var hpanel = $(this).closest('div.hpanel');
    var icon = $(this).find('i:first');
    var body = hpanel.find('div.panel-body');
    var footer = hpanel.find('div.panel-footer');
    body.slideToggle(300);
    footer.slideToggle(200);

    // Toggle icon from up to down
    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    hpanel.toggleClass('').toggleClass('panel-collapse');
    setTimeout(function () {
      hpanel.resize();
      hpanel.find('[id^=map-]').resize();
    }, 50);
  });
});
