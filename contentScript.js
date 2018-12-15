// OverLayer constructor
function OverLayer() {
  this.color = "#000";
  this.alpha = 0.5;
  this.alphaOffset = 0.02;
}
let overLayer = {};

// Check if #overLayer exists on the DOM
function overLayerExists() {
  return $("#overLayer").length > 0;
}

// Create, redraw the overLayer opacity, remove if specified
function drawOverlay(removeAfter) {
  if (!overLayerExists()) {
    overLayer = new OverLayer();
    $("body").append("<div id='overLayer'></div>");
  }

  $("#overLayer").fadeTo(200, overLayer.alpha, function() {
    if (removeAfter) $("#overLayer").remove();
  });
}

// Toggle the overLayer. Kill if it exists already
function toggleOverlay() {
  let killOverLay = overLayerExists();
  if (killOverLay) overLayer.alpha = 0;
  drawOverlay(killOverLay);
}

// Apply an offset to the alpha
function offsetOverlayOpacity(offset) {
  if (offset == "increment" && overLayer.alpha <= 1 - overLayer.alphaOffset) {
    overLayer.alpha += overLayer.alphaOffset;
  } else if (
    offset == "decrement" &&
    overLayer.alpha >= overLayer.alphaOffset
  ) {
    overLayer.alpha -= overLayer.alphaOffset;
  }
  drawOverlay();
}

// Listen from popup for button clicks
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
