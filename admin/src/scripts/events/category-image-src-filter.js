"use strict";

module.exports = [function () {
    var defaultCategory = "other";
    
    return function (input) {
        var category = input || defaultCategory;
        var imageName = category.toLowerCase();
        
        // TODO: Add full URL
        var url = "http://localhost:10913/admin/images/categories/" + imageName + ".png";
        
        return url;
    };
}];
