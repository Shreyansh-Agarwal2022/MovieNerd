import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

function MovieCard({props}) {
    const movieObj = JSON.parse(props)
    if(movieObj.Response == "False") {
        return (
            <>
                <div className="h-[300px] w-[175px] sm:h-[600px] sm:w-[350px] bg-white">
                    <h1 className="text-white">Movie Not Found</h1>
                </div>
            </>
        )
    }
    const posterURL = movieObj.Poster
    let genre = movieObj.Genre.split(",").join(" - ")
    return(
        <>
            <Link to = {`/movie?name=${movieObj.Title.replaceAll(" ","+")}`}>
                <div className="w-[175px] sm:w-[350px] bg-black">
                    <div className ="h-[200px] w-[175px] sm:h-[400px] sm:w-[350px] bg-cover rounded-lg zoom" style={{"backgroundImage":`url(${posterURL})`}}></div>
                    <div className="my-[5px] p-[5px] sm:my-[10px] sm:p-[10px] font-['SUSE'] text-white border-2 rounded-lg">
                        <h1 className = "font-bold sm:font-black sm:text-2xl text-sm text-wrap">{movieObj.Title}</h1>
                        <h2 className = "font-normal text-xs sm:text-base">{movieObj.Released}</h2>
                        <h2 className = "font-normal text-xs sm:text-base text-red-500 text-wrap">{genre}</h2>
                        <h2 className = "font-normal text-xs sm:text-base text-yellow-400">{movieObj.imdbRating}⭐ / 10</h2>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default MovieCard;