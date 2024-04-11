const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSizeSelect = document.getElementById("fontsize");
let isDrawing = false;

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing(e) {
  isDrawing = false;
  context.beginPath();
}

function draw(e) {
  if (!isDrawing) {
    return;
  }
  context.lineWidth = fontSizeSelect.value;
  context.lineCap = "round";
  context.strokeStyle = colorPicker.value;
  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.stroke();
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveAndDownload() {
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas_image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
colorPicker.addEventListener("change", function () {
  context.strokeStyle = colorPicker.value;
});

canvasColor.addEventListener("change", function () {
  canvas.style.backgroundColor = canvasColor.value;
});

fontSizeSelect.addEventListener("change", function () {
  context.lineWidth = fontSizeSelect.value;
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
