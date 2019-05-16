/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Keeps track of where the new-tweet container is (up off screen or at its
// normal position)
let togglePos = 0;

function createTweetElement (fromData) {
   /* takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
  The tweet data object that the function will take will have all the necessary tweet data:
  */
  
  const $tweet = $("<article>");
  $tweet.empty(); 
  $tweet.addClass("tweet");

 
  const $header = $("<header>").addClass("header");
  $header.addClass("header-float");

  const $avatarDiv = $("<div>").addClass("div-avatar");
  const $avatar = $("<img>");
  $avatar.addClass("avatar")
  $avatar.attr('src', fromData.user.avatars.small);

  $avatarDiv.append($avatar);
    
  const $displayName = $("<h2>", {text: `${fromData.user.name}`});
  $displayName.addClass("display-name");
  $displayName.addClass("tweet-name-hover");

  const $twitterHandleAside = $("<aside>", {text: `${fromData.user.handle}`}).addClass("twitter-handle");
  $twitterHandleAside.addClass("twitter-handle-hover");
  
  $header.append($avatarDiv, $displayName, $twitterHandleAside);

  const $bodyText = $("<p>", {text: `${fromData.content.text}`}).addClass("tweet-text");
  const $tweetFooter = $("<footer>").addClass("footer");
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

function renderTweets(arrObjTweets) {
  /**
   This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
   */

  // Make the tweet container visible when tweets are being rendered
  // by removing the CSS class "invisible"
  $("#tweet-container").removeClass("invisible");
  $("#tweet-container").empty();
  for (let tweetElement of arrObjTweets) {
    $individualTweet = createTweetElement(tweetElement);
    $("#tweet-container").prepend($individualTweet);
  }
}

function loadTweets() {
  /**
   * This function is responsible 
   * for fetching tweets from the http://localhost:8080/tweets page.
   */
  $.ajax('/tweets', {method:'GET'})
  .then(function (tweetData) {
    renderTweets(tweetData);
  });
}

$(document).ready(function() {
  /* Form is ready to be loaded - immediately show tweets from the db*/
  loadTweets();

  // Event handler to respond when the avatar is clicked
  $(".div-avatar").on('click', function (e) {
    console.log("avatar is clicked");
  });

});

$(function() {
  /* Create event handlers that handle the compose button click, 
  which toggles the compose-tweet section sliding off/sliding down*/
  
  // When the page loads, ensure that the compose tweet section is hidden
  $(".new-tweet").css('visibility', 'hidden');
  $(".new-tweet").slideUp(250, function(e) {
    togglePos = 1;
  });

  $(".toggle-button").on('click', function(event) {
    if (togglePos === 0) {
      $(".new-tweet").slideUp(250, function(e) {
        togglePos = 1;
      })
    } else {
      $(".new-tweet").css('visibility', 'visible');
      $(".new-tweet").slideDown(250, function(e) {
        togglePos = 0;
        $("#tweet-text").focus();
      })
    }
  });
});


