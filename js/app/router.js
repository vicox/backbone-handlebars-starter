define(['backbone', 'app/views/home'], function(Backbone, HomeView) {

    return Backbone.Router.extend({
        routes: {
            "": "home"
        },

        home: function() {
            new HomeView().render();
        }
    });

});