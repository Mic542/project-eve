var db = new PouchDB('http://localhost:5984/dbname');

var addFunc = function(e) {

  var cell = {
      _id: this.id,
      _rev: this.rev,
      posX: this.style.left,
      posY: this.style.top,
      title: this.tit,
      tags: this.tag,
      canvas: this.can
  };

  db.put(cell, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
        location.reload();
    }
    else{
      console.log(err);
    }
  });

}

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
    btn.id = rows[k].doc._id;
    btn.rev = rows[k].doc._rev;
    btn.can = rows[k].doc.canvas;
    btn.tag = rows[k].doc.tags;
    btn.tit = rows[k].doc.title;
    btn.addEventListener("mouseup", addFunc);
    var t = document.createTextNode(rows[k].doc.title);
    btn.appendChild(t);
    document.body.appendChild(btn);
    btn.className = "drag";
    $( ".drag" ).draggable();
  }


}).catch(function (err) {
  console.log(err);
});
