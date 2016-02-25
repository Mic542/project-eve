var canvas = new fabric.Canvas('c');
var isRedoing = false;
var h = [];
var lastbrushsize;
var newtext= false;
var textsize;
var brush_color = 'rgba(0,0,0,1)';
var radius = 10;
var wastext = false;
var canvascolor = 'rgba(255,255,165,1)';

fabric.Object.prototype.selectable = false;
canvas.isDrawingMode = !canvas.isDrawingMode;
canvas.setBackgroundColor(canvascolor, canvas.renderAll.bind(canvas));

var eraser = canvas.backgroundColor;

lastbrushsize = canvas.freeDrawingBrush.width;

canvas.on('mouse:up', function(event){
  var pointer = canvas.getPointer(event.e);
  if(canvas.isDrawingMode == false && newtext == true){
    canvas.add(new fabric.IText('Tap and Type', {
  fontFamily: 'comic sans',
  left: pointer.x,
  top: pointer.y,
  fontSize: textsize,
  selectable: true,
  fill: brush_color
}));
newtext = false;
wastext = false;
backToBrush();
toSelect();
  }
});

function changeToBrush(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.freeDrawingBrush.color = brush_color;

  if(document.getElementById("brush").className == "btn-circle selected"){
    if(newtext == false){
      toText();
      document.getElementById("brushIcon").src = "img/icon/font.svg";
    }
    else if(newtext == true){
      backToBrush();
      document.getElementById("brushIcon").src = "img/icon/brush.svg";
    }
  }

  else{
    if(wastext == true){
      toText();
    }
    else{
      backToBrush();
    }
  }

  document.getElementById("brush").className = "btn-circle selected";
  document.getElementById("eraser").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle";

  removeselector();
};

function colorselector() {
  if (document.getElementById("color-selection-container").style.opacity == 0) {
    document.getElementById("color-selection-container").style.opacity = 1;
    document.getElementById('color-selection-container').style.pointerEvents = 'auto';
      if(wastext == true){
        toText();
      }
      else{
        backToBrush();
      }
  } else {
    document.getElementById("color-selection-container").style.opacity = 0;
    document.getElementById('color-selection-container').style.pointerEvents = 'none';
    if(wastext == true){
      toText();
    }
    else{
      backToBrush();
    }
  }
}

function removeselector() {
  document.getElementById("color-selection-container").style.opacity = 0;
}

function changeToEraser(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 200;
  canvas.freeDrawingBrush.color = eraser;
  document.getElementById("eraser").className = "btn-circle selected";
  document.getElementById("brush").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle";
  removeselector();
};

function getcolor(elem){
 brush_color = $(elem).css("background-color");
 $(color).css("background-color",brush_color);
 canvas.freeDrawingBrush.color = brush_color;
}

function getcolorpost(elem){
canvas.clear();
canvascolor = $(elem).css("background-color");
canvas.setBackgroundColor(canvascolor, canvas.renderAll.bind(canvas));
eraser = canvascolor;
if(document.getElementById("eraser").className == "btn-circle selected") {
canvas.freeDrawingBrush.color = eraser;
}
}

canvas.on('object:added',function(){
  if(!isRedoing){
    h = [];
  }
  isRedoing = false;
});


function toText(){
  textsize = 11;
  canvas.isDrawingMode = false;
  newtext = true;
  wastext = true;
};

function backToBrush(){
  newtext = false;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.freeDrawingBrush.color = brush_color;
  document.getElementById("brush").className = "btn-circle selected";
  document.getElementById("eraser").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle";
  document.getElementById("brushIcon").src = "img/icon/brush.svg";
};

function toSelect(){
  canvas.isDrawingMode = false;
  document.getElementById("eraser").className = "btn-circle";
  document.getElementById("brush").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle selected";
  removeselector();
  newtext = false;
};

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    function writeToFile(fileName, data) {
        data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                        canvas.setBackgroundColor('rgba(255,0,0,1)', canvas.renderAll.bind(canvas));
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                        canvas.setBackgroundColor('rgba(0,255,0,1)', canvas.renderAll.bind(canvas));
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

    writeToFile('example.json', { foo: 'bar' });
}
