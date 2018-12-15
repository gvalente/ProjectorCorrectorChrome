function callContentScript(method) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { method: method });
    }
  });
}

$("button").each(function() {
  $(this).on("click", function() {
    callContentScript($(this).attr("id"));
  });
});

// popup in launched
document.addEventListener("DOMContentLoaded", function() {});
