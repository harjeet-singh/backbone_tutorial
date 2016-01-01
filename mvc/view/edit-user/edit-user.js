({
            el: '.page',
            template:null,
            templatePath:'templates/edit-user.hbs',
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