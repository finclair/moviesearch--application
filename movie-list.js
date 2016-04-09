
//the event listener is placed to search button 
document.getElementById('search-button').addEventListener('click', function () {
    console.log('Listing movies..');
	

	var searchWord = document.getElementById('movie-input').value;
	var httpRequest;
	
	var omdbBaseUrlList = 'http://www.omdbapi.com/?s='
	var Url = omdbBaseUrlList + searchWord;

    if (searchWord) {
        fetchMovieList(Url, logMovies);
    }

    function fetchMovieList(url, callback) {
        httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = callback;

        httpRequest.open('GET', Url);
        httpRequest.send();
    }

    function logMovies() {
        if(httpRequest.readyState === 4 && httpRequest.status === 200) {
			
            var movieList = JSON.parse(httpRequest.responseText);
			console.log(movieList);
			
			//this is for looping the results from parsed JSON -array
			document.getElementById('listing-header').innerHTML = 'Your search revealed following results..';
            movieList.Search.forEach(function(movie) {
                console.log(movie.Title);
				
				
				var btn = document.createElement('button');
				var title = document.createTextNode(movie.Title);
				btn.appendChild(title);
				//btn.setAttribute('id', indexCounter);
				btn.addEventListener('click', function() showMovieDetails(movie.Title), false);
				document.body.appendChild(btn);
				
				function showMovieDetails(movie) {
					console.log('We are now checking the movie details');
					
					var omdbBaseUrlSingle = 'http://www.omdbapi.com/?t=';
					var plot = '&plot=full'
					var Url2 = omdbBaseUrlSingle + movie + plot;
					
					fetchMovieData(Url2, showMovieData);
					
					  function fetchMovieData(Url2, callback) {
						httpRequest = new XMLHttpRequest();

						httpRequest.onreadystatechange = callback;

						httpRequest.open('GET', Url2);
						httpRequest.send();
					}
					
					function showMovieData() {
						if(httpRequest.readyState === 4 && httpRequest.status === 200) {
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
					
				}
				
            });
			
            console.log(movieList);
			
        }
    }

});






