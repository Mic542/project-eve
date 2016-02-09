var canvas = new fabric.Canvas('c');
var isRedoing = false;
var h = [];
var lastbrushsize;

canvas.isDrawingMode = !canvas.isDrawingMode;
canvas.setBackgroundColor('rgba(255,255,255,1)', canvas.renderAll.bind(canvas));

lastbrushsize = canvas.freeDrawingBrush.width;

function changeToBrush(){
  canvas.freeDrawingBrush.width = lastbrushsize;
  canvas.freeDrawingBrush.color = 'rgba(0,0,0,1)';
};

function changeToEraser(){
  canvas.freeDrawingBrush.width = 200;
  canvas.freeDrawingBrush.color = canvas.backgroundColor;
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
