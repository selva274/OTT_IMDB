import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState,useEffect } from 'react';
import "./App.css"
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import AddFavourites from './Components/AddFavourites';
import SearchBox from './Components/SearchBox';
import RemoveFavourites from './Components/RemoveFavourites';
const App = () => {
  const [movies,setMovies]=useState([]);
  const [searchValue,setSearchValue]=useState('');
  const[favourites,setFavourites]=useState([]);
  const getMovieRequest= async(searchValue)=>{
    const url=`https://www.omdbapi.com/?i=tt3896198&apikey=b1bd8b0a&s=${searchValue}`;
    const respone=await fetch(url);
    const responeJson=await respone.json();
    if(responeJson.Search){
      setMovies(responeJson.Search);
    }
  }
 useEffect(()=>{
  getMovieRequest(searchValue);
 },[searchValue])
 useEffect(()=>{
  const movieFavourite=JSON.parse(
    localStorage.getItem("react-movie-app-fav")
  );
  if(movieFavourite){
    setFavourites(movieFavourite);
  }
 },[])
const saveToLocalStorage=(items)=>{
  localStorage.setItem("react-movie-app-fav",JSON.stringify(items));
}
 const AddFavouriteMovie=(movie)=>{
  const newfavlist=[...favourites,movie];
  setFavourites(newfavlist);
  saveToLocalStorage(newfavlist);
 }
 const removeFavouriteMovie=(movie)=>{
  const newfavlist=favourites.filter((favourite)=>
    favourite.imdbID!==movie.imdbID
  )
  setFavourites(newfavlist);
  saveToLocalStorage(newfavlist); 
 }
  return (
    <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading="Movies"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
      <div className='row'>
          <MovieList movies={movies}
          handlefavclick={AddFavouriteMovie}
          favoriteComponent={AddFavourites}
           />
         
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading="Favourites"/>
      </div>
      <div className='row'>
          <MovieList movies={favourites}
          handlefavclick={removeFavouriteMovie}
          favoriteComponent={RemoveFavourites}
          />
      </div>
    </div>
  )
}

export default App;