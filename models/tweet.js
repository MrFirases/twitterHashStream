/**
 * Created by MrFirases on 12/29/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
  text: String,
  screenName: String,
  createdAt: String,
});

module.exports = mongoose.model('Tweet', TweetSchema);
