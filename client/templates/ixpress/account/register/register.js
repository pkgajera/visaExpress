Template.register.events({
    "submit .form-signup": function(event){
         event.preventDefault();
         debugger;
         var email = trimInput(event.target.email.value);
        var name = trimInput(event.target.name.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);
        var role = trimInput(event.target.role.value);
        var obj={
            email : email,
            password:password,
            role:role,
            name:name
        };

        event.target.email.value = "";
        event.target.password.value = "";
        event.target.password2.value = "";
        event.target.name.value = "";

          //Meteor.call('insertCandidate',obj);
     /* alert("You are successfully registered"); */
 if( isNotEmpty(password)  && isBusinessEmail(email) && areValidPasswords(password, password2)){

Meteor.call("createNewUser", obj, function(error, result){
  if(error){
           FlashMessages.sendError(error.reason);
           }
       else{
           FlashMessages.sendSuccess('Account Created! Please verify your email account.');
           Router.go('/login');
       }
});

         }
        //prevent Submit
        return false;
}
});


//Validation Rules

// Trim Helper

var trimInput = function(val){
    return val.replace(/^\$*|\$*$/g, "");
}

//Check For Empty Fields
isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    FlashMessages.sendError("Please fill in all fields");
    return false;
};

//Validate Email
isBusinessEmail = function(value){
    var emailfilter = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    var filter = /^([\w-.]+@(?!gmail\.)(?!yahoo\.)(?!hotmail\.)(?!ymail\.)(?!hotmail\.)([\w-]+.)+[\w-]{2,4})?$/;
    if(!emailfilter.test(value))
    {
    FlashMessages.sendError('Please enter valid Email address.');
    return false;
    }
    if (filter.test(value)){
        return true;
    }
    FlashMessages.sendError('Please enter your business email, we do not accept Gmail, Yahoo, Hotmail, etc.');
    return false;
};

//Check password Field

isValidPassword = function(password){
    if (password.length<6){
        FlashMessages.sendError("Password must be atleast 6 charachters");
        return false;
    }
    return true;
};

// Match password

areValidPasswords = function(password, confirm){
    if (!isValidPassword(password)){
        return false;
    }
    if (password !== confirm){
        FlashMessages.sendError("Passwords do not match");
        return false;
    }
    return true;

};
