/** Responsible for counting the characters in a composed tweet 
 * it will update the counter label and change its color (and count negatives)
 * if the user's tweet character count goes over the limit
*/
const maxTweetLength = 140; // Default is 140 

$(document).ready(function() {
  /** Code to be executed when DOM is fully loaded
   Bind event handler and increment the character counter as user types / deletes
   characters.

   I made three event handlers to capture the quirky issues that happen
   when copying and pasting text into the form textarea 
  */
  $("#tweet-text").on('keypress', function() {
    const $textArea = $("#tweet-text");
    const $counterElement = $(".counter");
    const $tweetButton = $("#tweet-button");
    
    $counterElement.html(maxTweetLength - $textArea.val().length);

    if ($textArea.val().length < maxTweetLength) {
      $counterElement.removeClass("too-long");
      $tweetButton.attr("disabled", false);
    } else {
      $counterElement.addClass("too-long");
      $tweetButton.attr("disabled", true);
    }
  })
  $("#tweet-text").on('keyup', function() {
    const $textArea = $("#tweet-text");
    const $counterElement = $(".counter");
    const $tweetButton = $("#tweet-button");
    
    $counterElement.html(maxTweetLength - $textArea.val().length);

    if ($textArea.val().length < maxTweetLength) {
      $counterElement.removeClass("too-long");
      $tweetButton.attr("disabled", false);
    } else {
      $counterElement.addClass("too-long");
      $tweetButton.attr("disabled", true);
    }
  })
  $("#tweet-text").on('keydown', function() {
    const $textArea = $("#tweet-text");
    const $counterElement = $(".counter");
    const $tweetButton = $("#tweet-button");
    
    $counterElement.html(maxTweetLength - $textArea.val().length);

    if ($textArea.val().length < maxTweetLength) {
      $counterElement.removeClass("too-long");
      $tweetButton.attr("disabled", false);
    } else {
      $counterElement.addClass("too-long");
      $tweetButton.attr("disabled", true);
    }
  })

  $("#tweet-form").on("submit", function(e) {
    /* This event handler prevents the form from being submitted if the 
    textarea text count is > maxTweetLength
    */
    e.preventDefault();
   
    if ($("#tweet-text").val().length > maxTweetLength) {
      alert("The length of your tweet must be 140 chars or less.");
      return;
    }
    if ($("#tweet-text").val().length === 0) {
      alert("Please enter tweet text; this field cannot be empty");
      return;
    }
    
    // passed validation, the form will submit
    $.ajax({
      type: "POST", 
      url: "/tweets",
      data: $(this).serialize(),
      success: function (data) {
        console.log("Response ", data);
      }
    })
  });
  
});