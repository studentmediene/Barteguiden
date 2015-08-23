var CronJob = require('cron').CronJob;
var feeds = [
    require('./import_scripts/samfundet.js'),
    require('./import_scripts/uka.js')
];

module.exports = new CronJob('00 30 11 * * 1-7', function(){
    feeds.map(function(feed) {
        feed.insertEvents();
    });
});
