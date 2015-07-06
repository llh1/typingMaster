Router.configure({
  layoutTemplate: "main"
});

Router.onBeforeAction(function() {
  if(Meteor.userId()) {
    Meteor.call("leaveRoom", Meteor.userId());
  }
  this.next(); 
}, {except: ["room"]});

Router.route("/", {
  data: function() {
    var doc = Documents.find({random: {$near: [Math.random(), 0]}}, {limit: 1}).fetch()[0];
    if(doc) {
      Session.set("document", doc.text);
      Session.set("typedDocument", "");
    }
    return {document: doc};
  },
  action: function() {
    this.render("play");
  }
});

Router.route("/addDocument", function() {
  this.render("addDocument");
});

Router.route("/rooms", {
  waitOn: function() {
    return Meteor.subscribe("cleanRooms");
  },
  action: function() {
    this.render("rooms");
  }
});

Router.route("/room/:slug", {
  name: "room",
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
