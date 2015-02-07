define(['backbone'], function(Backbone) {

    return Backbone.Router.extend({
        routes: {
            "": "home"
        },

        home: function() {
            require(["app/views/home"], function (HomeView) {
                new HomeView().render();
            });
        }
    });

});