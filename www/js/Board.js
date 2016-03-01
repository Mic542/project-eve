var db = new PouchDB('http://localhost:5984/dbname');

db.allDocs({
  include_docs: true,
}).then(function (result) {

var rows = result.rows;
console.log(rows);
  for (k in rows) {
    console.log(rows[k]);
    var btn = document.createElement("div");
    btn.style.position = "absolute";
    btn.style.left = rows[k].doc.posX;
    btn.style.top = rows[k].doc.posY;
    btn.style.border = "medium solid #000000";
    btn.style.width = "90px";
    btn.style.height = "90px";
    btn.style.backgroundColor= rows[k].doc.bgc;
    btn.style.border = rows[k].doc.bgc;
    btn.id = rows[k].doc._id;
    btn.rev = rows[k].doc._rev;
    btn.can = rows[k].doc.canvas;
    btn.tag = rows[k].doc.tags;
    btn.tit = rows[k].doc.title;
    btn.bgc = rows[k].doc.bgc;
    var t = document.createTextNode(rows[k].doc.title);
    btn.appendChild(t);
    document.body.appendChild(btn);
    btn.className = "drag";
    $( ".drag" ).draggable();
  }
  setTimeout(function() {
          document.getElementById('save').addEventListener("click", function() {addFunc(document.getElementsByClassName("drag"));}, false);
      }, 10);

}).catch(function (err) {
  console.log(err);
});

function addFunc(posts) {

  for( var i = 0; i < posts.length; i++){
 var cell = {
     _id: posts[i].id,
     _rev: posts[i].rev,
     posX: posts[i].style.left,
     posY: posts[i].style.top,
     title: posts[i].tit,
     tags: posts[i].tag,
     canvas: posts[i].can,
     bgc: posts[i].bgc
 };

 db.put(cell, function callback(err, result) {
   if (!err) {
     console.log('Successfully posted a todo!');
     if(i == posts.length -1){
       location.reload();
     }
   }
   else{
     console.log(err);
   }
 });
 }
};
