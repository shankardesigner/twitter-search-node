class Tweet {
    constructor(tweetId,screen_name,tweetText,profile_image_url,mediaImage,retweeted_status,created_at) {
        this.tweetId = tweetId;
        this.screen_name = screen_name;
        this.tweetText = tweetText;
        this.profile_image_url = profile_image_url;
        this.mediaImage = mediaImage;
        this.retweeted_status = retweeted_status;
        this.created_at = created_at;
    }
}

module.exports = Tweet;