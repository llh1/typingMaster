Meteor.publish("userStatus", function() {
  return Meteor.users.find({"status.online": true});
});

Meteor.publish("joinRoom", function(roomSlug) {
  Meteor.call("joinRoom", roomSlug, this.userId, function() {
    this.ready(); 
  }.bind(this));
});

Meteor.methods({
  joinRoom: function(roomSlug, userId) {
    if(!userId) {
      throw new Meteor.Error("not-authorized");
    }

    var room = Rooms.findOne({slug: roomSlug});
    Meteor.users.update({_id: userId}, {
      $set: {
        field: {
          currentRoom: room._id
        }
      }
    });
  },
  leaveRoom: function(userId) {
    Meteor.users.update({_id: userId}, {
      $set: {
        field: {
          currentRoom: null
        }
      }
    });
  }
});

Meteor.users.find({"status.online": true}).observe({
  removed: function(id) {
    Meteor.call("leaveRoom", id);
  }
});
