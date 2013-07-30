/*global module*/

module.exports = function(sequelize, Sequelize) {
    return sequelize.define("User", {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        instanceMethods: {
            validPassword: function (password) {
                return (this.password == password);
            }
        }
    });
};
