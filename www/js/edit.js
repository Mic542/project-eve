var canvas = new fabric.Canvas('c');
var isRedoing = false;
var h = [];

canvas.isDrawingMode = !canvas.isDrawingMode;
canvas.setBackgroundColor('rgba(255,255,255,1)', canvas.renderAll.bind(canvas));

function changeToBrush(){
  canvas.freeDrawingBrush.color = 'rgba(0,0,0,1)';
};

function changeToEraser(){
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
