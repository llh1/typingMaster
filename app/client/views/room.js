function getRoomUsers(roomId) {
  return Meteor.users.find({
    field: {
      currentRoom: roomId
    }
  });
}

Template.room.helpers({
  roomUsers: function() {
    return getRoomUsers(this.room._id);
  },
  roomUsersCount: function() {
    return getRoomUsers(this.room._id).count();
  }
});

Template.room.events({
  "click #start-button": function(event) {
    console.log("start");
  }
});
