function analyzeText() {
    chrome.extension.getBackgroundPage().analyzeText();
}

document.addEventListener('DOMContentLoaded', function () {
    analyzeText();
});
