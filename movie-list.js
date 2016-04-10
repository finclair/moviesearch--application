//the event listener is placed to search button
document.getElementById('search-button').addEventListener('click', function () {
	var searchWord = document.getElementById('movie-input').value.trim();
	var omdbBaseUrlList = 'http://www.omdbapi.com/?s=';
	var urlForList = omdbBaseUrlList + searchWord;

    if (searchWord) {
        fetchMovieData(urlForList, logMovies);
    }

    function fetchMovieData(url, callback) {
        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === 4 && httpRequest.status === 200) {
				callback(JSON.parse(httpRequest.responseText));
			}
		};
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    function logMovies(movieList) {
		console.log(movieList);

		//this is for looping the results from parsed JSON -array
		document.getElementById('listing-header').innerHTML = 'Your search revealed following results..';
		movieList.Search.forEach(function(movie) {
			var movieElement = document.createElement('li');
			var title = document.createTextNode(movie.Title);
			movieElement.appendChild(title);
			movieElement.addEventListener('click', function() {
				showMovieDetails(movie.Title);
			}, false);
			document.getElementById('movie-listing').appendChild(movieElement);

			function showMovieDetails(movie) {
				console.log('We are now checking the movie details');

				var omdbBaseUrlSingle = 'http://www.omdbapi.com/?t=';
				var plot = '&plot=full'
				var UrlForSingle = omdbBaseUrlSingle + movie + plot;

				fetchMovieData(UrlForSingle, showMovieData);

				function showMovieData(movie) {
					document.getElementById('title-of-movie').innerHTML = movie.Title;
					document.getElementById('year-of-movie').innerHTML = movie.Year;
					document.getElementById('rate-of-movie').innerHTML = movie.Rated;
					document.getElementById('plot-of-movie').innerHTML = movie.Plot;
				}
			}
		});
    }
});






