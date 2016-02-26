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
    var t = document.createTextNode(rows[k].doc.title);
    btn.appendChild(t);
    document.body.appendChild(btn);
    btn.className = "drag";
    $( ".drag" ).draggable();
}

}).catch(function (err) {
  console.log(err);
});
