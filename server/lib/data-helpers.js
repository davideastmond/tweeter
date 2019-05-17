"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectID = require("mongodb").ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      try {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      } catch (e) {
        console.log(e);
      }
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, results) => {
        if (err) throw err;
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, results.sort(sortNewestFirst));
      })
    },

      // handles like increment / decrement
      toggleLikeCount: function(idToUpdate, callback) {
      // This essentially toggles the like count. If it's 1, make it 0 and vice versa
      
      db.collection("tweets").find({'_id': ObjectID(idToUpdate)}).toArray((err, result) => {
        if (err) throw err;
        result[0].likes > 0 ? bumpLikes(db, idToUpdate, -1) : bumpLikes(db, idToUpdate, 1); 
        callback(null, true);
      });
      // db.collection("tweets").update({'_id': ObjectID(idToUpdate) }, {$inc: { likes: 1}}, function(err, res) {
      //   if (err) throw err;
      //   callback(null, true);
      // });
    }
  };
}
function bumpLikes(db, id, amount) {
  /* helper function that increases or decreases the like count on a tweet */
  db.collection("tweets").update({ '_id': ObjectID(id)}, { $inc: { likes: amount}}, function(err, result) {
    if (err) throw err;
  })
}
