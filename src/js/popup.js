import $ from "zepto";
const Handlebars = require("handlebars/runtime");

Handlebars.registerHelper("math", function(op1, operator, op2) {
    op1 = parseFloat(op1);
    op2 = parseFloat(op2);

    return {
        "+": op1 + op2,
        "-": op1 - op2
    }[operator];
});

function getWindowsList() {
    return new Promise((resolve, reject) => {
        chrome.windows.getAll({
            populate: true,
        }, function(arr) {
            resolve(arr);
        });
    });
}

function preprocessWindowList(windowList) {
    return {
        "windows": windowList
    };
}

function renderWindowAndTabList(windowList) {
    windowList = preprocessWindowList(windowList);
    let template = require("../templates/windowsAndTabsList.handlebars");
    return template(windowList);
}

function start() {
    getWindowsList().then((windowList) => {
        console.log(windowList);
        $("ul.windowAndTabList").html(renderWindowAndTabList(windowList));
    });
}

start();