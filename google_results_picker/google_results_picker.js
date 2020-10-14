resultElementSelector = "div h3.LC20lb"

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

document.onkeyup=function(event){
	if(event.keyCode==27) {
		//escape
		document.selectedResultId=null
		rp = document.getElementById("result-pointer")
		if(rp != null){
			rp.remove()
		}
	}
	if(document.selectedResultId != null && !isSearchBarFocused()) {
		if(event.keyCode >= 49 && event.keyCode <= 57) {
			// number keys
			selectResult(event.keyCode-49)
		}
		if(event.keyCode==38 || event.keyCode==37) {
			// up or left arrow
			selectResult(document.selectedResultId-1)
		}
		if(event.keyCode==40 || event.keyCode==39) {
			// down or right arrow
			selectResult(document.selectedResultId+1)
		}
		if(event.keyCode==13) {
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
		}	
	}
}
if(document.selectedResultId==null) {
document.selectedResultId=0
selectResult(0)
}