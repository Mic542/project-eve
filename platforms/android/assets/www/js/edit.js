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


var db = new PouchDB('http://localhost:5984/dbname');

if (sessionStorage.getItem('id') != null) {
  var curPost = db.get(sessionStorage.getItem('id')).then(function(result){
  canvas.loadFromJSON(result.canvas);
  sessionStorage.removeItem('id');
});
}


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


var errorHandler = function (fileName, e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + '): ' + msg);
}

    function writeToFile(data) {

      var TForm = document.getElementById('THE_form');
      var Tel = TForm.elements["title_field"];
      var Tagel = TForm.elements["tag_field"];
      var Data = JSON.stringify(data,null,null);
      var pos = Math.random() * 200;
      Data = Data.substr(0,Data.length -1)
      var holder = ',"title":"' + Tel.value + '","tag":"' + Tagel.value + '"}';
      Data = Data.concat(holder);
      var cell = {
          _id: 'foo' + new Date().toISOString(),
          canvas: Data,
          title: Tel.value,
          tags: Tagel.value,
          posX: pos,
          posY: pos,
          bgc: canvascolor
      };

      db.put(cell, function callback(err, result) {
        if (!err) {
          console.log('Successfully posted a todo!');
        }
      });

      db.info();
        fileName = Tel.value;
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([Data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    };

    function readFromFile(fileName, cb) {
        var pathToFile = cordova.file.externalDataDirectory + fileName;
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    cb(JSON.parse(this.result));
                };
                reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

function loadFromFile(filename){
    var fileData;
    var TForm = document.getElementById('THE_form');
    var Tel = TForm.elements["title_field"];
    var Tagel = TForm.elements["tag_field"];
    readFromFile(filename, function (data) {
        fileData = data;
        Tel.value = fileData.title;
        Tagel.value = fileData.tag;
        canvas.loadFromJSON(fileData);

    });
  }

  function back(){
    window.location.href = "Board.html";
  }
