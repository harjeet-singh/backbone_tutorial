var app = app || {};
_.extend(app, {
       UserListView: Backbone.View.extend({
           el: '.page',
           template:null,
           initialize: function(){
            this.compile();
           },
           render: function(){
               console.log('user list view');
               var self = this;
               var users = new app.Users();
              
               users.fetch({
                   success: function(response){
                       self.$el.html(self.template(response));
                   },
                    //headers: {'Token' :app.token}
               });
           },
           compile: function(){
                var source   = $("#user-list-template").html();
                this.template = Handlebars.compile(source);
           }

        })},
        
        {
         EditUserView : Backbone.View.extend({
            el: '.page',
            template:null,
           initialize: function(){
            this.compile();
           },
           compile: function(){
                var source   = $("#edit-user-template").html();
                this.template = Handlebars.compile(source);
           },
           render: function(options){
console.log('edit view');
               console.log(options);
               var self = this;
               if(options.id){
                   var user = new app.User();
                   user.set('id',options.id);
                   user.fetch({
                       success: function(user){
                           console.log(user);
                           self.$el.html(self.template({user:user}));
                       }
                   })
               }else{
                   this.$el.html($("#edit-user-template").html({user:null}));
               }
               
           },
           events: {
               'submit .edit-user-form': 'saveUser',
           },
           saveUser: function(ev){
               var userDetails = $(ev.currentTarget).serializeObject();
               console.log(userDetails);
               var user = new app.User();
                user.on("invalid", function(model, error) {
                alert(model.get("user_name") + " " + error);
              });
              //return false;
               user.save(userDetails, {
                   success: function(response){
                       console.log(response);
                       router.navigate('#/list', {trigger:true});
                   }
               })
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
               console.log(loginDetails);
               
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