/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(function () {

  function renderTweets (tweetData) {
    tweetData.forEach(function (tweet) {
      return $("#feed").append(createTweetElement(tweet));
    });

  }

  function createTweetElement(userData) {
    //Main tweet container
    var $tweet = $("<article>").addClass("tweet");

    //tweet header elements
    var $tweetHeader = $("<header>");
    //header children
    var $userAvatar = $("<img>").attr("src", userData.user.avatars.regular).addClass("user-avatar");
    var $userName = $("<h2>").text(userData.user.name).addClass("user-name");
    var $userHandle = $("<span>").text(userData.user.handle).addClass("user-handle");
    //append children to header
    $tweetHeader.append($userAvatar);
    $tweetHeader.append($userName);
    $tweetHeader.append($userHandle);

    //tweet `body` elements
    var $tweetBody = $("<div>").text(userData.content.text).addClass("content");

    //tweet footer elements
    var $tweetFooter = $("<footer>");
    //footer children
    var $timeStamp = $("<span>").text(userData.created_at).addClass("time-stamp");
    var $heart = $("<span class='mini-icon'><i class='fas fa-heart'></i></span>");
    var $retweet = $("<span class='mini-icon'><i class='fas fa-retweet'></i></span>");
    var $flag = $("<span class='mini-icon'><i class='fas fa-flag'></i></span>");
    //append children to footer
    $tweetFooter.append($timeStamp);
    $tweetFooter.append($heart);
    $tweetFooter.append($retweet);
    $tweetFooter.append($flag);

    //add all parent elements to `article` tweet body.
    $tweet.append($tweetHeader);
    $tweet.append($tweetBody);
    $tweet.append($tweetFooter);

    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      url : '/tweets',
      method : 'GET',
      success : function (availableTweets) {
        renderTweets(availableTweets);
      }
    });
  }

  loadTweets();

  //toggle tweet composer
  $("#tweetButton").on("click", function() {
    $(".tweetie").slideToggle("fast", function() {
      $("textarea[name='text']").focus();
    });
  });

  //New tweets submitted here
  $("form").on("submit", function (event) {
    event.preventDefault();

    var tweetText = $(this).serialize();
    var $message = $("textarea[name='text']").val();

    if(!$message) {
      alert('Please type something to tweet.');
    } else if($message.length > 140) {
      alert('Please shorten your tweet.');
    } else {
      $.ajax('/tweets', {
        method : 'POST',
        data : tweetText
      }).done(function (newTweet) {
        $("#feed").prepend(createTweetElement(newTweet));
        $("textarea[name='text']").val('');
        $(".counter").text('140');
      });
    }
  });
});