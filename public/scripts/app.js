/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* Global variables: the firstKeeps track of where the new-tweet container is (up off screen or at its
 normal position). The second keeps track of the src for the large avatars */
let togglePos = 0;
let largeImages = [];

function createTweetElement (fromData) {
  /* takes in a tweet object and is responsible for returning a tweet <article> element containing 
  the entire HTML structure of the tweet.
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
  $avatar.attr("id", fromData._id);
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

  // Date stamp
  const dateStamp = new Date(fromData.created_at);
  const $dateTimeAgo = $("<a>", {text: `${dateStamp.toDateString()}`}).addClass("tweet-date");

  // Create a div w/ heart, retweet and flag icons and append to the footer
  const $iconsDiv = $("<div>").addClass("flags").addClass("hover-float");
  const $heartIcon = $("<i>").addClass("fas").addClass("fa-heart");
  const $retweetIcon = $("<i>").addClass("fas").addClass("fa-retweet");
  const $flagIcon = $("<i>").addClass("fas").addClass("fa-flag");

  let likeCount = 0;
  if (fromData.likes) {
    likeCount = fromData.likes;
  }
  const $likesCounterInteger = $("<a>", {text:`${likeCount}`}).addClass("like-counter-integer");

  // add a css tag to hide the tweet if like count is 0
  if (Number(fromData.likes) < 1) {
    $likesCounterInteger.addClass("fa-heart-invisible");
  }
  $heartIcon.attr('id', fromData._id);

  // keep track of large image reference
  let imageReference = {id: fromData._id, source: fromData.user.avatars.large};
  largeImages.push(imageReference);

  $iconsDiv.append($heartIcon, $likesCounterInteger, $retweetIcon, $flagIcon);
  $tweetFooter.append($dateTimeAgo, $iconsDiv);

  // Append all components to the article then return it
  $tweet.append($header, $bodyText, $tweetFooter);

  return $tweet;
}

function renderTweets(arrObjTweets) {
  /** This function can be responsible for taking in an array of tweet objects and then 
   appending each one to the #tweets-container.
   */

  // Make the tweet container visible when tweets are being rendered
  // by removing the CSS class "invisible"
  $("#tweet-container").removeClass("invisible");
  $("#tweet-container").empty();
  largeImages = [];
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
  $.ajax('/tweets', { method:'GET'})
  .then(function (tweetData) {
    renderTweets(tweetData);
  });
}

function likeTweet(to_id) {
  /* Creates a post request to the server to handle a tweet 'like' */
  let sendData = {id: to_id};

  $.ajax({
    type: "POST", 
    url: "/tweets/likes",
    data: sendData,
    success: function (data) {
      loadTweets();
    }
  })
}

$(document).ready(function() {
  // Form is ready to be loaded - immediately show tweets from the db
  loadTweets();

  /* Event handler to respond when a tweeter's avatar is clicked on their respective tweet
   which will open a modal pop-up to get a larger image */
  $(document).on('click', ".div-avatar", function (e) {
    const dataid = e.target.id;
    let obj = largeImages.find(function(e) {
      return e.id === dataid;
    });
    $("#large-avatar").attr('src', obj.source);
    $(".modal").css('visibility', 'visible');
  });

  /* Event handler to close the modal dialog when X button is clicked and reset the default
   image to the dummy image */
  $(document).on('click', '.close', function(e) {
    $(".modal").css('visibility', 'hidden');
    $("#large-avatar").attr('src', 'https://dummyimage.com/1/000000/0011ff');
  })
});

$(function() {
  /* The below functions are event handlers that handle the compose button click, 
  which toggles the compose-tweet section sliding off-screen /sliding down on screen*/
  
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
      $(".new-tweet").slideDown(50, function(e) {
        togglePos = 0;
        $("#tweet-text").focus();
      })
    }
  });

  $(document).on('click', ".fa-heart", function(e) {
    /** This function handles when the 'like' icon is clicked, and should
     * access a function that updates the db w/ a like count. We do this by
     * accessing the id attribute of the element that was clicked, found 
     * in the event "e" arguments id property
     */
    const data_id = e.target.id;
    likeTweet(data_id);
  })
});