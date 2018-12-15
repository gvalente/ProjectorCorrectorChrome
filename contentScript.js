let overLayer = Object();

function updateOverlay() {
  console.log("update overlay");
  if ($("overLayer").length < 1) {
    $("body").append("<div id='overLayer'></div>");
  }

  $("#overLayer").css("background-color", overLayer.color);
  $("#overLayer").fadeTo(100, overLayer.alpha);
}

function createOverlay() {
  console.log("create overlay");
  overLayer.color = "#000";
  overLayer.alpha = 0.5;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request.greeting);
  createOverlay();
  updateOverlay();
});
