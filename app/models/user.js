/*global module*/

module.exports = function(sequelize, Sequelize) {
    return sequelize.define("User", {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    });
};
