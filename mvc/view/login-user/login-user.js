var login_view = {
            el: '.page',
            template:null,
            templatePath: 'templates/login-user.hbs',
           initialize: function(){
            //this.compile();
           },
           render: function(){   
               console.log('login render fn');
               console.log(this.$el);
               var callback = _.bind(this.$el.html, this.$el);
               app.renderTemplate(this.templatePath, callback);
           },
           events: {
               'submit .login-user-form': 'loginUser',
           },
           loginUser: function(ev){
               var loginDetails = $(ev.currentTarget).serializeObject();
               app.login(loginDetails, {
                   success: function(response){
                       if(response == 'Invalid user credentials'){
                           app.trigger_error('Invalid user credentials');
                           return false;
                       }
                       app.token = response;
                       router.navigate('#/list', {trigger:true});
                   }
               });
               return false;
           },
        }
        
        LoginView = Backbone.View.extend({login_view});
        app.LoginView = app.LoginView || new LoginView();
        
        