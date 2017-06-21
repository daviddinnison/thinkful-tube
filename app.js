// 						STEP ONE --- design state

//url to search
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
//create template variable
let RESULT_HTML_TEMPLATE = (
	`<div class='youtube-video-result'>
			<p class="center">
				<a href = '' target="_blank">
					<img src = '' class = 'youtube-thumbnail'>
					<p class="video-title"></p>
				</a>
			</p>
			<p class="user-name"></p>
			<p class="description"></p>
	</div>`
	);


// 						STEP TWO --- state mod functions

//get data from API (getDataFromApi) 
function getDataFromAPI(searchTerm, callback) {
	const query = {
		part: "snippet",
		key: "AIzaSyBjvgxxnXB9raTECB2uaplFTH_43isPGR8",
		q: searchTerm, //should we use stringify for the searchTerm?
		per_page: 5
	}
	//console.log(query);
	//making the data reuqest and sending to our callback function
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}




//						STEP THREE --- render

//creates array of results (displayYoutubeSearchData)
function displayYoutubeSearchData(data) {
	console.log(data);
	
	//iterates array items and uses each rendered result for a post or link
	//multiple approaches towards itereating could use a for loop
	const results = data.items.map(function(item) {
		return renderResult(item);
	});
	$(".results").html(results);
}

//render results into html via template

function renderResult(videoData) {
	const template = $(RESULT_HTML_TEMPLATE);
	const thumbnailSource = videoData.snippet.thumbnails.medium.url;
	const videoId = 'https://www.youtube.com/watch?v=' + videoData.id.videoId;
	const videoTitle = videoData.snippet.title;
	const videoDesc = videoData.snippet.description;
	const userName = videoData.snippet.channelTitle;


	// <div class='youtube-video-result'>
	// 	<a href = '' target="_blank">
	// 		<img src = '' class = 'youtube-thumbnail'>
	// 		<p class="video-title"></p>
	// 		<p class="user-name"></p>
	//		<p class="description"></p>
	// 	</a>
	// </div>
	console.log(template);
	
	//thumbnail
	template.find('.youtube-thumbnail').attr('src', thumbnailSource);
	//thumbnail link
	template.find('a').attr('href', videoId);
	//video title
	template.find('.video-title').text(videoTitle);
	//username
	template.find('.user-name').text(userName);
	//video description
	template.find('.description').text(videoDesc);



	console.log(template);

	//template.find().text().attr();
	return template;
}



//						STEP FOUR ---- event listening

//listen for event submit ('.search-form')
function watchSubmit() {
	$(".search-form").submit(function(event) {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find(".query");
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



