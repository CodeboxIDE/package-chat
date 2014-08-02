define([
    "src/panel",
    "less!src/stylesheets/main.less"
], function(Panel) {
    codebox.panels.add(Panel, {}, {
        title: "Chat",
        icon: "comment"
    });
});