document.addEventListener('DOMContentLoaded', OpenInNewTab());
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
function OpenInNewTab() {
    chrome.storage.local.get("links", function(n) {
        if (isEmpty(n)) {
            document.getElementById("main").innerHTML = "<h1>Add some links first from the options</h1>";
            return 0;
        } else {
            var k = n["links"];
            for (i = 1; i <= k[0]; i++) {
                console.log("Opening " + k[i]);
                chrome.tabs.create({
                    url: k[i]
                });
            }
            return 1;
        }
    });
}
