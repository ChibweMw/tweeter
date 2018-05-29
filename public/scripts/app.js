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
        //AJAX REQUEST HERE
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

  //toggle tweet composer
  $("#tweetButton").on("click", function() {
    $(".tweetie").slideToggle("fast", function() {
      $textarea.focus();
    });
  });


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