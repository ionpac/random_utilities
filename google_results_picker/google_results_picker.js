resultElementSelector = "div h3.LC20lb"

// left: 37, up: 38, right: 39, down: 40
var keys = {38: 1, 40: 1};
var select_search_key = "l";

function preventDefault(e) {
	e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
		get: function () { supportsPassive = true; } 
	}));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


function selectResult(newId){
	els = Array.from(document.querySelectorAll(resultElementSelector)).filter(function isValid(el) {
		return el == null || !el.hasAttribute('decode-data-ved') && isValid(el.parentElement) // ignore results in "asked questions"
	});
	
	if(newId >= els.length)
		newId = els.length-1
	if(newId < 0)
		return
	
	rp = document.getElementById("result-pointer")
	if(rp != null){
		rp.remove()
	}
	document.selectedResultId=newId
	el = els[newId]
	lnk = el.firstElementChild
	el.innerHTML = "<div id=\"result-pointer\" style=\"position:absolute;left:-15px;\">&gt;</div>" + el.innerHTML
	el.scrollIntoView({block: "center", behavior: "auto"});
}

function isSearchBarFocused() {
	return document.activeElement.name == "q"
}

document.addEventListener("keyup", event => {
	if(event.key == "escape") {
		//escape
		document.selectedResultId=null
		rp = document.getElementById("result-pointer")
		if(rp != null){
			rp.remove()
		}
		enableScroll()
	} else if(document.selectedResultId != null && !isSearchBarFocused()) {
		if(event.keyCode >= 49 && event.keyCode <= 57) {
			// number keys
			selectResult(event.keyCode-49)
		} else if(event.key == "ArrowUp") {
			// up
			selectResult(document.selectedResultId-1)
		} else if (event.key == "ArrowDown") {
			// down
			selectResult(document.selectedResultId+1)
		} else if (event.key == "Enter") {
			// enter
			rp = document.getElementById("result-pointer")
			if(rp != null) {
				var url = rp.parentElement.parentElement.href
				if(event.ctrlKey){
					var win = window.open(url,"_blank")
					win.blur()
					window.open().close()
				} else {
					document.location = url
				}
			}
		} else if(event.key == select_search_key) {
			sb = document.querySelector('input[name="q"]');
			sb.select();
		}
	} else if (event.key == "Tab") {
		document.selectedResultId=0
		selectResult(0)
		disableScroll()
	}
});
if(document.selectedResultId==null) {
	document.selectedResultId=0
	selectResult(0)
	disableScroll()
}