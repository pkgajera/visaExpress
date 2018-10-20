Template.EduHistory.events({
    "submit #eduHitoryForm": function(event){
      showLoadingMask();
        event.preventDefault();
        debugger;
        var obj ={};
        var highSchoolObj = {
            nameofSchool: event.target.highSchool_nameofSchool.value,
            fieldOfStudySchool: event.target.highSchool_fieldOfStudySchool.value,
            degree: event.target.highSchool_degree.value,
            degreeEvaluated: event.target.highSchool_degreeEvaluated.value,
            recievedDate: event.target.highSchool_recievedDate.value,
            city: event.target.highSchool_city.value,
            state: event.target.highSchool_state.value,
            zipCode: event.target.highSchool_zipCode.value,
            country: event.target.highSchool_country.value,
            streetAddress: event.target.highSchool_streetAddress.value,
            attendedFromDate: event.target.highSchool_attendedFromDate.value,
            attendedToDate: event.target.highSchool_attendedToDate.value,
            totalYears: event.target.highSchool_totalYears.value
        };
        var bachelorObj = {
            nameofSchool: event.target.bachelor_nameofSchool.value,
            fieldOfStudySchool: event.target.bachelor_fieldOfStudySchool.value,
            degree: event.target.bachelor_degree.value,
            degreeEvaluated: event.target.bachelor_degreeEvaluated.value,
            recievedDate: event.target.bachelor_recievedDate.value,
            city: event.target.bachelor_city.value,
            state: event.target.bachelor_state.value,
            zipCode: event.target.bachelor_zipCode.value,
            country: event.target.bachelor_country.value,
            streetAddress: event.target.bachelor_streetAddress.value,
            attendedFromDate: event.target.bachelor_attendedFromDate.value,
            attendedToDate: event.target.bachelor_attendedToDate.value,
            totalYears: event.target.bachelor_totalYears.value
        };
        var masterObj = {
            nameofSchool: event.target.master_nameofSchool.value,
            fieldOfStudySchool: event.target.master_fieldOfStudySchool.value,
            degree: event.target.master_degree.value,
            degreeEvaluated: event.target.master_degreeEvaluated.value,
            recievedDate: event.target.master_recievedDate.value,
            city: event.target.master_city.value,
            state: event.target.master_state.value,
            zipCode: event.target.master_zipCode.value,
            country: event.target.master_country.value,
            streetAddress: event.target.master_streetAddress.value,
            attendedFromDate: event.target.master_attendedFromDate.value,
            attendedToDate: event.target.master_attendedToDate.value,
            totalYears: event.target.master_totalYears.value
        };
        var phdObj = {
            nameofSchool: event.target.phd_nameofSchool.value,
            fieldOfStudySchool: event.target.phd_fieldOfStudySchool.value,
            degree: event.target.phd_degree.value,
            degreeEvaluated: event.target.phd_degreeEvaluated.value,
            recievedDate: event.target.phd_recievedDate.value,
            city: event.target.phd_city.value,
            state: event.target.phd_state.value,
            zipCode: event.target.phd_zipCode.value,
            country: event.target.phd_country.value,
            streetAddress: event.target.phd_streetAddress.value,
            attendedFromDate: event.target.phd_attendedFromDate.value,
            attendedToDate: event.target.phd_attendedToDate.value,
            totalYears: event.target.phd_totalYears.value
        };

        obj['highSchool'] = highSchoolObj;
        obj['bachelor'] = bachelorObj;
        obj['master'] = masterObj;
        obj['phd'] = phdObj;

        Meteor.call('insertCandidateEduHistory', obj, function(err, res) {
            hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Candidate employement history saved successfully.');
                setTimeout(function(){
                  $('.datepicker').datepicker({
                      autoclose: true,
                      todayHighlight: true
                  }).on('changeDate',function () {
                    $(this).parsley().validate();
                    });
                }, 1000);
            }
        });

      },


});

Template.EduHistory.onRendered(function() {
  $('#eduHitoryForm').parsley({
      trigger: 'blur'
  });
  setTimeout(function(){
    $('.datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    }).on('changeDate',function () {
      $(this).parsley().validate();
      });
  }, 1000);


});
Template.EduHistory.helpers({
  isCandidate:function(){
    if(Meteor.user())
    {
      if(Meteor.user().profile.role == "candidate" && !this.approvalData)
      {
        return true;
      }
      else if(Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.educationHistory)
      {
        return true;
      }
      else if (Meteor.user().profile.role == "candidate" && this.approvalData && this.approvalData.educationHistory && this.approvalData.educationHistory.approvalDocData.employerApproval == false && this.approvalData.educationHistory.approvalDocData.attorneyApproval == false) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

});

//
// Template.EduHistory.helpers({
//   isCandidate:function(){
//     if(Meteor.user().profile.role == "candidate" && !this.approvalData)
//     {
//       return true;
//     }
//     else if(Meteor.user().profile.role == "candidate" && this.approvalData && !this.approvalData.employmentHistory)
//     {
//       return true;
//     }
//     else {
//       return false;
//     }
//   }
//
// });
