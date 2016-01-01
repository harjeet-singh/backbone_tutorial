_.extend(app, {
       UserListView: Backbone.View.extend({
           el: '.page',
           template:null,
           templatePath: 'mvc/view/list-user/list-user.hbs',
           models: null,
           initialize: function(){
            app.compileHbsTemplate(this.templatePath, Handlebars.compile, this);
            this.models = new app.Users();
           },
           render: function(){
               var self = this;
               this.models.fetch({
                   success: function(response){
                       self.$el.html(self.template(response));
                   },
                    //headers: {'Token' :app.token}
               });
           },
           deleteUser: function(options){
               var model = this.models.get(options.id);
               model.destroy({
                   success: function(model, response){
                       router.navigate('#/list', {trigger:true});
                   }
               });
           },
        })},
        
        {
         EditUserView : Backbone.View.extend({
            el: '.page',
            template:null,
            templatePath:'mvc/view/edit-user/edit-user.hbs',
            model: null,
           initialize: function(){
            app.compileHbsTemplate(this.templatePath, Handlebars.compile, this);
            this.model = new app.User();
           },
           render: function(options){
               var self = this;
               if(options.id){
                   this.model.set('id',options.id);
                   this.model.fetch({
                       success: function(user){
                           self.$el.html(self.template({user:user}));
                       }
                   })
               }else{
                   this.model = new app.User();
                   self.$el.html(self.template({user:null}));
               }
               
           },
           events: {
               'submit .edit-user-form': 'saveUser',
               'click #cancel-btn': 'handleCancel',
           },
           saveUser: function(ev){
               var userDetails = $(ev.currentTarget).serializeObject();
               this.model.save(userDetails, {
                   success: function(response){
                       router.navigate('#/list', {trigger:true});
                   }
               })
               return false;
           },
           handleCancel: function(){
               router.navigate('#/list',{trigger:true});
               return false;
           }

        })
    },
        
    {  
        LoginUserView : Backbone.View.extend({
            el: '.page',
            template:null,
            templatePath: 'mvc/view/login-user/login-user.hbs',
           initialize: function(){
            //this.compile();
           },
           render: function(){               
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
        })
    }
);