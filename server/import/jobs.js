var CronJob = require('cron').CronJob;
var feeds = [
    require('./import_scripts/samfundet.js'),
    require('./import_scripts/uka.js'),
    require('./import_scripts/google_drive.js')
];

module.exports = new CronJob('00 30 11 * * 0-6', function(){
    feeds.map(function(feed) {
        feed.insertEvents();
    });
});
