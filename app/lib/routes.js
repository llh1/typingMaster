Router.configure({
  layoutTemplate: "main"
});

Router.route("/", function() {
  this.render("play");
});

Router.route("/addDocument", function() {
  this.render("addDocument");
});

Router.route("/rooms", function() {
  this.render("rooms");
});

Router.route("/room/:slug", {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      this.render("rooms", {data: {
        error: "You need to create an account to be able to join a room."
      }});
    } else {
      this.next();
    }
  },
  waitOn: function() {
    return Meteor.subscribe("joinRoom", this.params.slug);
  },
  data: function() {
    return {room: Rooms.findOne({slug: this.params.slug})};
  },
  action: function() {
    this.render("room");
  }
});
