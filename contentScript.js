// OverLayer constructor with defaults
function OverLayer() {
  this.color = "#000";
  this.alpha = 0.1;
}
let overLayer = new OverLayer();
const alphaIncrement = 0.02;
//projectorCorrectorOverLayer

// Check if #overLayer exists on the DOM
function overLayerExists() {
  // let exists = !!document.getElementById("overLayer");
  // console.log("existss: " + exists);
  // return exists;
  return $("#overLayer").length > 0; //make this more unique to avoid conflicts
}

// Create, redraw the overLayer opacity, remove if specified
function drawOverlay(removeAfter) {
  if (!overLayerExists()) {
    overLayer = new OverLayer();
    $("body").append("<div id='#overLayer'></div>");
  }

  $("#overLayer").fadeTo(200, overLayer.alpha, function() {
    if (removeAfter) $("#overLayer").remove();
  });
}

// Toggle the overLayer. Kill if it exists already
function toggleOverLayer() {
  let killOverLay = overLayerExists();
  if (killOverLay) overLayer.alpha = 0;
  drawOverlay(killOverLay);
}

// Apply an offset to the alpha
function changeOverlayOpacity(increment) {
  //overLayer.alpha = Math.min(1, Math.max(overLayer.alpha + increment, 0));
  drawOverlay();
}

// Listen from popup for button clicks
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let method = request.method;

  switch (method) {
    case "toggle":
      toggleOverLayer();
      break;
    case "increment":
      changeOverlayOpacity(alphaIncrement);
      break;
    case "decrement":
      changeOverlayOpacity(alphaIncrement * -1);
      break;
  }
});
