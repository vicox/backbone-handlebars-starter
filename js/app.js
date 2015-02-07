require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    },

    shim: {
        "bootstrap": ["jquery"]
    }

});

require(['backbone', 'app/router'], function (Backbone, Router) {
    new Router();
    Backbone.history.start();
});