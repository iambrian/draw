// Settings
var canvasWidth = 600,
	canvasHeight = 600,
	backgroundColor = "#FFFFFF",
	lineColor = "green",
	lineWidth = 10;

// Prepare canvas
var c = document.getElementById("myCanvas"),
	ctx = c.getContext("2d");listX = new Array,
	listY = new Array,
	listDrag = new Array,
	paint = false;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// Clears canvas
function clearDraw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	listX = [];
	listY = [];
	listDrag = [];
}

// Detect mouse actions
function mouseDown(event) {
	var x = event.clientX-10;
	var y = event.clientY-10;
	paint = true;
	addList(x, y, false);
	redraw();
}

function mouseMove(event) {
	var x = event.clientX-10;
	var y = event.clientY-10;
	var coords = "X coords: " + x + ", Y coords: " + y;
	document.getElementById("demo").innerHTML = coords;
	if (paint) {
		addList(x, y, true);
	}
	redraw();
	listX.shift();
	listY.shift();
	listDrag.shift();
}

function mouseUp(event) {
	listX = [];
	listY = [];
	listDrag = [];
	paint = false;
}

function mouseOut() {
	listX = [];
	listY = [];
	listDrag = [];
	paint = false;
	document.getElementById("demo").innerHTML = "";
}

// Adds points to draw to array
function addList(x, y, drag) {
	listX.push(x);
	listY.push(y);
	listDrag.push(drag);
}

// Draw on canvas
function redraw() {
	ctx.beginPath();
	ctx.strokeStyle = lineColor;
	ctx.lineWidth = lineWidth;
	ctx.lineJoin = "round";
	ctx.moveTo(listX[0], listY[0]);
	for (i = 0; i < listX.length; i++) {
		if (listDrag[i]) {
			ctx.moveTo(listX[i - 1], listY[i - 1]);
		} else {
			ctx.moveTo(listX[i], listY[i]);
		}
		ctx.lineTo(listX[i], listY[i]);
		ctx.closePath();
		ctx.stroke();
	}
}