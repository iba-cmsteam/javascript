//Listen for form submit
var Google = document.getElementById("myForm");
Google.addEventListener('submit', saveBookmark);


//save bookmark
function saveBookmark(e){

	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteUrl").value;


	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	//test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
			//Init array
			var bookmarks = [];
			//Add to array
			bookmarks.push(bookmark);
			//Set to local storage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else {
			//Get bookmarks from localstorage
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

			//Add bookmark to array
			bookmarks.push(bookmark);
			
			//перезапись back to local storage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById('myForm').reset();

	//re-fetch
	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
	//get Bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop throughout bookmarks
	for(var i = 0; i < bookmarks.length; i++){
			//remove from array
			if(bookmarks[i].url == url){
					bookmarks.splice(i, 1);
			}	
			//reset back to localstorage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

			//re-fetch
			fetchBookmarks();
	}
}


//Fetch bookmarks
function fetchBookmarks(){
	//Get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarkResults = document.getElementById('bookmarksResults');

	//Do OutPut
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="well">' + 
																		'<h3>' + name + 
																		'<a class="btn btn-default" target="_blank" href="'+'http://'+url+'">Visit</a>' +
																		'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
																		'</h3>' + 
																		'</div>';
	}
}	

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}