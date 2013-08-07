/*global require, module*/

var app = require("locomotive");

var User = app.models.User;
var Event = app.models.Event;

module.exports = function (done) {
    app.sequelize.sync({force: true}).then(function () {
        User.create({
            username: "pablo",
            password: "pablo"
        });
        Event.create({
            title: "Semesterstart",
            startAt: new Date(Date.parse("2013-08-13 20:00")),
            placeName: "Studentersamfundet",
            latitude: 63.422634,
            longitude: 10.394697,
        });
        Event.create({
            title: "CV- og jobbsøkerkurs med Effect Bemanning",
            startAt: new Date(Date.parse("2013-08-16 20:00")),
            placeName: "Studentersamfundet",
            address: "Elgeseter gate 1",
            latitude: 63.422634,
            longitude: 10.394697,
            ageLimit: 18,
            price: 0,
            categoryID: "PRESENTATIONS",
            description_en: "Wish to get the dream job quicker?",
            description_nb: "Ønsker du å gjøre veien til drømmejobben kortere?",
            isRecommended: true,
            eventURL: "http://www.samfundet.no/arrangement/vis/3611",
            externalID: null,
        });
        Event.create({
            title: "Dagen etter semesterstart",
            startAt: new Date(Date.parse("2013-08-14 20:00")),
            placeName: "Studentersamfundet",
            latitude: 63.422634,
            longitude: 10.394697,
        }).error(function (err) {
            console.log(err);
        });
    }).then(function () {
        done();
    });
};
