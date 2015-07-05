function generateRoomSlug(roomName) {
  return roomName.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

Template.rooms.events({
  "submit": function(event) {
    var roomName = event.target.roomName.value;
    if(roomName !== "") {
      var roomSlug = generateRoomSlug(roomName);
      Meteor.call("createRoom", roomName, roomSlug);
      event.target.roomName.value = "";
      Router.go("/room/" + roomSlug);
    }
    event.preventDefault();
  }
});

Template.rooms.helpers({
  rooms: function() {
    return Rooms.find({});
  },
  usersOnline: function() {
    return Meteor.users.find({"status.online": true});
  }
});

Template.onlineUser.labelClass = function() {
  if (this.status.idle)
    return "label-warning"
  else if (this.status.online)
    return "label-success"
  else
    return "label-default"
};
