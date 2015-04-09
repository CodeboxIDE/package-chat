var moment = require("moment");
var templateMessage = require("./templates/message.html");

var View = codebox.require("hr.view");
var ListView = codebox.require("hr.list");
var $ = codebox.require("jquery");
var users = codebox.require("core/users");

var Message = ListView.Item.inherit(View.Template).extend({
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
            color: user? user.get("color") : null,
            date: moment(this.model.get("date")).fromNow()
        };
    }
});

var Messages = ListView.extend({
    className: "messages",
    Item: Message
});

module.exports = Messages;
