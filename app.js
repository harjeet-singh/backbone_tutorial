var app = app || {};

_.extend(app,{
    start: function(){
        Backbone.history.start();
    },
    logout: function(){
           $.ajax({
                    url: '/logout',
                    method:'POST',
                    data: {},
                    async: false,
                    success: function(response){
                            app.token = null;
                            router.navigate('', {trigger:true});
                    }
                })     
        },
    login: function (loginDetails, callback){
        console.log('app login');
        var self = this;
        $.ajax({
            url: '/login',
            method:'POST',
            data: {username:loginDetails.user_name, password:loginDetails.password},
            //async: false,
            success: function(response){
                    app.token = response;
                    self.setCookie('Token', response, 1);
                    Backbone.$.ajaxSetup({
                            headers: {'Token' :self.getCookie('Token')}
                    });
                    callback.success(response);
            },
        })
    },
    
    trigger_error : function(message){
        console && console.error(message);
    },
    
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },

    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },

    checkCookie: function () {
        var user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    },

})