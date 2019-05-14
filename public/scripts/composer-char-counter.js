/** Responsible for counting the characters in a composed tweet 
 * it will update the counter label and change its color (and count negatives)
 * if the user's tweet character count goes over the limit
*/
const maxTweetLength = 140; // Default is 140 

$(document).ready(function() {
  /** Code to be executed when DOM is fully loaded
   Bind event handler and increment the character counter as user types / deletes
   characters
  */
  $("#tweet-text").on('keyup', function() {
    const textArea = $("#tweet-text");
    const counterElement = $(".counter");
    if (textArea.val().length < maxTweetLength) {
      counterElement.html(maxTweetLength - textArea.val().length);
      counterElement.removeClass("too-long");
    } else {
      counterElement.html(maxTweetLength - textArea.val().length);
      counterElement.addClass("too-long");
    }
  })


});