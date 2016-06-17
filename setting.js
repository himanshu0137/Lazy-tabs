var storage = chrome.storage.local
document.addEventListener('DOMContentLoaded', function() {
    storage.get("links", function(result) {
        displaylinks(result["links"]);
    });
    document.getElementById('save').addEventListener('click', function() {
        storage.get("links", function(result) {
            savelinks(result["links"]);
        });
    });
});
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj) {
    if (obj == null )
        return true;
	if (obj[0] === 0)
		return true;
    if (obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}
function savelinks(q) {
    rawlinks = document.getElementById('input').value
    if (rawlinks.length < 1) {
        alert("No links provided");
        return;
    }
    //console.log(q);
    var links = rawlinks.split(",");
    var n = links.length;
    if (isEmpty(q)) {
        var obj = [];
        obj[0] = n;
        for (i = 1; i <= n; i++) {
            obj[i] = links[i - 1];
        }
        storage.set({
            "links": obj
        });
    } else {
        var obj = q;
        for (i = 0; i < n; i++) {
            obj.push(links[i]);
        }
        obj[0] += n;
        storage.set({
            "links": obj
        });
    }
    //console.log("Saved " + n.toString() + " links.");
	location.reload();
    alert("Saved " + n.toString() + " links.");
}

function displaylinks(q) {
    var box = document.getElementById("output");
	function callremovelinks() {
		removelinks(q,this.id);
	}
    //console.log(q);
    if (isEmpty(q)) {
        box.appendChild(document.createTextNode("No links :("));
    } else {
        var t = box.appendChild(document.createElement("table"));
        //t.style.border = "thick solid #000000";
        for (i = 0; i < q[0]; i++) {
            var tr = t.insertRow(i);
            var b = document.createElement("input");
            b.setAttribute("src", "cross.png");
            b.setAttribute("type", "image");
			b.setAttribute("id","rclick"+(i+1).toString());
            tr.insertCell(0).appendChild(b);
            tr.insertCell(1).appendChild(document.createTextNode(q[i + 1]));
			b.addEventListener("click",callremovelinks,false);
        }
    }
}
function removelinks(q,a) {
	var obj = q;
	var ind = parseInt(a.slice(6));
	alert(obj[ind]+" is removed");
	for(i=1;i<q[0];i++) {
		obj[i] = obj[i+1];
	}
	console.log(obj);
	obj[0] -= 1;
	obj.pop();
	storage.set({"links":obj});
	location.reload();
}
//chrome.bookmarks.getTree(function (result) { console.log(result); });