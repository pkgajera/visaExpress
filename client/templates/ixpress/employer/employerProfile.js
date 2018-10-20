Template.employerProfile.events({
    "submit #employerProfile": function (event) {
        showLoadingMask();
        event.preventDefault();
        debugger;

        var obj = {
            title: event.target.title.value,
            firstName: event.target.firstName.value,
            middleName: event.target.middleName.value,
            lastName: event.target.lastName.value,
            companyName: event.target.companyName.value,
            petitioner: event.target.petitioner.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            from: event.target.from.value,
            to: event.target.to.value,
            businessType: event.target.businessType.value,
            year: event.target.year.value,
            numberofEmp: event.target.numberofEmp.value,
            grossIncome: event.target.grossIncome.value,
            netIncome: event.target.netIncome.value,
            inCareOfName: event.target.inCareOfName.value,
            number: event.target.number.value,
            FEI_Number: event.target.FEI_Number.value,
            LCA_ETA_Case_Number: event.target.LCA_ETA_Case_Number.value,
            province: event.target.province.value,
            street: event.target.street.value,
            DayTime_Number: event.target.DayTime_Number.value,
            city: event.target.city.value,
            state: event.target.state.value,
            zipCode: event.target.zipCode.value,
            country: event.target.country.value,
            titleOfCompanyRepresentative: event.target.titleOfCompanyRepresentative.value,
            numberofH1BEmp: event.target.numberofH1BEmp.value,
            natureOfEmpbusi: event.target.natureOfEmpbusi.value,
            isTRPFunding: event.target.isTRPFunding.value,
            permonceReviewProcess: event.target.permonceReviewProcess.value,
            county: event.target.county.value,
            countyOfEmployer: event.target.countyOfEmployer.value,
            personelAddressStreet: event.target.personelAddressStreet.value,
            personelAddressCity: event.target.personelAddressCity.value,
            personelAddressState: event.target.personelAddressState.value,
            personelAddressZipCode: event.target.personelAddressZipCode.value,
            personelAddressCounty: event.target.personelAddressCounty.value,
            isSameAddress: event.target.isSameAddress.checked


        };

        Meteor.call('insertEmployerProfile', obj, function (err, res) {
            hideLoadingMask();
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess('Employer Profile saved successfully.');
                setTimeout(function () {
                    $('.datepicker').datepicker({
                        autoclose: true,
                        todayHighlight: true
                    });
                }, 1000);
            }
        });

    },
    'change #isSameAddress': function (e, t) {
        e.preventDefault();
        debugger;
        if ($(e.currentTarget).is(':checked')) {
            $('#personelAddressStreet').val($('#street').val());
            $('#personelAddressCity').val($('#city').val());
            $('#personelAddressState').val($('#state').val());
            $('#personelAddressZipCode').val($('#zipCode').val());
            $('#personelAddressCounty').val($('#county').val());
            $('#personelAddressCountry').val($('#country').val());
        }
        else {
            $('#personelAddressStreet').val('');
            $('#personelAddressCity').val('');
            $('#personelAddressState').val('');
            $('#personelAddressZipCode').val('');
            $('#personelAddressCounty').val('');
            $('#personelAddressCountry').val('');
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

                var docType = $(event.currentTarget).attr('doc-type');
                Meteor.call("uploadEmployerProfileDocs", profilePic, docType, function (err) {
                    if (err) {
                        hideLoadingMask();
                        FlashMessages.sendError(err.reason);
                    } else {
                        checkisFileUploadSuccessfully(profilePic);
                    }
                });
            });

        });
    },
});
Template.employerProfile.onRendered(function () {
    $('#employerProfile').parsley({
        trigger: 'blur'
    });
    setTimeout(function () {
        $('.datepicker').datepicker({
            autoclose: true,
            todayHighlight: true
        });
    }, 1000);
var self = this;
  Tracker.autorun(function (obj) {
    var commonDocUploadDAta = employerProfileDoc.find({}).fetch();
    if (!obj.firstRun) {
        if(Router.current().params._id)
        {
      self.subscribe("employerProfileData", Router.current().params._id, Random.id())
        }
        else
        {
      self.subscribe("employerProfileData", Meteor.userId(), Random.id())
        }
    }
  });

});

Template.employerProfile.helpers({
    isEmployer: function () {
        if (Meteor.user()) {
            if (Meteor.user().profile.role == "employer") {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    theFilesForEmployerProfileDocList: function () {
         var employerId = Router.current().params._id;
        if (employerId == null && Meteor.user() && Meteor.user().profile.role == "employer") {
            employerId = Meteor.userId()
        }
        var docData = employerProfileDoc.findOne({
            employerId: employerId
        });
        var formateedArray = [];
        debugger;
        employerProfileDocList.forEach(function (d, i) {
            var jsonFormat = {};
            jsonFormat['key'] = d.key;
            jsonFormat['value'] = d.value;
            jsonFormat["employerDoc"] = (docData && docData[d.key]) ? Uploads.findOne({ _id: docData[d.key] }) : false;
            jsonFormat["employerDocId"] = (docData && docData[d.key]) ? docData[d.key] : '';

            formateedArray.push(jsonFormat);
        });
        return formateedArray;


    },
});
