define([
    "src/messages",
    "src/settings",
    "text!src/templates/panel.html"
], function(Messages, settings, templatePanel) {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");
    var rpc = codebox.require("core/rpc");
    var events = codebox.require("core/events");

    var Panel = hr.View.extend({
        template: templatePanel,
        className: "component-panel-chat",
        events: {
            "keydown .post-message textarea": "onInputKeydown"
        },

        initialize: function(options) {
            Panel.__super__.initialize.apply(this, arguments);

            this.animation = null;
            this.messages = new Messages({}, this);

            // On new messages
            this.listenTo(events, "e:chat:message", function(msg) {
                this.messages.collection.push(msg);
            });

            // Handle scrolling correctly
            this.listenTo(this.messages, "add", function() {
                if (this.animation != null) {
                    this.animation.stop();
                }

                this.animation = this.$(".inner").animate({
                    scrollTop: this.$(".inner")[0].scrollHeight
                }, 60);
            });

            // Load messages
            this.loadMessages();
        },

        render: function() {
            this.messages.detach();

            return Panel.__super__.render.apply(this, arguments);
        },

        finish: function() {
            this.messages.appendTo(this.$(".inner"));

            return Panel.__super__.finish.apply(this, arguments);
        },

        // Load all previous message
        loadMessages: function() {
            var that = this;

            return rpc.execute("chat/messages")
            .then(function(messages) {
                that.messages.collection.reset(messages);
            });
        },

        // Keydown on textarea
        onInputKeydown: function(e) {
            var key = e.keyCode || e.which;
            var $input = $(e.currentTarget);
            var val = $input.val();

            if (key === 13 && val.length > 0) {
                e.preventDefault();

                rpc.execute("chat/post", {
                    "message": val
                }).then(function() {
                    $input.val("");
                });
            }
        }
    });

    return Panel;
});