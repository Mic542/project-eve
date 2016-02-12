var canvas = new fabric.Canvas('c');
var isRedoing = false;
var h = [];
var lastbrushsize;
var newtext= false;
var textsize;
var brush_color = 'rgba(0,0,0,1)';
var radius = 10;
var wastext = false;

fabric.Object.prototype.selectable = false;
canvas.isDrawingMode = !canvas.isDrawingMode;
canvas.setBackgroundColor('rgba(255,255,208,1)', canvas.renderAll.bind(canvas));

lastbrushsize = canvas.freeDrawingBrush.width;

canvas.on('mouse:up', function(event){
  var pointer = canvas.getPointer(event.e);
  if(canvas.isDrawingMode == false && newtext == true){
    canvas.add(new fabric.IText('Tap and Type', {
  fontFamily: 'comic sans',
  left: pointer.x,
  top: pointer.y,
  fontSize: textsize,
  fill: brush_color,
  selectable: true
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
    if(wastext == true){
      toText();
    }
    else{
      if(wastext == true){
        toText();
      }
      else{
        backToBrush();
      }
    }
  } else {
    document.getElementById("color-selection-container").style.opacity = 0;
    backToBrush();
  }
}

function removeselector() {
  document.getElementById("color-selection-container").style.opacity = 0;
}

function changeToEraser(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 200;
  canvas.freeDrawingBrush.color = canvas.backgroundColor;
  document.getElementById("eraser").className = "btn-circle selected";
  document.getElementById("brush").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle";
  removeselector();
};

function getcolor(elem){
 brush_color = $(elem).css("background-color");
 $(color).css("background-color",brush_color);
 canvas.freeDrawingBrush.color = brush_color;
 removeselector();
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
