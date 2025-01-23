var interval = null;
var state = "start";
var start = true;
var elements = null;
onload = function () {
  elements = document.querySelectorAll("img");

  if (elements[0]) {
    imgParent = elements[0].offsetParent;
    // save intial style and state
    for (let i = 0; i < elements.length; i++) {
      var el = elements[i];
      setStyle(el, "left");
      setStyle(el, "right");
      setStyle(el, "top");
      setStyle(el, "bottom");
      setStyle(el, "width");
      setStyle(el, "height");

      if (el.className.includes("horizontal")) {
        //it's horizontal
        if (el.style.left > el.style.right) {
          // ? it's on right
          el.setAttribute("position", "right");
          el.setAttribute("going", "left");
        } else {
          // *its on left
          el.setAttribute("position", "left");
          el.setAttribute("going", "right");
        }
      } else {
        el.setAttribute("position", "bottom");
        el.setAttribute("going", "up");
      }
      //   move(el, "up");
    }
  } else {
    console.log("there no images");
  }
  document.getElementById("startBtn").addEventListener("click", startStop);
  document.getElementById("resetBtn").addEventListener("click", reset);
};
function setStyle(el, property) {
  var probVal = parseInt(getComputedStyle(el)[property]);
  el.style[property] = probVal + "px";
  probVal = parseInt(getComputedStyle(el.offsetParent)[property]);
  el.offsetParent.style[property] = probVal + "px";
}

function checkBoundry() {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].className.includes("horizontal")) {
      //it's horizontal
      if (
        parseInt(elements[i].style.left) + parseInt(elements[i].style.width) >=
        parseInt(elements[i].offsetParent.style.width)
      ) {
        elements[i].setAttribute("going", "left");
      } else if (parseInt(elements[i].style.left) - 5 <= 0) {
        elements[i].setAttribute("going", "right");
      }
    } else {
      if (
        parseInt(elements[i].style.top) + parseInt(elements[i].style.height) >=
        parseInt(elements[i].offsetParent.style.height)
      ) {
        elements[i].setAttribute("going", "up");
      } else if (parseInt(elements[i].style.top) - 5 <= 0) {
        elements[i].setAttribute("going", "down");
      }
    }
    //   move(el, "up");
  }
}

function startStop() {
  if (start) {
    console.log("start");
    start = false;
    interval = setInterval(function () {
      checkBoundry(); // Check boundaries before moving
      for (let i = 0; i < elements.length; i++) {
        var el = elements[i];
        var direction = el.getAttribute("going");
        move(el, direction);
      }
    }, 8);
  } else {
    console.log("stop");
    start = true;
    clearInterval(interval);
  }
}

function reset() {
  // Stop any ongoing animation
  clearInterval(interval);
  start = true;

  // Reset each image to its initial position
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var parent = el.offsetParent;
    var parentStyle = getComputedStyle(parent);
    var borderWidth = parseInt(parentStyle.borderWidth) || 0;

    if (el.className.includes("horizontal")) {
      // Reset horizontal images
      if (el.getAttribute("position") === "right") {
        el.style.left = parent.clientWidth - el.offsetWidth + "px";
      } else {
        el.style.left = 0 + "px";
      }
    } else {
      // Reset vertical images
      if (el.getAttribute("position") === "bottom") {
        el.style.top = parent.clientHeight - el.offsetHeight + "px";
      } else {
        el.style.top = 0 + "px";
      }
    }

    // Update all styles
    setStyle(el, "left");
    setStyle(el, "right");
    setStyle(el, "top");
    setStyle(el, "bottom");
    startStop();
  }
}
function move(el, direction) {
  var step = 1;
  //   console.log("move");
  switch (direction) {
    case "left":
      var currentLeft = parseInt(el.style.left);
      el.style.left = currentLeft - step + "px";
      //   console.log("left");
      break;
    case "right":
      var currentLeft = parseInt(el.style.left);
      el.style.left = currentLeft + step + "px";
      //   console.log("right");
      break;
    case "up":
      var currentTop = parseInt(el.style.top);
      el.style.top = currentTop - step + "px";
      //   console.log("up");
      break;
    case "down":
      var currentTop = parseInt(el.style.top);
      el.style.top = currentTop + step + "px";
      //   console.log("down");
      break;
  }
  setStyle(el, "left");
  setStyle(el, "right");
  setStyle(el, "top");
  setStyle(el, "bottom");
  setStyle(el, "width");
  setStyle(el, "height");
}
function getBoundries() {
  return elements[0].offsetParent.getBoundingClientRect();
}
