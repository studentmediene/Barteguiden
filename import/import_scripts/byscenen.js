FEED_URL = "http://byscenen.no/?post_type=event&feed=rss2"

var FeedParser = require('feedparser')
  , request = require('request');

var req = request(FEED_URL)
  , feedparser = new FeedParser([]);

req.on('error', function(error){
  
});

req.on('response', function(res){
  var stream = this;

  if (res.statusCode != 200) return this.emit('errror', new Error("Bad status code"));

  stream.pipe(feedparser);
});

feedparser.on('error', function(error){
  console.log("hue");
})
feedparser.on('readable', function(){
  var stream = this
    , meta = this.meta
    , item;
  while (item = stream.read()){
    console.log(item.title);
  }
})
