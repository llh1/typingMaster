Template.main.rendered = function() {
  $("#logo").show("slide", 300);

  setTimeout(function() {
    $("#add-text a").show("fade", 1000).css("display", "block");
  }, 100);
  
  $("#practice a").show("fade", 1000).css("display", "block");

  setTimeout(function() {
    $("#join-a-game a").show("fade", 1000).css("display", "block");
  }, 300);
};
