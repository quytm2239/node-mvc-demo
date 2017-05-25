var register_api_route = '/api/register';

$(document).ready(function(){

    var email = $('#email');
    var username = $('#username');
    var password = $('#password');
    var repeat_password = $('#repeat_password');
    var full_name = $('#full_name');
    var error = $('#error');

    $("#submit").click(function(){
        // register($('form').serialize());
        console.log($('form').serialize());
        if (validate()) {
            register($('form').serialize());
        }
    });

    function validate(){
        // start check
        if (isBlank(email.val()) || validateEmail(email.val()) == false) {
            console.log('Email is blank or NOT valid!');
            showErrorMess(true,'Email is blank or NOT valid!');
            return false;
        }

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

        if (password.val() != repeat_password.val()) {
            console.log('Repeat password does NOT match!');
            showErrorMess(true,'Repeat password does NOT match!');
            return false;
        }

        if (isBlank(full_name.val())) {
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

    function validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }


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
            if (xmlHttp.readyState == 4)
            {
                if (xmlHttp.status == 200) {
                    error.html("<b>Register successfully!<a href=" + "/" + "login" +"> Login now? </a></b>");
                    error.height(50);
                    error.css({"line-height":"50px","color":"#00FF00"});
                    error.css({"border-width":"1px","border-color":"#00FF00"});
                } else {
                    error.text('Something went wrong please try again!');
                    error.height(50);
                    error.css({"line-height":"50px","color":"#FF0000"});
                    error.css({"border-width":"1px","border-color":"#FF0000"});
                }
            }
        }
        xmlHttp.open(method, theUrl, true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(data);
    }
});
