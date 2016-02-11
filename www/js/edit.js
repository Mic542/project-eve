var canvas = new fabric.Canvas('c');
var isRedoing = false;
var h = [];
var lastbrushsize;
var newtext= false;
var textsize;

canvas.isDrawingMode = !canvas.isDrawingMode;
canvas.setBackgroundColor('rgba(255,255,208,1)', canvas.renderAll.bind(canvas));

lastbrushsize = canvas.freeDrawingBrush.width;

canvas.on('mouse:up', function(event){
  var pointer = canvas.getPointer(event.e);
  if(canvas.isDrawingMode == false && newtext == true){
    canvas.add(new fabric.IText('Tap and Type', {
  fontFamily: 'arial black',
  left: pointer.x,
  top: pointer.y,
  fontSize: textsize,
}));
newtext = false;
toSelect();
  }
});

function changeToBrush(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.freeDrawingBrush.color = 'rgba(0,0,0,1)';
  document.getElementById("brush").className = "btn-circle selected";
  document.getElementById("eraser").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle";
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
};

function changeToEraser(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 200;
  canvas.freeDrawingBrush.color = canvas.backgroundColor;
  document.getElementById("eraser").className = "btn-circle selected";
  document.getElementById("brush").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle";
};


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
};

function backToBrush(){
  newtext = false;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.freeDrawingBrush.color = 'rgba(0,0,0,1)';
};

function toSelect(){
  canvas.isDrawingMode = false;
  document.getElementById("eraser").className = "btn-circle";
  document.getElementById("brush").className = "btn-circle";
  document.getElementById("selectionTool").className = "btn-circle selected";
};
