({
           el: '.page',
           template:null,
           templatePath: 'templates/list-user.hbs',
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
})