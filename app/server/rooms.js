Meteor.methods({
  createRoom: function(roomName, roomSlug) {
    if(!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var roomId = Rooms.insert({
      name: roomName,
      slug: roomSlug
    });
  },
  cleanRooms: function() {
    var rooms = Rooms.find({}).fetch();   
    var roomIdsToClean = [];
    rooms.forEach(function(room) {
      var userCount = Meteor.users.find({
        field: {
          currentRoom: room._id
        }
      }).count();
      if(userCount === 0) {
        roomIdsToClean.push(room._id);
      }
    }); 
    Rooms.remove({_id: {$in: roomIdsToClean}});
  }
});

Meteor.publish("rooms", function() {
  return Rooms.find({});
});

Meteor.publish("cleanRooms", function() {
  Meteor.call("cleanRooms", function() {
    this.ready();
  }.bind(this));
});
