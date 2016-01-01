var app = app || {};

_.extend(app, {
        
        init: function(opts){
            _app = _app || _.extend(this, new App(opts));
            console.log('app init');
            return _app;
            
        },
        
        start: function(){
            
            Backbone.history.start();
            //_app.routing.start();
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
                        app.token = response.token;
                        self.setCookie('Token', response.token, 1);
                        self.setCookie('LoggedInUser', response.user_name, 1);
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
        compileHbsTemplate: function(url, callback, view){
            $.ajax({
                url: url,
                success: function(html){
                    return view.template = callback(html);
                }
            });
        },
        renderTemplate:function(url, callback){
            console.log(url);
            $.ajax({
                url: url,
                success: function(html){
                    return callback(html);
                }
            });
        },
        augment: function(name, obj) {
            this[name] = obj;
//            _modules[name] = obj;

//            if (init && obj.init && _.isFunction(obj.init)) {
//                obj.init.call(_app);
//            } 
        },
        loadScripts: function(view_name, callback){
            console.log(view_list);
           // _.each(this.view_list, function(view_name){
                $.getScript("mvc/view/"+view_name+"/"+view_name+".js", function(){
                    console.log('scipt loaded');
                    callback();
                });
                
                
            //});
            
            console.log('loadViewScript');
        },
        createView: function(view_name){
            return view_name;
        }
    });