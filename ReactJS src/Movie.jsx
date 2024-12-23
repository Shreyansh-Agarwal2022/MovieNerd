import Header from "./Header"
import Footer from "./Footer"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import API from './axios.jsx'
import loadErrorImage from './assets/loadError.png'

function Movie() {
    // Use : http://localhost:5173/movie?name=3+Idiots

    const [searchParams] = useSearchParams()
    const [movieData, setMovieData] = useState(null)
    const [movieID,setMovieID] = useState(0)
    const [userID,setUserID] = useState(-1)
    const [comments,setComments] = useState([])
    const [stars,setStars] = useState(5)
    const [movieComment,setMovieComment] = useState("")
    const [fav,setFav] = useState(false)

    const fetchMovie = async (movieName) => {
        try {
            //const response = await axios.get(`/movies?name=${encodeURIComponent(movieName)}`);
            const mid = await fetch(`https://localhost:9090/api/movies/get_mid/${encodeURIComponent(movieName)}`)
            const mID = await mid.json()
            if(mID.length < 1) {
                throw new Error('Resource Not Found')
            }
            const lmID = mID[0]
            setMovieID(lmID)
            
            const response = await fetch(`https://localhost:9090/api/movies/search_by_name/${lmID}`)
            const data = await response.json()
            setMovieData(data)
            //console.log(data)

            //setMovieData(JSON.parse(`{"Title":"Jaane Tu... Ya Jaane Na","Year":"2008","Rated":"N/A","Released":"04 Jul 2008","Runtime":"155 min","Genre":"Comedy, Drama, Romance","Director":"Abbas Tyrewala","Writer":"Abbas Tyrewala","Actors":"Imran Khan, Genelia Deshmukh, Manjari Fadnnis","Plot":"Two best friends being convinced that they are not in love search for each other's love.","Language":"Hindi","Country":"India","Awards":"14 wins & 29 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNDUxYTFiODktNDI5NC00YmI1LThiMWUtN2FjYTU2ZTQ5ODQ1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.4/10"}],"Metascore":"N/A","imdbRating":"7.4","imdbVotes":"28,451","imdbID":"tt0473367","Type":"movie","DVD":"09 Dec 2017","BoxOffice":"$604,037","Production":"N/A","Website":"N/A","Response":"True"}`))
        } catch (err) {
            console.log("Unable to fetch",err)
            setMovieData({Response:"False"})
        }
    }

    const fetchUID = async () => {
        const u = localStorage.getItem("uid")
        if(u && u != -1) {
            setUserID(u)
        }
    }

    const fetchUserReview = async (mid,uid) => {
        try {
            const response = await fetch(`https://localhost:9090/api/review/get_review/uid/${uid}/movie/${mid}`)
            if(!response.ok)
            {
                throw new Error('Review Not Found')
            }
            const data = await response.json()
            console.log(data)
            setMovieComment(data.content)
            setStars(data.rating)
            setFav(data.is_fav)
        } catch (e) {
            console.log("Unable to fetch user review",e)
        }
    }

    const fetchComments = async (mid) => {
        if(mid != 0) {
            try {
                const r = await fetch(`https://localhost:9090/api/review/movie/${mid}`)
                const rev = await r.json()
                for(let i = 0;i<rev.length;i++) {
                    try {
                        const reponse = await fetch(`https://localhost:9090/api/users/${rev[i].id}`)
                        const dta = await reponse.json()
                        rev[i].n = await dta.name
                    } catch (e) {
                        console.log("name not fetched")
                    }
                }
                console.log(rev)
                setComments(rev)
            } catch (e) {
                console.log("Comments not loaded",e)
            }
        }
    }

    const renderFavourite = () => {
        return fav ? (
            <button
              className="bg-red-600 text-white rounded-xl sm:px-[40px] px-[30px] sm:py-[15px] py-[10px] text-2xl font-bold mb-[20px]"
              onClick={submitFavourite}
            >
              Remove from Favourite
            </button>
          ) : (
            <button
              className="bg-lime-600 text-white rounded-xl sm:px-[40px] px-[30px] sm:py-[15px] py-[10px] text-2xl font-bold mb-[20px]"
              onClick={submitFavourite}
            >
              Add to Favourite
            </button>
          )
    }

    useEffect(() => { 
        const runAsyncFunctions = async () => {
            const movieName = searchParams.get('name').replaceAll(/\+/g, ' ')
            
            if (movieName) {
                const uid = await fetchUID()
                fetchMovie(movieName)
                if(movieID != 0) {
                    console.log("Oh T")
                    if (userID !== -1) {
                        await fetchUserReview(movieID, userID)
                    }
                    console.log(movieID)
                    await fetchComments(movieID)
                }
            }
        }
    
        runAsyncFunctions()
    }, [movieID])
    

    const handleStarsChange = (e) => {
        setStars(e.target.value)
    }

    const submitFavourite = async (e) => {
        e.preventDefault()
        setFav(!fav)
        try {
            const response = API.post(`/review/is_favourite/user/${userID}/movie/${movieID}`)
            alert("Done for favourite")
        } catch (e) {
            console.log(e1)
        }
    }

    const submitRating = async (e) => {
        e.preventDefault()
        const rate = stars;
        
        try {
            const response = await API.put(
                `/review/movie/${rate}/mid/${movieID}/uid/${userID}`
            )
            alert("Rating submitted successfully:", response.data)
        } catch (error) {
            console.error("Error submitting rating:", error)
        }
    }

    const submitComment = async (e) => {
        e.preventDefault()

        const reviewData = {
            content: movieComment,
        } 
        try {
            console.log(`/review/movie/${movieID}/user/${userID}/create`, reviewData)
            const response = await API.put(
                `/review/movie/${movieID}/user/${userID}/create`, 
                reviewData
            )
            alert("Review submitted successfully:", response.data)
        } catch (e) {
            console.log("comment notsubmitted",e)
        }
    }

    function renderUser() {
        if (userID && userID !== -1) {
            return (
                <>
                    <div className="flex justify-center mt-[5vh] mb-[2vh]">
                        {renderFavourite()}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-['Poppins'] font-semibold text-center">Your Rating</h1>
                    <div className="flex space-x-5 mt-[20px] mb-[10px] justify-center">
                        <input type="range" min="1" max="10" value={stars} onChange={handleStarsChange} className="sm:w-[320px] w-[200px]"/>
                        <h1 className = "font-semibold text-xl sm:text-2xl">{stars}⭐</h1>
                    </div>
                    <div className="flex justify-center">
                        <button className = "bg-gray-300 text-black rounded-xl sm:p-[8px] p-[6px] text-lg font-['Poppins'] mb-[20px]" onClick={submitRating}>Submit</button>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-['Poppins'] font-semibold text-center">Your Comment</h1>
                    <div className="flex justify-center my-[20px]">
                        <input type="text" placeholder="Enter your comment for this movie" value={movieComment} onChange={(e) => {setMovieComment(e.target.value)}} className="text-black text-center w-[80vw] sm:w-[60vw] p-[10px]"></input>
                    </div>
                    <div className="flex justify-center">
                        <button className = "bg-gray-300 text-black rounded-xl sm:p-[8px] p-[6px] text-lg font-['Poppins'] mb-[20px]" onClick={submitComment}>Submit</button>
                    </div>
                </>
            )
        }
    }

    if(movieData == null) {
        return (
            <>
                <Header />
                <div className="text-white h-[65vh] sm:h-[90vh] flex items-center justify-center">
                    <h1 className="text-4xl sm:text-6xl font-['Poppins'] font-semibold">Loading Data ...</h1>
                </div>
                <Footer />
            </>
        )
    }
    else if(movieData.Response == "False")
        return (
            <>
                <Header />
                <div className="text-white h-[65vh] sm:h-[90vh]">
                    <img src = {loadErrorImage} className="w-[75vw] sm:w-[25vw] h-auto mx-auto my-[12vh] sm:my-[7vh]" alt="Load Error Image"></img>
                    <h1 className = "text-3xl sm:text-4xl font-['Poppins'] font-semibold text-center">Error in Loading Data</h1>
                </div>
                <Footer />
            </>
        )
    else {
        return (
            <>
                <Header />
                <div className="text-white mx-[5vw] font-['SUSE']">

                    <div className = "sm:flex sm:justify-between">
                        <div>
                            <h1 className = "text-4xl sm:text-5xl font-['Poppins'] font-semibold text-center my-[1vh] sm:my-[2vh] sm:text-left">{movieData.Title}</h1>

                            <div className="flex gap-6 sm:gap-8 justify-center text-xl sm:justify-normal mb-[1vh] sm:mb-[3vh] text-yellow-400">
                                <h2>{movieData.Year}</h2>
                                <h2>{(movieData.Rated == "N/A") ? "UP-13" : movieData.Rated}</h2>
                                <h2>{movieData.Runtime}</h2>
                            </div>
                        </div>

                        <div className = "text-center my-auto sm:mr-[5vw] pb-[2vh] sm:bg-gray-800 sm:p-[20px] sm:rounded-3xl mx-auto text-gray-400 sm:text-white">
                            <h2 className="text-3xl font-['Poppins'] font-semibold">Rating</h2>
                            <h3 className="text-xl font-semibold">{movieData.imdbRating} ⭐ {"("+movieData.imdbVotes+" votes)"}</h3>
                        </div>
                    </div>

                    
                    <div className = "sm:flex">
                        <div className="sm:my-auto sm:w-[38vw]">
                            <div className ="h-[350px] w-[250px] sm:h-[575px] sm:w-[400px] bg-cover mx-auto" style={{"backgroundImage":`url(${movieData.Poster})`}}></div>
                        </div>

                        <div className="my-[3vh] text-center sm:w-[50vw] mx-auto sm:mx-[5vw]">
                            <div className = "my-[2vh] sm:mt-0">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Language</h2>
                                <h3 className="text-xl">{movieData.Language}</h3>
                            </div>
                            
                            <div className = "my-[2vh]">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Release Date</h2>
                                <h3 className="text-xl">{movieData.Released}</h3>
                            </div>

                            <div className = "my-[2vh]">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Actors</h2>
                                {movieData.Actors.split(", ").map((actorName,index) => {
                                    return <h3 key={index} className="text-xl">{actorName}</h3>
                                })}
                            </div>

                            <div className = "my-[2vh]">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Director</h2>
                                <h3 className="text-xl">{movieData.Director}</h3>
                            </div>

                            <div className = "my-[2vh]">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Writer</h2>
                                <h3 className="text-xl">{movieData.Writer}</h3>
                            </div>
                            
                            <div className = "my-[2vh]">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Genre</h2>
                                <div className = "flex space-x-7 sm:space-x-10 justify-center">
                                    {movieData.Genre.split(", ").map((actorName,index) => {
                                        return <h3 key={index+10} className="text-xl">{actorName}</h3>
                                    })}
                                </div>
                            </div>
                            
                            <div className = "my-[2vh]">
                                <h2 className="text-2xl font-['Poppins'] font-semibold">Description</h2>
                                <p className="text-xl">{movieData.Plot}</p>
                            </div>
                        </div>
                    </div>

                    {renderUser()}

                    <div className="bg-gray-600 px-[5vw] sm:px-[3vw] rounded-xl pb-[2vh] sm:pb-[3vh]">
                        <h1 className="text-2xl sm:text-3xl font-['Poppins'] font-semibold py-[2vh] sm:py-[3vh]">Comments Section</h1>
                        {comments.map((commentObj) => {
                            if(commentObj.content && commentObj.content.trim() !== "") {
                                return (
                                 <div className="my-[3vh]" key={commentObj.rid}>
                                    <h1 className="text-red-500">{commentObj.n}</h1>
                                    <p>{commentObj.content}</p>
                                </div>
                            ) }
                        })}
                    </div>

                    <div className="mb-[2vh]"></div>

                </div>
                <Footer />
            </>
        )
        //  Follow for Range Slider : https://benhoneywill.com/building-a-range-slider-component-in-react/
    }
}

export default Movie