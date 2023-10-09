import React, { useEffect, useState } from 'react'
import { API_KEY } from './key'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey='+process.env.API_KEY


const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${URL}&s=${title}`)
        const data = await response.json()

        console.log(data)
        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('spiderman')
    }, [])


  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder='Search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
      </div>
      { movies?.length > 0 ? (
        <div className="container">
            {movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}            
        </div>
      ) : (
        <div className='empty'>
            <h2>No movies found</h2>
        </div>
      )}
      
    </div>
  )
}

export default App
