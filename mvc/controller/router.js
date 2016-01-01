(function(app) {
    
    var Router = Backbone.Router.extend({
          routes: {
                '': 'login',
                'list': 'listUser',
                'new': 'editUser',
                'logout': 'logout',
                'edit/:id': 'editUser',
                'delete/:id': 'deleteUser',
        },
    });
    
    app.augment('router', new Router());
    
})(app)