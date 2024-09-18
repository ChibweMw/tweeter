$(function () {

  var likes = 0;

  function renderTweets (tweetData) {
    tweetData.forEach(function (tweet) {
      return $("#feed").append(createTweetElement(tweet));
    });
  }

  function createTweetElement(userData) {


    var $tweet = $("<article>").addClass("tweet");


    var $tweetHeader = $("<header>");

    var $userAvatar = $("<img>").attr("src", userData.user.avatars.regular).addClass("user-avatar");
    var $userHandle = $("<span>").text(userData.user.handle).addClass("user-handle");
    var $userName = $("<h2>").text(userData.user.name).addClass("user-name");

    $tweetHeader.append($userAvatar);
    $tweetHeader.append($userHandle);
    $tweetHeader.append($userName);

    var $tweetBody = $("<div>").text(userData.content.text).addClass("content");

    var $tweetFooter = $("<footer>");

    var $timeStamp = $("<span>").text(moment(userData.created_at).fromNow()).addClass("time-stamp");

    var $likes = $("<span class='mini-icon'><i class='fas fa-heart' data-btn-name='likes'></i></span>");
    var $retweet = $("<span class='mini-icon'><i class='fas fa-retweet'></i></span>");
    var $flag = $("<span class='mini-icon'><i class='fas fa-flag'></i></span>");

    $tweetFooter.append($timeStamp);
    $tweetFooter.append($likes);
    $tweetFooter.append($retweet);
    $tweetFooter.append($flag);

    $tweet.append($tweetHeader);
    $tweet.append($tweetBody);
    $tweet.append($tweetFooter);

    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      method : 'GET',
      url : '/tweets',
      dataType: 'json',
      success : function (availableTweets) {
        renderTweets(availableTweets);
      },
      error: function (err){
        console.log(">> 'GET' Request Failed. Error details: ", err);
      }
    });
  }

  loadTweets();

  $("#feed").on("click", 'i', function(event) {
    if($(event.target).data('btn-name') === "likes"){
      $(event.target).toggleClass('red');
      if($(event.target).text() === '') {
        $(event.target).text('1');
        $.ajax('/tweets', {
          method: 'PUT',
          data: $(event.target).data()
        }).done(function (likeToggle) {
          console.log("Like toggle is:", likeToggle);
        })
      } else {
        $(event.target).text('');
      }
    }
  });

  var $textarea = $("textarea[name='text']");

  $("#tweetButton").on("click", function() {
    $(".tweetie").slideToggle("fast", function() {
      $textarea.focus();
    });
  });


  $("form").on("submit", function (event) {
    event.preventDefault();

    var tweetText = $(this).serialize();
    var $message = $textarea.val();

    if(!$message) {
      $("input").css({'color': 'red', 'opacity': 1}).val("please type something");
      setTimeout(function(){
      $("input").css({'color': 'black', 'opacity': 0.5}).val("Tweet");
      }, 3000);
    } else if($message.length > 140) {
      $("input").css({'color': 'red', 'opacity': 1}).val("please shorten your message");
      setTimeout(function(){
      $("input").css({'color': 'black', 'opacity': 0.5}).val("Tweet");
      }, 3000);
    } else {

      $.ajax('/tweets', {
        method : 'POST',
        data : tweetText
      }).done(function (newTweet) {
        $("#feed").prepend(createTweetElement(newTweet));
        $textarea.val('');
        $(".counter").text('140');
      });

    }
  });
});