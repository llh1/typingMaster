Template.play.helpers({
  correctlyTypedDocument: function() {
    return Session.get("typedDocument");
    
  },
  remainingDocument: function() {
    var correctlyTypedCount = Session.get("typedDocument").length;
    var doc = Session.get("document");
    return doc.substr(correctlyTypedCount); 
  }
});

Template.typeBox.helpers({
  typedDocument: function() {
    return Session.get("typedDocument");
  }
});

Template.typeBox.events({
  "keyup input": function(event) {
    var value = event.target.value;
    if(value.indexOf(" ", value.length - 1) !== -1) {
      var doc = Session.get("document");
      var alreadyTyped = Session.get("typedDocument");
      alreadyTyped += value;

      var regex = new RegExp('^' + alreadyTyped + '.+$');
      if(regex.test(doc)) {
        Session.set("typedDocument", alreadyTyped);
        document.getElementById("type-box").value = "";
      }
    }
  }
});

Template.typeBox.rendered = function() {
  this.$("input").focus();
}
