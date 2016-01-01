_.extend(app,{
    Users : Backbone.Collection.extend({
            url:'/users'
        })
    },
    
{
    User : Backbone.Model.extend({
            urlRoot:'/users'
        })
        
});