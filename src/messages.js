define(function() {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");

    var Message = hr.List.Item.extend({
        className: "message",

        render: function() {
            var $author = $("<p>", {
                'class': "message-author",
                'text': this.model.get("from.name")
            }).appendTo(this.$el);
            var $content = $("<p>", {
                'class': "message-content",
                'text': this.model.get("content")
            }).appendTo(this.$el);
            return this.ready();
        }
    });

    var Messages = hr.List.extend({
        className: "messages",
        Item: Message
    });

    return Messages;
});