var profilePic = '';
if (Meteor.isClient) {
  Template.payslips.onRendered(function() {
      profilePic = '';
      var self = this;
      Tracker.autorun(function(obj){
        debugger;
        var candidateDocApprovalDAta =candidateDocApproval.find({}).fetch();
        if(!obj.firstRun){
        var candidateId = readCookie('candiateId')
        Meteor.subscribe("candidateDocListPaySlips",candidateId,Random.id())
      }
      });
  });
  Template.payslips.helpers({
    theFiles: function() {
      debugger;
      var candidateId = readCookie('candiateId')
      if(candidateId == null && Meteor.user() && Meteor.user().profile.role == "candidate")
      {
        candidateId = Meteor.userId()
      }
      var docData = candidateDocApproval.findOne({
          candidateId: candidateId
      });
        if(docData && docData.employmentpaySlips)
        {
          var documentData = Uploads.find({
              _id: {
                  $in: docData.employmentpaySlips.documentId
              }
          }).fetch()
          return  documentData;
        }
        return [];
    }
  });

  Template.payslips.events({
    'click #deleteFileButton ': function(event) {
      showLoadingMask();
        Meteor.call("removeDocumentCandidate", this._id, 'employmentpaySlips', function(error, result) {
          hideLoadingMask();
            if (error) {
                FlashMessages.sendError(error.reason);
            }
            if (result) {
              FlashMessages.sendSuccess('Documnet removed successfully.');
            }
        });
    },
    'change .your-upload-class': function(event, template) {
      showLoadingMask();
        console.log("uploading...")
        FS.Utility.eachFile(event, function(file) {
            console.log("each file...");
            var yourFile = new FS.File(file);

            Uploads.insert(yourFile, function(err, fileObj) {
                profilePic = fileObj._id;
                Meteor.call("documentUploadMethodForCandidate", profilePic, 'employmentpaySlips', function(err) {
                    if (err) {
                      hideLoadingMask();
                          FlashMessages.sendError(err.reason);
                    } else {
                        //window.location.reload()
                        //var candidtID = readCookie('candiateId');
                    //  Meteor.subscribe("candidateDocListPaySlips",candidtID,function(){
                          checkisFileUploadSuccessfully(profilePic);
                    //  });
                    }
                });


            });

        });
    }
  });


}
