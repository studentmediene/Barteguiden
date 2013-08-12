/*global require, module*/

module.exports = function(sequelize, Sequelize) {
    return sequelize.define("Event", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        startAt: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        placeName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
            validate: {
                min: -180,
                max: 180
            }
        },
        ageLimit: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
                max: 100
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
                max: 10000
            }
        },
        categoryID: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [["SPORT", "PERFORMANCES", "MUSIC", "EXHIBITIONS", "NIGHTLIFE", "PRESENTATIONS", "DEBATE", "OTHER"]]
            }
        },
        description_en: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        description_nb: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        isRecommended: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        imageURL: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        eventURL: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        isPublished: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        externalURL: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        externalID: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        validate: {
            bothCoordinatesOrNone: function () {
                var bothIsSet = (this.latitude && this.longitude);
                var noneIsSet = (!this.latitude && !this.longitude);
                if (!(bothIsSet || noneIsSet)) {
                    throw new Error("Require either both latitude and longitude or neither");
                }
            }
        }
    });
};
