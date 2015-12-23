var app = app || {};

app.router = Backbone.Router.extend({
          routes: {
                '': 'login',
                'list': 'listUser',
                'new': 'editUser',
                'logout': 'logout',
                'edit/:id': 'editUser',
            },
        });