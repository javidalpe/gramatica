'use strict';

function sendMessageToContentScriptAndLogCallback(tabId) {
    console.log(tabId);
    chrome.tabs.sendRequest(tabId, {}, function (value) {
        console.log(value);
    });
}

function analyzeText() {
    console.log('analyzeText');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        sendMessageToContentScriptAndLogCallback(tabs[0].id);
    });
}