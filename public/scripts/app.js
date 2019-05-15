/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /*
 takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
The tweet data object that the function will take will have all the necessary tweet data:
 */

$(document).ready(function() {
  function createTweetElement (fromData) {
    
    // Create Tweet body (article)
    const $tweet = $("<article>");
    $tweet.empty(); 
    $tweet.addClass("tweet");

    // Inside the article, the header, add the classes
    const $header = $("<header>").addClass("header");
    $header.addClass("header-float");

    // Twitter avatar image - set the source and add classes
    const $avatar = $("<img>");
    $avatar.addClass("avatar")
    $avatar.attr('src', fromData.user.avatars.small);

    
    const $largeImageLink = $("<a>").attr('href', fromData.user.avatars.large);
    $avatar.wrap($largeImageLink);
      
    // display name
    const $displayName = $("<h2>", {text: `${fromData.user.name}`});
    $displayName.addClass("display-name");
    $displayName.addClass("tweet-name-hover");

    // twitter handle
    const $twitterHandleAside = $("<aside>", {text: `${fromData.user.handle}`}).addClass("twitter-handle");
    $twitterHandleAside.addClass("twitter-handle-hover");
    
    // Append the above elements to the header
    $header.append($avatar, $displayName, $twitterHandleAside);
    // Get tweet text content
    const $bodyText = $("<p>", {text: `${fromData.content.text}`}).addClass("tweet-text");
    
    // Footer
    const $tweetFooter = $("<footer>").addClass("footer");

    // Date-time
    const $dateTimeAgo = $("<a>", {text: `${fromData.created_at}`}).addClass("tweet-date");

    // Create a div w/ heart, retweet and flag icons and append to the footer
    const $iconsDiv = $("<div>").addClass("flags").addClass("hover-float");
    const $heartIcon = $("<i>").addClass("fas").addClass("fa-heart");
    const $retweetIcon = $("<i>").addClass("fas").addClass("fa-retweet");
    const $flagIcon = $("<i>").addClass("fas").addClass("fa-flag");

    $iconsDiv.append($heartIcon, $retweetIcon, $flagIcon);
    $tweetFooter.append($dateTimeAgo, $iconsDiv);

    // Append all components to the article then return it
    $tweet.append($header, $bodyText, $tweetFooter);

    return $tweet;
  }
  
  const data = [
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
  ];
  function renderTweets(arrObjTweets) {
    /**
     This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
     */

    $("#tweet-container").empty();
    for (let tweetElement of arrObjTweets) {
     
      $individualTweet = createTweetElement(tweetElement);
     
      $("#tweet-container").append($individualTweet);
    }
  }

  renderTweets(data);
});

