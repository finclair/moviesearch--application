
//the event listener is placed to search button 
document.getElementById('search-button').addEventListener('click', function () {
    console.log('Listing movies..');
	
	var searchWord = document.getElementById('movie-input').value;
	var httpRequest;
	
	var omdbBaseUrlList = 'http://www.omdbapi.com/?s='
	var UrlForList = omdbBaseUrlList + searchWord;

    if (searchWord) {
        fetchMovieData(UrlForList, logMovies);
    }

    function fetchMovieData(url, callback) {
		console.log('used the function fetchMovieData');
        httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === 4 && httpRequest.status === 200) {
				callback();
			}
		};
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    function logMovies() {
		var movieList = JSON.parse(httpRequest.responseText);
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

				function showMovieData() {
					var movie = JSON.parse(httpRequest.responseText);
					var rated = JSON.stringify(movie.Rated);
					var title = JSON.stringify(movie.Title);
					var year = JSON.stringify(movie.Year);
					var rated = JSON.stringify(movie.Rated);
					var plot = JSON.stringify(movie.Plot);

					document.getElementById('title-of-movie').innerHTML = title;
					document.getElementById('year-of-movie').innerHTML = year;
					document.getElementById('rate-of-movie').innerHTML = rated;
					document.getElementById('plot-of-movie').innerHTML = plot;
				}
			}
		});
    }
});






