$.ajaxPrefilter(function( options ) {
    //console.log(options.url);
    //console.log(options.url.indexOf('.hbs'));
    if(options.url.indexOf('.hbs') > -1 || options.url.indexOf('.js') > -1){
                    //options.url = "http://localhost/BackboneTutorial/rest/v2" +options.url;
                }else{
                    options.url = "http://localhost/BackboneTutorial/rest/v2" +options.url;
                }
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
return o;
};

if(app.getCookie('Token')){
    Backbone.$.ajaxSetup({
            headers: {'Token' :app.getCookie('Token')}
    });
}