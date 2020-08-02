const express = require('express');
const Twit = require('twit');
require('dotenv').config()

const T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

  const router = express.Router()


  module.exports = router

  router.get('/tweets', (req, res) => {
    T.get('search/tweets', { q: '%23nepal', count: 15 }, function(err, {statuses}=data, response) {

        const embededData = statuses.map(tweet => {
            
            return {
                "screen_name":tweet.user.screen_name,
                "tweetText":tweet.text,
                "created_at":Date.parse(tweet.created_at),
                "tweetId":tweet.id,
                "mediaImage": tweet.entities.media ? ([
                    {"media_image" : tweet.entities.media}
                ]) : 0,
                "profile_image_url": tweet.user.profile_image_url,
                "retweeted_status": tweet.retweeted_status ? ([
                    {"retweet_count" : tweet.retweeted_status.retweet_count,
                    "favorite_count": tweet.retweeted_status.favorite_count}
                ]) : null
            }
        })
        res.json(embededData)
        
      })
  });