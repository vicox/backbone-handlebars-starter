define(['backbone', 'app/templates'], function(Backbone, templates) {

    return Backbone.View.extend({
        el: '#main',

        render: function (options) {
            this.$el.html(templates['home']({ message: 'Hello' }));
        }
    });

});