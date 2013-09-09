/*global require, module, process*/

var locomotive = require("locomotive");

var User = locomotive.models.User;
var Event = locomotive.models.Event;

module.exports = function (done) {
    if (this.env === "development" && process.env.RESET_DB) {
        console.log("Resetting database...");
        
        locomotive.sequelize.sync({ force: true }).then(function () {
            User.create({
                username: "pablo",
                password: "pablo!12345"
            });
            Event.bulkCreate([{
                title: "Semesterstart",
                startAt: new Date(Date.parse("2013-08-10 20:00")),
                placeName: "Studentersamfundet",
                address: "Elgeseter gate 1",
                latitude: 63.422634,
                longitude: 10.394697,
                isPublished: false,
            }, {
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
                imageURL: "http://barteguiden.no/v1/events/2.jpg",
                eventURL: "http://www.samfundet.no/arrangement/vis/3611",
                isPublished: false,
            }, {
                title: "Dagen etter semesterstart",
                startAt: new Date(Date.parse("2013-08-14 20:00")),
                placeName: "Studentersamfundet",
                address: "Elgeseter gate 1",
                latitude: 63.422634,
                longitude: 10.394697,
                isPublished: false,
            }]).error(function (err) {
                console.log(err);
            });
        }).then(function () {
            done();
        });
    }
    else {
        done();
    }
};
