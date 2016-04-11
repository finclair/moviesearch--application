function _(id) {
	return document.getElementById(id);
}

function fetchMovieData(url, callback) {
	_('loading-message').innerHTML = 'Loading...';
	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			_('loading-message').innerHTML = '';
			response = JSON.parse(httpRequest.responseText)
			callback(response);
		}
	};
	httpRequest.open('GET', url);
	httpRequest.send();
}

_('search').addEventListener('submit', function(e) {
	e.preventDefault();

	var searchWord = _('movie-input').value.trim();
	var omdbBaseUrlList = 'http://www.omdbapi.com/?s=';
	var urlForList = omdbBaseUrlList + searchWord;

    if (searchWord) {
        fetchMovieData(urlForList, logMovies);
    }

    function logMovies(movieList) {
		console.log(movieList);

		_('movie-listing').innerHTML = '';

		if (!movieList.Search) {
			return;
		}
		_('listing-header').innerHTML = 'Your search revealed following results..';

		movieList.Search.forEach(function(movie) {
			var movieElement = document.createElement('li');
			var title = document.createTextNode(movie.Title);
			movieElement.appendChild(title);
			movieElement.addEventListener('click', function() {
				showMovieDetails(movie.imdbID);
			}, false);
			_('movie-listing').appendChild(movieElement);

			function showMovieDetails(movieID) {
				var omdbBaseUrlSingle = 'http://www.omdbapi.com/?plot=full&i=';
				var urlForSingle = omdbBaseUrlSingle + movieID;

				fetchMovieData(urlForSingle, showMovieData);

				function showMovieData(movie) {
					_('title-of-movie').innerHTML = movie.Title;
					_('year-of-movie').innerHTML = movie.Year;
					_('rate-of-movie').innerHTML = movie.Rated;
					_('plot-of-movie').innerHTML = movie.Plot;
				}
			}
		});
    }
});