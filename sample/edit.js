
// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
    navigator.splashscreen.hide();
	newCanvas();


}

var ctx, color = "#000", x = 0, y = 0, z = 0, etch = 0;

$(document).ready(function () {


	// Call onDeviceReady when Cordova is loaded and talking with the native device
	document.addEventListener("deviceready", onDeviceReady, false);

	// setup a new canvas for drawing
	newCanvas();

	// prevent footer to toggle on touch
	$("[data-role=footer]").fixedtoolbar({ tapToggle: false });

	// reset palette selection (css) and select the clicked color for canvas strokeStyle
	$(".palette").click(function(){
		$(".palette").css("border-color", "#777");
		$(".palette").css("border-style", "solid");
		$(this).css("border-color", "#fff");
		$(this).css("border-style", "dashed");
		color = $(this).css("background-color");
		ctx.beginPath();
		ctx.strokeStyle = color;
	});
	// link the new button with newCanvas() function
	$("#new").click(function() {
		newCanvas();
	});



});

// function to setup a new canvas for drawing
function newCanvas(){
	//define and resize canvas
    $("#content").height($(window).height()-90);
    var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
	$("#content").html(canvas);

    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;

    // set starting point in center
    ctx.beginPath();
	x = $(window).width()/2 ;
	y = ($(window).height()-90)/2 ;
	ctx.moveTo(x, y);

	// setup to trigger drawing on mouse or touch
	$("#canvas").drawTouch();
    $("#canvas").drawPointer();
	$("#canvas").drawMouse();
}

// prototype to	start drawing on touch using canvas moveTo and lineTo
$.fn.drawTouch = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);
};

// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
$.fn.drawPointer = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.pageX;
		y = e.pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
    };
	$(this).on("MSPointerDown", start);
	$(this).on("MSPointerMove", move);
};

// prototype to	start drawing on mouse using canvas moveTo and lineTo
$.fn.drawMouse = function() {
	var clicked = 0;
	var start = function(e) {
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
		}
	};
	var stop = function(e) {
		clicked = 0;
	};
	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
};
