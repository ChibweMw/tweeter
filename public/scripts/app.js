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
    var $userAvatar = $("<img src=" + userData.user.avatars.regular + ">").addClass("user-avatar");
    var $userName = $("<h2>" + userData.user.name + "</h2>").addClass("user-name");
    var $userHandle = $("<span>" + userData.user.handle + "</span>").addClass("user-handle");
    //append children to header
    $tweetHeader.append($userAvatar);
    $tweetHeader.append($userName);
    $tweetHeader.append($userHandle);

    //tweet `body` elements
    var $tweetBody = $("<div>" + userData.content.text + "</div>").addClass("content");

    //tweet footer elements
    var $tweetFooter = $("<footer>");
    //footer children /////HOW CAN THIS BE MORE SUCURE?\\\\\\\
    var $timeStamp = $("<span>" + userData.created_at + "</span>").addClass("time-stamp");
    var $heart = $("<span><i class='fas fa-heart'></i></span>").addClass("mini-icon");
    var $retweet = $("<span><i class='fas fa-retweet'></i></span>").addClass("mini-icon");
    var $flag = $("<span><i class='fas fa-flag'></i></span>").addClass("mini-icon");
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

  $("form").on("submit", function (event) {
    event.preventDefault();
    var tweetText = $(this).serialize();

    $.ajax('/tweets', {
      method : 'POST',
      data : tweetText
    }).done(function (newTweet) {
      $("#feed").append(createTweetElement(newTweet));
      $("textarea[name='text']").val('');
    });
  });
});