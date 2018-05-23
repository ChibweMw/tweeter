/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]


function renderTweets (tweetData) {
  tweetData.forEach(function (tweet) {
    return $("#feed").append(createTweetElement(tweet));
  });

}

function createTweetElement(userData) {
  var placeHolderStr = "I made a cool app because people can be lazy. Sometimes, they ask me to do their work for them. That's when I decided to automate things."

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
  //footer children
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


$(function () {
  // $("#feed").append(createTweetElement(tweetData));
  renderTweets(tweetData);
});