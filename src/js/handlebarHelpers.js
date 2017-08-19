const Handlebars = require("handlebars/runtime");

Handlebars.registerHelper("math", function(op1, operator, op2) {
    op1 = parseFloat(op1);
    op2 = parseFloat(op2);

    return {
        "+": op1 + op2,
        "-": op1 - op2
    }[operator];
});

Handlebars.registerHelper("truncate", function(string, maxLength) {
    let suffix = "...";
    let retValue = string;
    if(maxLength > suffix.length && string.length > maxLength) {
        retValue = string.substring(0, maxLength - suffix.length) + suffix;
    }
    return retValue;
});