/*global module*/

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
                notNull: true
            }
        },
//        placeName: {
//            type: Sequelize.STRING,
//            allowNull: false,
//            validate: {
//                notNull: true,
//                notEmpty: true
//            }
//        },
//        address: {
//            type: Sequelize.STRING
//        },
//        latitude: {
//            type: Sequelize.FLOAT
//        },
//        longitude: {
//            type: Sequelize.FLOAT
//        },
//        ageLimit: {
//            type: Sequelize.INTEGER
//        },
//        price: {
//            type: Sequelize.DECIMAL(10, 2)
//        },
//        categoryID: {
//            type: Sequelize.STRING
//        },
//        description_en: {
//            type: Sequelize.TEXT
//        },
//        description_no: {
//            type: Sequelize.TEXT
//        },
//        isRecommended: {
//            type: Sequelize.BOOLEAN
//        },
//        imageURL: {
//            type: Sequelize.STRING,
//            validate: {
//                isUrl: true
//            }
//        },
//        eventURL: {
//            type: Sequelize.STRING,
//            validate: {
//                isUrl: false
//            }
//        }
    });
};
