module.exports = function(codebox) {
    var events = codebox.events;
    var workspaceRoot = codebox.workspace.root();

    codebox.logger.log("start chat services");

    // Stack of messages
    var LIMIT = 50;
    var messages = [];


    codebox.rpc.service("chat", {
        post: function(args, meta) {
            if (!args.message) throw "Need 'message' to post";

            var message = {
                'content': args.message,
                'date': Date.now(),
                'from': {
                    'name': meta.user.name,
                    'userId': meta.user.id
                }
            };

            messages.push(message);
            messages = messages.slice(-LIMIT);

            events.emit("chat:message", message);
            return message;
        },

        messages: function() {
            return messages;
        }
    });
};
