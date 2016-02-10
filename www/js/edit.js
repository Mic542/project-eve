var canvas = new fabric.Canvas('c');
var isRedoing = false;
var h = [];
var lastbrushsize;

canvas.isDrawingMode = !canvas.isDrawingMode;
canvas.setBackgroundColor('rgba(255,253,208,1)', canvas.renderAll.bind(canvas));

lastbrushsize = canvas.freeDrawingBrush.width;

canvas.on('mouse:up', function(){
  if(canvas.isDrawingMode == false && newtext == true){
    canvas.add(new fabric.IText('Tap and Type', {
  fontFamily: 'arial black',
  left: 100,
  top: 100 ,
}));
newtext = false;
  }
});

function changeToBrush(){
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = 'rgba(0,0,0,1)';
  document.getElementById("eraser").className = "btn-circle";
  document.getElementById("brush").className = "btn-circle selected";
};

function changeToEraser(){
  canvas.freeDrawingBrush.width = 200;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = canvas.backgroundColor;
  document.getElementById("brush").className = "btn-circle";
  document.getElementById("eraser").className = "btn-circle selected";
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

function toText(){
  canvas.isDrawingMode = false;
  newtext = true;
}
