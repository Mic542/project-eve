var db = new PouchDB('http://localhost:5984/dbname');

db.allDocs({
  include_docs: true,
}).then(function (result) {

var rows = result.rows;
console.log(rows);
  for (k in rows) {
    console.log(rows[k]);
    var btn = document.createElement("BUTTON");
    btn.position = "absolute";
    btn.left = rows[k].doc.posX;
    btn.top = rows[k].doc.posY;
    var t = document.createTextNode(rows[k].doc.title);

    btn.appendChild(t);
    document.body.appendChild(btn);
}

}).catch(function (err) {
  console.log(err);
});
