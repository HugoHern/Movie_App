import React, {useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import './App.css';
//import searchIcon from './search.svg'

// c19fdc19 -API KEY

const API_KEY ="c19fdc19"

//static data for guardians of the galaxy to help code.
const movie1 = {
  "Title": "Guardians of the Galaxy Vol. 2",
  "Year": "2017",
  "Rated": "PG-13",
  "Released": "05 May 2017",
  "Runtime": "136 min",
  "Genre": "Action, Adventure, Comedy",
  "Director": "James Gunn",
  "Writer": "James Gunn, Dan Abnett, Andy Lanning",
  "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista",
  "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
  "Language": "English",
  "Country": "United States",
  "Awards": "Nominated for 1 Oscar. 15 wins & 59 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
  "Ratings": [
      {
          "Source": "Internet Movie Database",
          "Value": "7.6/10"
      },
      {
          "Source": "Rotten Tomatoes",
          "Value": "85%"
      },
      {
          "Source": "Metacritic",
          "Value": "67/100"
      }
  ],
  "Metascore": "67",
  "imdbRating": "7.6",
  "imdbVotes": "655,156",
  "imdbID": "tt3896198",
  "Type": "movie",
  "DVD": "22 Aug 2017",
  "BoxOffice": "$389,813,101",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"

}

function App() {
  const [movies, setMovies] = useState([]) // empty array to hold state for movies
  const [searchTerm, setSearchTerm] = useState('') //empty state to hold our search query

  //pointer function that accepts a title or string as a parameter to fetch api 
  //this will return the object 'Search' from the omdb api
  const searchMovies = async (title) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    setMovies(data.Search)
  }

  // this will re-render page whenever the state of a certain variable changes
  useEffect(() => {
    searchMovies('Spiderman')

  }, [])

  return (
    <div className="App">
      <h1>ReelDeal</h1>

      <div className='search'>
        <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src='SearchIcon' alt="search" onClick={() => searchMovies(searchTerm)}/> {/* will act as a button*/} 
      </div>

      {/*if there is data in the state, render the movie component - if not - render error message*/}
      {
        movies?.length > 0
        ?(  <div className='container'>
               {movies.map((movie) => (
                <MovieCard movie={movie}/>
               ))}
          </div> )
        : (
          <div className='empty'>
            <h2>No movies found.</h2>
          </div>)
      }

      </div>
  );
}

export default App;
