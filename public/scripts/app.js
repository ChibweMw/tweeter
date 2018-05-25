/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(function () {

  var likes = 0;

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
    var $userHandle = $("<span>").text(userData.user.handle).addClass("user-handle");
    var $userName = $("<h2>").text(userData.user.name).addClass("user-name");
    //append children to header
    $tweetHeader.append($userAvatar);
    $tweetHeader.append($userHandle);
    $tweetHeader.append($userName);

    //tweet `body` elements, has no children
    var $tweetBody = $("<div>").text(userData.content.text).addClass("content");

    //tweet footer elements
    var $tweetFooter = $("<footer>");
    //footer children
    var $timeStamp = $("<span>").text(moment(userData.created_at).fromNow()).addClass("time-stamp");
    //userData.likes data-tweet-likes=" blablaablbaa"
<<<<<<< HEAD
    var $likes = $("<span class='mini-icon'><i class='fas fa-heart'></i></span>");
=======
    var $likes = $("<span class='mini-icon'><i class='fas fa-heart' data-btn-name='likes'></i></span>");
>>>>>>> feature/likes
    var $retweet = $("<span class='mini-icon'><i class='fas fa-retweet'></i></span>");
    var $flag = $("<span class='mini-icon'><i class='fas fa-flag'></i></span>");
    //append children to footer
    $tweetFooter.append($timeStamp);
    $tweetFooter.append($likes);
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
        //render tweets based on data (availableTweets) fetched from server
        renderTweets(availableTweets);
      }
    });
  }

  loadTweets();

  //Like button
  $("#feed").on("click", 'i', function(event) {
    if($(event.target).data('btn-name') === "likes"){
      $(event.target).toggleClass('red');
      if($(event.target).text() === '') {
        $(event.target).text('1');
      } else {
        $(event.target).text('');
      }
    }
  });

  var $textarea = $("textarea[name='text']");

  //toggle tweet composer
  $("#tweetButton").on("click", function() {
    $(".tweetie").slideToggle("fast", function() {
      $textarea.focus();
    });
  });

<<<<<<< HEAD
  //Like button
  $("#feed").on("click", function(event) {
    console.log('Clicke on:', event.target.closest('i'));
  });
=======
>>>>>>> feature/likes

  //New tweets submitted here
  $("form").on("submit", function (event) {
    event.preventDefault();

    var tweetText = $(this).serialize();
    var $message = $textarea.val();

    if(!$message) {
      //when the composer textarea is empty
      alert('Please type something to tweet.');

    } else if($message.length > 140) {
      //when the character limit is exceeded
      alert('Please shorten your tweet.');

    } else {

      $.ajax('/tweets', {
        method : 'POST',
        data : tweetText
      }).done(function (newTweet) {
        //make it so new tweets show up at the top
        $("#feed").prepend(createTweetElement(newTweet));
        //empty text are
        $textarea.val('');
        //reset counter to max character count
        $(".counter").text('140');
      });

    }
  });
});