/**
 * Created by MrFirases on 12/29/2017.
 */

var Twitter = require('twitter');
var cron = require('node-cron');
var Tweet = require('../models/tweet');
var config = require('../config/twitter.config');
var client = new Twitter(config.twitterKeys);


module.exports.run = function (req, res) {
   var task = cron.schedule('50 49 1 * * *', function () {
        var stream = client.stream('statuses/filter', {track: '#Tunisia, #TN, #North_Africa'});
        stream.on('data', function (data) {
            console.log("Tweet: ", data);
            var tweet = new Tweet();
            tweet.text = data.text;
            tweet.screenName = data.user.screen_name;
            tweet.createdAt = data.created_at;
            tweet.save(function (err) {
                if (err)
                    res.send(err);
            });
        });
        stream.on('error', function (error) {
            throw error;
        });
    });
   task.start();
};