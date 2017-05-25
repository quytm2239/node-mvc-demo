var register_api_route = '/api/register';

$(document).ready(function(){

    // $("form[name='register']").validate({
    //     // Specify validation rules
    //     rules: {
    //         // The key name on the left side is the name attribute
    //         // of an input field. Validation rules are defined
    //         // on the right side
    //         username: "required",
    //         lastname: "required",
    //         email: {
    //             required: true,
    //             // Specify that email should be validated
    //             // by the built-in "email" rule
    //             email: true
    //         },
    //         password: {
    //             required: true,
    //             minlength: 6
    //         },
    //         repeat_password: {
    //             required: true,
    //             minlength: 6
    //         },
    //         fullname: {
    //             required: true,
    //         }
    //     },
    //     // Specify validation error messages
    //     messages: {
    //         firstname: "Please enter your firstname",
    //         lastname: "Please enter your lastname",
    //         password: {
    //             required: "Please provide a password",
    //             minlength: "Your password must be at least 6 characters long"
    //         },
    //         email: {
    //             required: "Please enter email address",
    //             email: "Email address is NOT valid"
    //         }
    //     },
    //     // Make sure the form is submitted to the destination defined
    //     // in the "action" attribute of the form when valid
    //     submitHandler: function(form) {
    //         form.submit();
    //     }
    // });


    var username = $('#username');
    var password = $('#password');
    var repeat_password = $('#repeat_password');
    var fullname = $('#fullname');
    var error = $('#error');

    $("#submit").click(function(){
        // register($('form').serialize());
        if (validate()) {
            register($('form').serialize());
        }
    });

    function validate(){
        // start check
        if (isBlank(username.val())) {
            console.log('Username is blank!');
            showErrorMess(true,'Username is blank!');
            return false;
        }

        if (isBlank(password.val())) {
            console.log('Password is blank!');
            showErrorMess(true,'Password is blank!');
            return false;
        }

        if (isBlank(repeat_password.val())) {
            console.log('Repeat password is blank!');
            showErrorMess(true,'Repeat password is blank!');
            return false;
        }

        if (isBlank(fullname.val())) {
            console.log('Fullname is blank!');
            showErrorMess(true,'Fullname is blank!');
            return false;
        }

        return true;
    }

    // $('form').submit(function(event){
    //     // cancels the form submission
    //     event.preventDefault();
    //     // do whatever you want here
    //     console.log($('form').serialize());
    // });

    function showErrorMess(show,message) {
        if (show) {
            error.text(message);
            error.height(50);
            error.css({"line-height": "50px"});
            error.css({"border-width":"1px"});
        } else {
            error.text('');
            error.height(0);
            error.css({"border-width":"0px"});
        }
    }
});


function isBlank(str){
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
}

function register(data){
    var registerUrl = document.location.origin + register_api_route;
    httpGetAsync("POST",registerUrl,data,function (responseText) {
        console.log(responseText);
    });
}

function httpGetAsync(method, theUrl, data, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.send(data);
}
