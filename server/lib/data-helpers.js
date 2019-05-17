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

    // handles like increment
    increaseLikeCount: function(idToUpdate, callback) {
      
      db.collection("tweets").update({'_id': ObjectID(idToUpdate) }, {$inc: { likes: 1}}, function(err, res) {
        if (err) throw err;
        callback(null, true);
      });
    }
  };
}
