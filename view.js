var app = app || {};
_.extend(app, {
       UserListView: Backbone.View.extend({
           el: '.page',
           template:null,
           models: null,
           initialize: function(){
            this.compile();
            this.models = new app.Users();
           },
           render: function(){
               console.log('user list view');
               var self = this;
               this.models.fetch({
                   success: function(response){
                       self.$el.html(self.template(response));
                   },
                    //headers: {'Token' :app.token}
               });
           },
           compile: function(){
                var source   = $("#user-list-template").html();
                this.template = Handlebars.compile(source);
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
            model: null,
           initialize: function(){
            this.compile();
            this.model = new app.User();
           },
           compile: function(){
                var source   = $("#edit-user-template").html();
                this.template = Handlebars.compile(source);
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
           initialize: function(){
            //this.compile();
           },
           render: function(){
               this.$el.html($("#login-user-template").html());
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