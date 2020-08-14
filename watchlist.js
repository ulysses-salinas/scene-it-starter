document.addEventListener('DOMContentLoaded', function () {
  function renderMovies(movieArray) {
    let movieHTML = movieArray.map(function (currentMovie) {
      return `
             <div class="card cardStyle ">
                    <img class="card-img-top" src="${currentMovie.Poster}" alt="Movie Poster">
                    <div class="card-body">
                      <h5 class="card-title">${currentMovie.Title}</h5>
                      <p class="card-text">${currentMovie.Year}</p>
                      <button onClick="window.location.reload();" type="button" value= ${currentMovie.imdbID} id="rmvBtn" class="btn btn-primary btn-block add-movie-btn "> Remove</btn>
                    </div>
                  </div>`;
    });
    return movieHTML.join('');
  }

  let watchlist = JSON.parse(localStorage.getItem('watchlist'));
  document.getElementById('movies-container').innerHTML = renderMovies(
    watchlist
  );
  $('button').click(clearFromWatchlist);

  function clearFromWatchlist(imdbID) {
    let emptyArr = [];
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].imdbID !== imdbID.target.value) {
        emptyArr.push(watchlist[i]);
      }
    }
    watchlistJSON = JSON.stringify(emptyArr);
    localStorage.setItem('watchlist', watchlistJSON);
  }
});
