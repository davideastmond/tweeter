/** Responsible for counting the characters in a composed tweet 
 * it will update the counter label and change its color (and count negatives)
 * if the user's tweet character count goes over the limit
*/
const maxTweetLength = 140; // Default is 140 

$(document).ready(function() {
  /** Code to be executed when DOM is fully loaded */
  
  // Bind event handler and increment the character counter as user types / deletes
  $("#tweet-text").on('keyup', function (e) {
    let area  = document.getElementById('tweet-text');
    let b = document.getElementsByClassName("counter");

    if (area.value.length <= maxTweetLength ) {
      b[0].innerHTML = area.value.length;
      b[0].removeAttribute("id");
    } else {
      b[0].setAttribute('id', 'too-long');
      b[0].innerHTML = maxTweetLength - area.value.length;
      console.log("attribute set");
    }
  })
});