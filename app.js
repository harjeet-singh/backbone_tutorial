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
        
        $.ajax({
            url: '/login',
            method:'POST',
            data: {username:loginDetails.user_name, password:loginDetails.password},
            //async: false,
            success: function(response){
                    app.token = response;
                    Backbone.$.ajaxSetup({
                            headers: {'Token' :app.token}
                    });
                    callback.success(response);
            },
        })
    },
    
    trigger_error : function(message){
        console && console.error(message);
    }
})