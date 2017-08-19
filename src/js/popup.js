import $ from "zepto";
require("./handlebarHelpers");

function renderSaveSessionTab() {
    renderSaveSessionContainer();
    renderSessionInfo();
}

function renderSaveSessionContainer() {
    let template = require("../templates/saveSession.handlebars");
    $("#main").html(template());
    $("form#saveSessionForm").submit(handleSaveSession);
}

function handleSaveSession(evt) {
    console.log("Saving Session...");
    evt.preventDefault();
}

function renderSessionInfo() {
    getWindowsList().then((windowList) => {
        console.log(windowList);
        $("ul.windowAndTabList").html(renderWindowAndTabList(windowList));
    });
}

function getWindowsList() {
    return new Promise((resolve, reject) => {
        chrome.windows.getAll({
            populate: true,
        }, function(arr) {
            resolve(arr);
        });
    });
}

function renderWindowAndTabList(windowList) {
    windowList = preprocessWindowList(windowList);
    let template = require("../templates/windowsAndTabsList.handlebars");
    return template(windowList);
}

function preprocessWindowList(windowList) {
    return {
        "windows": windowList
    };
}

function start() {
    renderSaveSessionTab();
}

start();