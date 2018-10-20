//pageSession = new ReactiveDict();
var interval = null;
/******************** Parsley Configuration for Form Validation **************************/

window.ParsleyConfig = {
    errorTemplate: '<span></span>',
    errorsWrapper: '<span></span>',
    errorClass: 'has-error',
    successClass: '',
    trigger: 'blur',
    errorsContainer: function(pEle) {
        var $err = pEle.$element.siblings('.error-text');
        return $err;
    },
    classHandler: function(el) {
        return el.$element.parent();
    }
};

/******************************************************************************************/

this.getBase64 = function(input, imgId) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.onload = function(e) {
            $('#' + imgId).attr("src", e.target.result);
        };
        FR.readAsDataURL(input.files[0]);
    }
}

Handlebars.registerHelper('menuAccess', function(routeName) {
    if (!routeGranted(routeName)) {
        return false;
    }
    return true;
});

Handlebars.registerHelper('radioIsSelected', function(val) {
    if (val)
        return 'checked';
    else
        return '';
});

Handlebars.registerHelper("optionIsSelected", function(desiredValue, itemValue) {
    return desiredValue == itemValue ? "selected" : "";
});

Handlebars.registerHelper('getPasswordLength', function(lengthType) {
    if (lengthType == "min") {
        return 6;
    } else {
        return 100;
    }
});

// load form validation message
Handlebars.registerHelper('loadFormValidationMessage', function() {
    Meteor.defer(function() {
        for (var i = 0; i < validationJSON.length; i++) {
            var items = $(validationJSON[i].selector);
            for (var j = 0; j < validationJSON[i].attributes.length; j++) {
                items.attr(validationJSON[i].attributes[j].name, validationJSON[i].attributes[j].value);
            }
        }
    });
    return "";
});

// get logged in user role
Handlebars.registerHelper('getUserRoles', function(routeName) {
    return userRoles;
});

// format date
Template.registerHelper('formatDate', function(date, dateFormat) {
  debugger;
    return moment(date).format(dateFormat);
});

//get time from date
Template.registerHelper('getTime', function(datetime, timeFormat) {
    return moment(datetime).format(timeFormat);
});

// check is user logged in
Template.registerHelper('isLogin', function() {
    if (Meteor.userId())
        return true;
    else
        return false;
});

// get current User
Template.registerHelper('currentUser', function() {
    if (Meteor.userId())
        return Meteor.user();
    else
        return '';
});
Template.registerHelper('currentUserRole', function(role) {
  var curentUser = Meteor.user();
  if(curentUser)
  {
    if (curentUser.profile.role == role)
        return true;
    else
        return false;
  }
  else {
    return false;
  }

});

this.readCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
this.showLoadingMask = () => {
    $(".splash").css("display", "block");
}

this.hideLoadingMask = () => {
    $(".splash").css("display", "none");
}
this.checkisFileUploadSuccessfully = (id) => {
  interval = setInterval(function(){
    var uploadData = Uploads.findOne({_id:id});
    debugger;
    if(uploadData && uploadData.uploadedAt)
    {
      FlashMessages.sendSuccess('Document uploaded successfully..');
      hideLoadingMask();
      clearInterval(interval);
    }
  },1000);
}

this.getValues = function(formObject, submitCallback) {
    var values = {};
    formObject.find("input,select,textarea").each(function() {
        var inputObject = $(this);
        var fieldName = inputObject.attr("name");
        var fieldValue = inputObject.val();
        if (inputObject.attr("type") == "checkbox") {
            // auto set data type for checkbox
            if (!inputObject.attr("data-type")) {
                // single checkbox with that name means dataType="BOOL" else it is "ARRAY"
                if (formObject.find("input[name='" + fieldName + "']").length == 1) {
                    dataType = "BOOL";
                } else {
                    dataType = "ARRAY";
                }
            }

            if (dataType == "BOOL") fieldValue = inputObject.is(":checked");
            if (dataType == "ARRAY") fieldValue = inputObject.is(":checked") ? fieldValue : "";
        }
        /*if(inputObject.is("select")){
          if(typeof inputObject.val() != "undefined" && inputObject.val() != ""){
            fieldValue = JSON.parse($(this).find("option[value="+inputObject.val()+"]").attr("data"));
            console.log(fieldValue);
          }
        }*/
        values[fieldName] = fieldValue;
    });
    if (submitCallback)
        submitCallback(values);
};