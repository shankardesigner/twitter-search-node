const express = require('express');
const Twit = require('twit');
const decodeJwtToken = require('../Auth/decodeToken');
const User = require('../model/User');
const TweetSearchHistory = require('../model/TweetSearchHistory');
const { json } = require('body-parser');
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

  router.get('/tweets', async (req, res) => {
    const query = req.query.query;
    const token = req.headers.authorization;
    let searchTerms = "%23COVID19"
    
    if(token) {
        const decodedToken = await decodeJwtToken(token);
        const id = decodedToken.payload.id;
        const exp = decodedToken.payload.exp;

        if(exp > Date.now()/1000) {
            searchTerms = query;
            const currentUser = await User.findById(id);
            const history = currentUser.searchHistory;

            if(query != undefined && currentUser != null) {
                await TweetSearchHistory({keyword:searchTerms}).save().then(search => {
                    currentUser.searchHistory.push(search._id);
                    currentUser.save();
                });
            }

            // const getSearchByUSer = JSON.parse(history.map(id => TweetSearchHistory.findOne({_id: id})));
            // console.log(getSearchByUSer)
        }
    }

    T.get('search/tweets', { q: searchTerms, count: 15 }, async function(err, {statuses}=data, response) {

        const embededData = await statuses.map(tweet => {
            
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