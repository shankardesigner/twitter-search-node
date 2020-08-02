const express = require('express');
const Twit = require('twit');
const Tweet = require('./model/Tweet');
const cors = require('cors');

const T = new Twit({
    consumer_key:         '7TwhJxrnXRTX617BJOCTrLwYQ',
    consumer_secret:      'khkZ0Kj952aXK7R2mQG2H3A0y8kMzbn63FzTrgRxo70bRDVmgb',
    access_token:         '113241759-3fjOYrIfFdc0aPv5Nbh4kCwyfHqDFOIJvhNqQxS7',
    access_token_secret:  'CAImQOuzUPBCWLPYM8QOmrcGZBtxDUtixRuB9QNCDOxTH',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })


const app = express();

app.use(cors());

//middlewares
// app.use('/', () => {
//     console.log('middleware called')
// });

//ROUTES
app.get('/', (req,res) => {
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
            // return twt;
        })
        res.json(embededData)
        
      })

});

//Listen
app.listen(3000);