// The background page is asking us to get selected text
import React from 'react';
import ReactDOM from 'react-dom';

if (window == top) {
    chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
        console.log('onRequest');
        callApi(document.activeElement.value);
    });
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function replaceError(value, replace, offset) {
    return value.substr(0, parseInt(replace.inip) + offset) + replace.sug_list[0].form + value.substr(parseInt(replace.endp) + 1 + offset);
}

function handleResponse(value, responseText) {
    var result = JSON.parse(responseText);
    var offset = 0;
    for (var i = 0; i < result.result_list.length; i++) {
        var replace = result.result_list[i];
        if (replace.hasOwnProperty('sug_list') && replace.sug_list.length > 0) {
            console.log(value);
            var suggestion = replace.sug_list[0].form;
            value = replaceError(value, replace, offset);
            offset = offset + (suggestion.length - replace.text.length);
            console.log(value);
        }
    }

    showResult(value);
}


let showResult = (value) => {
    let reference = document.activeElement;

    let div = document.createElement("div");
    div.id = "gramatica-popup";

    document.body.appendChild(div);

    let anotherPopper = new Popper(
        reference,
        div,
        {
            placement: 'top'
        }
    );

    //div.innerText = value;
    div.style.cursor = "pointer";
    div.style.padding = "8px";
    div.style.border = "1px solid grey";

    div.addEventListener("click", function() {
        reference.value = value;
        anotherPopper.destroy();
    });

    ReactDOM.render(
        value
        ,div);

}

var callApi = function (text) {
    var api_key = "3b39cda74672d6575a50f4dfba962b11";
    var languaje = "es";
    var data = "key=" + api_key + "&lang=" + languaje + "&txt=" + text;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            handleResponse(text, this.responseText);
        }
    });

    xhr.open("POST", "https://api.meaningcloud.com/stilus-1.2");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
};
