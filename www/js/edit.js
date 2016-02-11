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
  }
});

function changeToBrush(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.freeDrawingBrush.color = 'rgba(0,0,0,1)';
  document.getElementById("brush").className = "btn-circle selected";
  document.getElementById("eraser").className = "btn-circle";
};

function changeToEraser(){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 200;
  canvas.freeDrawingBrush.color = canvas.backgroundColor;
  document.getElementById("eraser").className = "btn-circle selected";
  document.getElementById("brush").className = "btn-circle";
};


canvas.on('object:added',function(){
  if(!isRedoing){
    h = [];
  }
  isRedoing = false;
});

function undo(){
  if(canvas._objects.length>0){
   h.push(canvas._objects.pop());
   canvas.renderAll();
  }
}

function redo(){

  if(h.length>0){
    isRedoing = true;
   canvas.add(h.pop());
  }
}

function toTexts(){
  textsize = 11;
  canvas.isDrawingMode = false;
  newtext = true;
}

function toTextm(){
  textsize = 15;
  canvas.isDrawingMode = false;
  newtext = true;
}

function toTextl(){
  textsize = 21;
  canvas.isDrawingMode = false;
  newtext = true;
}
