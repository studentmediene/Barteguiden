FEED_URL = "http://byscenen.no/?post_type=event&feed=rss2"

var mapper = require("object-mapper");
var FeedParser = require('feedparser');
var request = require('request');

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
  items = []
  while (item = stream.read()){
    items.push(item)
  }
  events = parseEvents(items);

})

function parseEvents (externalEvents) {
    var outputEvents = [];
    for (var i = 0; i < externalEvents.length; i++) {
        var externalEvent = externalEvents[i];
        var event = mapper.merge(externalEvent, {
            placeName: "Byscenen",
            address: "Kongens Gate 19, 7012 Trondheim",
            latitude: 63.430051,
            longitude: 10.391950,
            externalURL: externalURL,
            isPublished: true
        }, mapping);
        
        outputEvents.push(event);
    }
    return outputEvents;
}
