define([
    "text!src/templates/message.html"
], function(templateMessage) {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");
    var users = codebox.require("core/users");

    var Message = hr.List.Item.extend({
        className: "message",
        template: templateMessage,

        initialize: function(options) {
            Message.__super__.initialize.apply(this, arguments);

            setInterval(this.update.bind(this), 30000);
        },

        templateContext: function() {
            var user = users.get(this.model.get("from.id"));
            return {
                model: this.model,
                color: user? user.get("color") : null
            };
        }
    });

    var Messages = hr.List.extend({
        className: "messages",
        Item: Message
    });

    return Messages;
});