document.addEventListener('DOMContentLoaded', function(){
    
    function renderMovies (movieArray) {
        let movieHTML = movieArray.map(function(currentMovie) {
           
         return `
             <div class="card cardStyle">
                <img class="card-img-top" src="${currentMovie.Poster}" alt="Movie Poster">
                    <div class="card-body">
                      <h5 class="card-title">${currentMovie.Title}</h5>
                        <p class="card-text">${currentMovie.Year}</p>
                           <button onclick=saveToWatchlist('${currentMovie.imdbID}') type="button" id="addBtn" class="btn btn-primary btn-block add-movie-btn"><strong>Add</strong></button>
                         </div>
                      </div>`
                     })
             return movieHTML.join('');
            }
    
        document.getElementById("search-form").addEventListener('submit', function (e){
            e.preventDefault();
                let form = e.target;
                    let formValue = form[0].value
                        let urlEncodedSearchString = encodeURIComponent(formValue)
                            axios.get("https://www.omdbapi.com/?apikey=997beeeb&s=" + urlEncodedSearchString)
                                .then(function (response){
                                    let searchObject = response.data.Search
                                      let updatedSearchObject = searchObject.map(function(img) {
                                        if (img.Poster === 'N/A') {
                                           return {
                                                 ...img,
                                                 Poster: "no_image.png"
                                                }
                                            } else {
                                            return img;
                                            }
                                        })
                    
                        let movieHTML = renderMovies(updatedSearchObject);
                     document.getElementById("movies-container").innerHTML = movieHTML;
                  })
                           
                })
                    
            });
                    
       
    
    function saveToWatchlist(imdbID) {
      
       axios.get("https://www.omdbapi.com/?apikey=997beeeb&i=" + imdbID)
        .then(function (response){
            let watchlistJSON = localStorage.getItem('watchlist');
                let watchlist = JSON.parse(watchlistJSON);
                    if (watchlist === null){
                           watchlist = [];
                           watchlist.push(response.data);
                           watchlistJSON = JSON.stringify(watchlist)
                                
                        localStorage.setItem('watchlist', watchlistJSON)
                        return
                    }
                        watchlist.push(response.data);
                       
                        let listArray = watchlist;
                        let uniquesArray = [];
                        let count = 0;
                        let found = false;

                        for (i = 0; i < listArray.length; i++){
                            for (y = 0; y < uniquesArray.length; y++){
                                if (listArray[i].Title === uniquesArray[y].Title){
                                    found = true;
                                    alert("This movie is already in your list!")
                                }
                            }
                            count++;
                            if (count === 1 && found === false){
                                uniquesArray.push(listArray[i]);
                            }
                            count = 0;
                            found = false;
                            
                            }
                            for (let i = 0; i < watchlist.length; i++){
                                if ( watchlist[i].Poster !== 'N/A'){
                                    
                            }
                            else watchlist[i].Poster = "no_image.png"
                            
                        }
                        watchlistJSON = JSON.stringify(watchlist)
                        localStorage.setItem('watchlist', watchlistJSON)
                        watchlistJSON = JSON.stringify(uniquesArray);
                        localStorage.setItem('watchlist', watchlistJSON)
                                                                            
            });
        }

   