// 						STEP ONE --- design state

//url to search
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_EMBED = 'https://www.youtube.com/watch?v=';
const API_KEY = 'AIzaSyBjvgxxnXB9raTECB2uaplFTH_43isPGR8';
const PER_PAGE = 5;
const SEARCH_PART = 'snippet';

function htmlTemplate(data) {
	return `<div class="youtube-video-result">
			<p class="center">
				<a href="${YOUTUBE_EMBED}${data.id.videoId}" target="_blank">
					<img src="${data.snippet.thumbnails.medium.url}" class="youtube-thumbnail">
					<p class="video-title">${data.snippet.title}</p>
				</a>
			</p>
			<p class="user-name">${data.snippet.channelTitle}</p>
			<p class="description">${data.snippet.description}</p>
	</div>`
}

// 						STEP TWO --- state mod functions

//get data from API (getDataFromApi)
function getDataFromAPI(q, cb) {
	const query = {
		part: SEARCH_PART,
		key: API_KEY,
		q, //should we use stringify for the searchTerm?
		per_page: PER_PAGE
	}
	//console.log(query);
	//making the data reuqest and sending to our callback function
	$.getJSON(YOUTUBE_SEARCH_URL, query, cb);
}

//						STEP THREE --- render

//creates array of results (displayYoutubeSearchData)
function displayYoutubeSearchData(data) {
	//iterates array items and uses each rendered result for a post or link
	//multiple approaches towards itereating could use a for loop
	const results = data.items.map(function(item) {
		return htmlTemplate(item);
	});

	$(".results").html(results);
}

//						STEP FOUR ---- event listening

//listen for event submit ('.search-form')
function watchSubmit() {
	$(".search-form").submit(function(e) {
		e.preventDefault();
		const queryTarget = $(e.currentTarget).find(".query");
		const query = queryTarget.val();
		//console.log(query);
		//clear out input
		queryTarget.val("");
		getDataFromAPI(query, displayYoutubeSearchData);
	});
}

//find and store search query (variables to design later)
//call API data request (getDataFromApi) and has display data function (displayYoutubeSearchData) ready for rendering

//doc ready - stores event listener

$(document).ready(function(){
	watchSubmit();
})
