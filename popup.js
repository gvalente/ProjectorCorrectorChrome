// Send button click command to Content Script
function callContentScript(method) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { method: method });
    }
  });
}

// Set up button click events
$("button").each(function() {
  $(this).on("click", function() {
    callContentScript($(this).attr("id"));
  });
});
