/* @HYUTS
*** Open playlist popup under video.
*** Change [needle]stings value to desired search below;
*** Running code will highlight full or partial matches
*/
// NOTES group playlist by user defined names like music, work, etc, maybe even pop it out of position
/* It's a variable that is used to search for the word "techno" in the URL. */
var needle = "drum".toLowerCase();
/* Selecting all elements with the selector `ytd-playlist-add-to-option-renderer #label` and then
filtering them to only those that contain the word `grime` in their innerHTML. Then it is setting
the background color of those elements to green. */
const results = [...document.querySelectorAll('ytd-playlist-add-to-option-renderer #label')].filter(e=>{
    if (e.innerHTML.toLowerCase().indexOf(needle) != -1) {
        return e.style.background = 'green';
    }// If I leave this else off it will help locate multiple searches
    else {
        e.style.background = '#212121';
    }
}
)
/* Getting all the elements with the selector `ytd-playlist-add-to-option-renderer #label` and then
mapping them to an object with the properties `name` and `ele`. */
printNames(needle, false);

function printNames(display = false) {
    const names = [...document.querySelectorAll('ytd-playlist-add-to-option-renderer #label')].map(e=>{
        return {
            name: e.innerHTML,
            'ele': e
        };
    }
    );
    if(display == true){
        /* A function that takes an argument `e` and then logs the `name` property of `e` to the console. */
        names.forEach(e=>console.log(e.name));
    }

}
// ?
// if(e.innerHTML.toLowerCase().indexOf(needle) != -1

function stylePopupModify() {
    // Push popup towards top of page
    document.querySelector("body > ytd-app > ytd-popup-container > tp-yt-paper-dialog").style.top = `25px`;
    // Get screen height and set playlist display to 80% in px
    document.querySelector("#playlists").style.maxHeight = `${parseInt(window.innerHeight * 0.8)}px`;
}

stylePopupModify();

// Get simple data about video
function detailsFormat(stringify = true) {
    // Video title
    var name = document.querySelector("#container > h1 > yt-formatted-string").innerHTML;
	// DEBUG I THINK ITS GENERES THAT IS PREVENTING JSON.PARSE FROM WORKING
    // Currently checked
    var playlists = [...document.querySelectorAll(".checked")].map(e=>e.parentElement.parentElement.innerText).join(',');
    // Href suffix
    var url = location.href.split('watch?v=')[1];
    var data = {
        'name': name,
        'playlists': playlists,
        'url': url,
		'time': new Date().toJSON()
    }
    return stringify ? JSON.stringify(data) : data;
}

var addToLocalStorageArray = function (name, value) {
	var existing = localStorage.getItem(name);
	existing = existing ? existing.split(',') : [];
	existing.push(value);
	localStorage.setItem(name, existing.toString());
	console.log(existing)
};

var storage_key = {'key':'_PLAYLIST_POPUP_','parse':false,'display':true, 'remove':false};
addToLocalStorageArray(storage_key.key, detailsFormat());
var output = storage_key.parse == false ? localStorage.getItem(storage_key.key) : JSON.parse(localStorage.getItem(storage_key.key));
if(storage_key.display == true) {
	console.log(output)
}
if(storage_key.remove == true) {
	localStorage.removeItem(storage_key.key)
}
