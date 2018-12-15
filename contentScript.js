let overLayer = {
  color: "#000",
  alpha: 0.5,
  alphaOffset: 0.02
};

function overLayerExists() {
  return $("#overLayer").length > 0;
}

function updateOverlay() {
  if (!overLayerExists()) {
    $("body").append("<div id='overLayer'></div>");
  }

  $("#overLayer").fadeTo(200, overLayer.alpha);
}

function toggleOverlay() {
  if (overLayerExists()) {
    $("#overLayer").fadeTo(200, 0, function() {
      $("#overLayer").remove();
    });
  } else {
    overLayer.color = "#000";
    overLayer.alpha = 0.5;
    updateOverlay();
  }
}

function offsetOverlayOpacity(offset) {
  if (offset == "increment" && overLayer.alpha <= 1 - overLayer.alphaOffset) {
    overLayer.alpha += overLayer.alphaOffset;
  } else if (
    offset == "decrement" &&
    overLayer.alpha >= overLayer.alphaOffset
  ) {
    overLayer.alpha -= overLayer.alphaOffset;
  }

  updateOverlay();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let method = request.method;

  switch (method) {
    case "toggle":
      toggleOverlay();
      break;

    case "increment":
    case "decrement":
      offsetOverlayOpacity(method);
      break;
  }
});
