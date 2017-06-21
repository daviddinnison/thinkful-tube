// 						STEP ONE --- design state

//url to search
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
//create template variable
let RESULT_HTML_TEMPLATE = (`<div>It worked!</div>`);


// 						STEP TWO --- state mod functions

//get data from API (getDataFromApi) 
function getDataFromAPI(searchTerm, callback) {
	let query = {
		part: "snippet",
		key: "AIzaSyBjvgxxnXB9raTECB2uaplFTH_43isPGR8",
		q: searchTerm, //should we use stringify for the searchTerm?
		per_page: 5
	}

	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}




//						STEP THREE --- render

//creates array of results (displayYoutubeSearchData)
function displayYoutubeSearchData(data) {
	let results = data.items.map(function(item, index) {
		return renderResult(item);
	});
	console.log(data);
	$(".results").html(results);

}

//render results into html via template

function renderResult(result) {
	let template = $(RESULT_HMTL_TEMPLATE);
	//template.find().text().attr();
	return template;
}



//						STEP FOUR ---- event listening

//listen for event submit ('.search-form')
function watchSubmit() {
	$(".search-form").submit(function(event) {
		event.preventDefault();
		let queryTarget = $(event.currentTarget).find(".query");
		let query = queryTarget.val();
		//clear out input
		queryTarget.val("");
		getDataFromAPI(query, displayYoutubeSearchData);
		console.log("watch submit worked!")
	});

}

//find and store search query (variables to design later)
//call API data request (getDataFromApi) and has display data function (displayYoutubeSearchData) ready for rendering




//doc ready - stores event listener	

$(document).ready(function(){
	watchSubmit();
})



