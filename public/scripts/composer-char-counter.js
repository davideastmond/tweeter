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
   when copying and pasting text into the form textarea.

   Please also note the tweet button will disable if the tweet exceeds max length
  */

  $("#tweet-text").on('keypress', function() {
    const $textArea = $("#tweet-text");
    const $counterElement = $(".counter");
    const $tweetButton = $("#tweet-button");
    
    $counterElement.html(maxTweetLength - $textArea.val().length);

    if ($textArea.val().length <= maxTweetLength) {
      $counterElement.removeClass("too-long");
      $tweetButton.attr("disabled", false);
    } else {
      $counterElement.addClass("too-long");
    }
  });

  $("#tweet-text").on('keyup', function() {
    const $textArea = $("#tweet-text");
    const $counterElement = $(".counter");
    const $tweetButton = $("#tweet-button");
    
    $counterElement.html(maxTweetLength - $textArea.val().length);

    if ($textArea.val().length <= maxTweetLength) {
      $counterElement.removeClass("too-long");
      $tweetButton.attr("disabled", false);
    } else {
      $counterElement.addClass("too-long");
    }
  });

  $("#tweet-text").on('keydown', function() {
    const $textArea = $("#tweet-text");
    const $counterElement = $(".counter");
    const $tweetButton = $("#tweet-button");

    hideErrorMessage();
    
    $counterElement.html(maxTweetLength - $textArea.val().length);

    if ($textArea.val().length <= maxTweetLength) {
      $counterElement.removeClass("too-long");
      $tweetButton.attr("disabled", false);
    } else {
      $counterElement.addClass("too-long");
    }
  });

  $("#tweet-form").on("submit", function(e) {
    /* This event handler prevents the form from being submitted if the 
    textarea text count is > maxTweetLength
    */
    e.preventDefault();
   
    if ($("#tweet-text").val().length > maxTweetLength) {
      showErrorMessage("Tweet must be 140 chars or less.");
      return;
    }
    if ($("#tweet-text").val().length === 0) {
      showErrorMessage("Please enter tweet text.");
      return;
    }
    
    /* After validation, the form will submit the post request, refresh
    and load new tweets and clear the text area
    */
    $.ajax({
      type: "POST", 
      url: "/tweets",
      data: $(this).serialize(),
      success: function (data) {
        clearTextArea();
        loadTweets(); 
      }
    });
  });
});

function clearTextArea() {
  /* helper function to clear text area after a tweet is submitted */
  $("#tweet-text").val("");
  $(".counter").html('140');
}

function showErrorMessage(errText) {
  /**
   * Shows a blinking error message when the user submits invalid tweet
   * (empty or character count too long)
   */
  
   const $errorMessage = $("#error-message");
   const $divError = $("#div-error");
   $divError.css({"visibility": "visible"});
   $errorMessage.text(errText);

   $divError.animate({opacity: 0}, 200, "linear", function() {
     $divError.animate({opacity: 1}, 200);
   });
}

function hideErrorMessage() {
  /* Hides the error message ( to be implemented when user starts typing in the 
   text area). */
  const $divError = $("#div-error");
  $divError.css({"visibility": "hidden"});
}