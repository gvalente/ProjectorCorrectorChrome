// let toggle = document.getElementById("toggleOverlay");

document.getElementById("toggleOverlay").onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { greeting: "hi from popup" });
    }
  });
};

document.addEventListener("DOMContentLoaded", function() {
  // popup in launched
});
