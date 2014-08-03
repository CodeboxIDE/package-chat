define([
    "text!src/templates/message.html"
], function(templateMessage) {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");

    var Message = hr.List.Item.extend({
        className: "message",
        template: templateMessage,

        initialize: function(options) {
            Message.__super__.initialize.apply(this, arguments);

            setInterval(this.update.bind(this), 30000);
        },

        templateContext: function() {
            return {
                model: this.model
            };
        }
    });

    var Messages = hr.List.extend({
        className: "messages",
        Item: Message
    });

    return Messages;
});