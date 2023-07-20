import {URL, API_KEY} from '../config/const';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDkyZDI0NmYwM2ZlMzlkMDBkMzVjN2I3YTIxMTIwNyIsInN1YiI6IjY0Yjk1NzJlMzAwOWFhMDEzOTY3Y2ZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.POqr2eBXB3b0ihzicCLS8DwXKU4EYi4TVMlKYgR3J7A'
  }
};

/** 
 * fetch movies takes one param, "search". 
 *  * "search" is a search term which we will get from the TextInput 
 * component of HomeScreen.js screen, if the "search" is empty 
 * then we will fetch the list of movies from the movie/popular route of 
 * TMDB API which will give us a list of current popular movies,
 * and if the search term is not empty, we will fetch the data of
 * searched movie.
 */



export const fetchMovies = async(search) => {
  console.log('fetch movies', search);
  if(!search) {

  const movies = await fetch('https://api.themoviedb.org/3/movie/popular', options)
  .then(response => response.json())
  .then(response => {
    console.log('arr',[...response.results]);
    return [...response.results]
  })
  .catch(err => console.error(err));
  
  return movies;

  } else {
    console.log('in else');

  const searchMovies = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options)
  .then(response => response.json())
  .then(response => [...response.results])
  .catch(err => console.error(err));

  return searchMovies;
  }

};

export const fetchCredits = async(id) => {
const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    return response
  })
  .catch(err => console.error(err));
  console.log('CREW: ', res)

  const director = res.crew.find((dir) => dir.known_for_department === 'Directing');
  const credits = res;
  return {director: director, credits:credits};
};