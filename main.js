/* jshint ignore:start */

$('.profilePic').append('<img src="' + user.avatar_url + '">');
$('#name').text(user.name);
$('#login').append(user.login);
$('.location').append(user.location);



$(".tabs").on("click", function(event) {
  event.preventDefault();
  $(".tabs").removeClass("active");
  $(this).addClass("active");
  var selector = "." + $(this).attr("rel");
  $(selector).siblings().removeClass("show");
  $(selector).addClass("show");
});


var repoEach = "";
_.each(repos, function(item) {
  repoEach += "<li class= 'repoItems'>"
  + "<a href = " + item.html_url + ">" + item.name + "</a>"
  + "<div class = 'timeUpdated'>"
  + moment.utc(item.updated_at).fromNow()
  + "</div>"
  + "</li>";

});

$(".repoList").append(repoEach);


var newHtml = ""
_.each (events, function (item) {
  if (item.type === "CreateEvent" && item.payload.ref_type ==="branch" ) {
  newHtml += "<li class ='pubItems'>"
  + "<span class='octicon octicon-git-branch dashboard-event-icon'></span>"
  + item.actor.login
  + " created branch "
  + item.payload.ref
  + " at "
  + item.repo.name
  + " "
  + moment.utc(item.created_at).fromNow()
  + "</li>"
}
  else if (item.type === "CreateEvent" && item.payload.ref_type === "repository") {
  newHtml += "<li class ='pubItems'>"
  + "<span class='octicon octicon-repo dashboard-event-icon'></span>"
  + item.actor.login
  + " created repository "
  + item.repo.name
  + " "
  + moment.utc(item.created_at).fromNow()
  + "</li>"
  }

  else if (item.type === "PushEvent") {
    newHtml += "<li class ='pubItems'>"
    + "<span class='octicon octicon-git-commit dashboard-event-icon'></span>"
    + "<div class='time'>" + moment.utc(item.created_at).fromNow() + "</div>"
    + "<div class='pushLine'>"
    + item.actor.login
    + " pushed to "
    + item.payload.ref
    + " at "
    + item.repo.name
    + "</div>"
    + "<div class= 'description'>"
    + "<img src= '" + item.actor.avatar_url + "'>'"
    + "<span class='octicon octicon-mark-github'></span>"
    + item.payload.head.slice(-7)
    + " "
    + item.commits[0].message
    + "</li>"
  }

})
console.log(newHtml)
$('.public-activity-sec').append(newHtml)



_.each(item, function (el) {
  el.commit.message
})
