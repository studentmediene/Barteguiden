/*global module*/

module.exports = {
    createObjectForMapping: function (sourceObject, mapping) {
        var targetObject = {};
        
        mapping.forEach(function (field) {
            var value = sourceObject[field.fromKey];
            
            if (field.transform) {
                value = field.transform(value);
            }
            
            if (value !== undefined && value !== null) {
                if (field.type === "add") {
                    var targetValue = targetObject[field.toKey];
                    if (Object.prototype.toString.call(targetValue) !== "[object Array]") {
                        targetObject[field.toKey] = [];
                    }
                    
                    targetObject[field.toKey].push(value);
                }
                // Default to: set
                else {
                    targetObject[field.toKey] = value;
                }
            }
        });
        
        return targetObject;
    }
};