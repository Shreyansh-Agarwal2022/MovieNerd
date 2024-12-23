import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MovieCard from './MovieCard.jsx'
import './index.css'
import React, { useEffect, useState } from 'react'

function Category() {
    const jsonStrings = [`{"Title":"Jaane Tu... Ya Jaane Na","Year":"2008","Rated":"N/A","Released":"04 Jul 2008","Runtime":"155 min","Genre":"Comedy, Drama, Romance","Director":"Abbas Tyrewala","Writer":"Abbas Tyrewala","Actors":"Imran Khan, Genelia Deshmukh, Manjari Fadnnis","Plot":"Two best friends being convinced that they are not in love search for each other's love.","Language":"Hindi","Country":"India","Awards":"14 wins & 29 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNDUxYTFiODktNDI5NC00YmI1LThiMWUtN2FjYTU2ZTQ5ODQ1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.4/10"}],"Metascore":"N/A","imdbRating":"7.4","imdbVotes":"28,451","imdbID":"tt0473367","Type":"movie","DVD":"09 Dec 2017","BoxOffice":"$604,037","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Dangal","Year":"2016","Rated":"Not Rated","Released":"21 Dec 2016","Runtime":"161 min","Genre":"Action, Biography, Drama","Director":"Nitesh Tiwari","Writer":"Piyush Gupta, Shreyas Jain, Nikhil Mehrotra","Actors":"Aamir Khan, Sakshi Tanwar, Fatima Sana Shaikh","Plot":"Mahavir Singh Phogat, a former wrestler, decides to fulfill his dream of winning a gold medal for his country by training his daughters for the Commonwealth Games despite the existing social stigmas.","Language":"Hindi, English","Country":"India, United States","Awards":"41 wins & 38 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.3/10"},{"Source":"Rotten Tomatoes","Value":"89%"}],"Metascore":"N/A","imdbRating":"8.3","imdbVotes":"215,258","imdbID":"tt5074352","Type":"movie","DVD":"N/A","BoxOffice":"$12,391,761","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"2 States","Year":"2014","Rated":"Not Rated","Released":"18 Apr 2014","Runtime":"149 min","Genre":"Comedy, Drama, Romance","Director":"Abhishek Varman","Writer":"Chetan Bhagat, Abhishek Varman, Hussain Dalal","Actors":"Arjun Kapoor, Alia Bhatt, Amrita Singh","Plot":"This movie chronicles how Chetan met his wife and the difficulties they faced due to their cultural differences.","Language":"Hindi","Country":"India","Awards":"11 wins & 42 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMTUwNjQ3Nzk5N15BMl5BanBnXkFtZTgwMjI4MTgzMTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},{"Source":"Rotten Tomatoes","Value":"36%"}],"Metascore":"N/A","imdbRating":"6.9","imdbVotes":"27,278","imdbID":"tt2372678","Type":"movie","DVD":"N/A","BoxOffice":"$2,238,174","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Ae Dil Hai Mushkil","Year":"2016","Rated":"Not Rated","Released":"28 Oct 2016","Runtime":"158 min","Genre":"Drama, Music, Musical","Director":"Karan Johar","Writer":"Karan Johar, Niranjan Iyengar","Actors":"Ranbir Kapoor, Aishwarya Rai Bachchan, Anushka Sharma","Plot":"This story explores love - the shapes it takes, the ways it changes us and the exhilarating and often terrifying ride it takes us on. It is the journey of two characters, Alizeh and Ayan, as they navigate life, love and heartbreak.","Language":"Hindi","Country":"India","Awards":"25 wins & 41 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BOTc3ODMwMWItMjI0NC00YmM1LWIxZmItZDk2NjQ1NzQ1ZTVmXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.8/10"},{"Source":"Rotten Tomatoes","Value":"53%"},{"Source":"Metacritic","Value":"40/100"}],"Metascore":"40","imdbRating":"5.8","imdbVotes":"26,475","imdbID":"tt4559006","Type":"movie","DVD":"N/A","BoxOffice":"$4,264,983","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Agent Vinod","Year":"2012","Rated":"Not Rated","Released":"23 Mar 2012","Runtime":"157 min","Genre":"Action, Adventure, Thriller","Director":"Sriram Raghavan","Writer":"Arijit Biswas, Sriram Raghavan","Actors":"Kareena Kapoor, Saif Ali Khan, Ravi Kishan","Plot":"A series of seemingly unconnected events across the world leads to Agent Vinod undertaking a globe-trotting mission to discover why his colleague was murdered.","Language":"Hindi, Urdu","Country":"India","Awards":"1 win & 7 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BZDM5MTM5OTYtMWUxMC00NjcxLWEyNzAtYjIwYjVhYjAyZDc3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.2/10"},{"Source":"Rotten Tomatoes","Value":"40%"}],"Metascore":"N/A","imdbRating":"5.2","imdbVotes":"8,087","imdbID":"tt1395025","Type":"movie","DVD":"N/A","BoxOffice":"$698,210","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Aitraaz","Year":"2004","Rated":"Not Rated","Released":"12 Nov 2004","Runtime":"160 min","Genre":"Drama, Romance, Thriller","Director":"Abbas Alibhai Burmawalla, Mastan Alibhai Burmawalla","Writer":"Shiraz Ahmed, Aadesh K. Arjun, Shyam Goel","Actors":"Akshay Kumar, Kareena Kapoor, Priyanka Chopra Jonas","Plot":"A man is accused of sexual harassment by his former lover and he has to prove his innocence in order to restore his dignity.","Language":"Hindi","Country":"India","Awards":"7 wins & 16 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNjMxYjA2ODUtM2Q4Yy00ZmRhLTlmYTUtYTYzNmY2YjMxOWJhXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"}],"Metascore":"N/A","imdbRating":"6.6","imdbVotes":"10,773","imdbID":"tt0418460","Type":"movie","DVD":"N/A","BoxOffice":"$91,998","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"AK vs AK","Year":"2020","Rated":"TV-MA","Released":"24 Dec 2020","Runtime":"108 min","Genre":"Action, Comedy, Crime","Director":"Vikramaditya Motwane","Writer":"Anurag Kashyap, Vikramaditya Motwane, Avinash Sampath","Actors":"Anil Kapoor, Anurag Kashyap, Sonam Kapoor","Plot":"A filmmaker kidnaps the daughter of a movie star, and while the star searches for his daughter the director films the desperate search in real time for his next blockbuster movie.","Language":"Hindi","Country":"India","Awards":"4 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNDJkOTVkYTMtMTk2OC00YTkyLThjMGYtMTdiYWRjYTQ1YTYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},{"Source":"Rotten Tomatoes","Value":"69%"}],"Metascore":"N/A","imdbRating":"6.9","imdbVotes":"15,323","imdbID":"tt11651796","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Baaghi 2","Year":"2018","Rated":"Not Rated","Released":"30 Mar 2018","Runtime":"137 min","Genre":"Action, Crime, Drama","Director":"Ahmed Khan","Writer":"Sajid Nadiadwala, Jojo Khan, Abbaas Hierapurwala","Actors":"Jacqueline Fernandez, Disha Patani, Manoj Bajpayee","Plot":"A battle-hardened army officer squares off against drug lords and Russian henchmen to save his ex-lover's kidnapped daughter in the underbelly of Goa, India.","Language":"Hindi","Country":"India","Awards":"3 wins & 5 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BZWMwNzkzNDEtYTI0Ni00NDNiLWIxNDgtYTc0MDcxMzAzYTE2XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"4.8/10"},{"Source":"Rotten Tomatoes","Value":"33%"}],"Metascore":"N/A","imdbRating":"4.8","imdbVotes":"11,810","imdbID":"tt6843812","Type":"movie","DVD":"N/A","BoxOffice":"$1,319,579","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Baby","Year":"2015","Rated":"Not Rated","Released":"23 Jan 2015","Runtime":"159 min","Genre":"Action, Crime, Thriller","Director":"Neeraj Pandey","Writer":"Neeraj Pandey","Actors":"Akshay Kumar, Danny Denzongpa, Rana Daggubati","Plot":"An elite counter-intelligence unit learns of a plot, masterminded by a maniacal madman. With the clock ticking, it's up to them to track the terrorists' international tentacles and prevent them from striking at the heart of India.","Language":"Hindi, Nepali","Country":"India","Awards":"2 wins & 10 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BYTdhNjBjZDctYTlkYy00ZGIxLWFjYTktODk5ZjNlMzI4NjI3XkEyXkFqcGdeQXVyMjY1MjkzMjE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"}],"Metascore":"N/A","imdbRating":"7.9","imdbVotes":"61,025","imdbID":"tt3848892","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Brothers","Year":"2015","Rated":"Not Rated","Released":"14 Aug 2015","Runtime":"156 min","Genre":"Action, Drama, Sport","Director":"Karan Malhotra","Writer":"Gavin O'Connor, Cliff Dorfman, Ekta Pathak Malhotra","Actors":"Akshay Kumar, Sidharth Malhotra, Jackie Shroff","Plot":"After living many years together, two brothers discover that they are not blood related so square off in a mixed martial arts tournament to determine whose blood is stronger.","Language":"Hindi, English","Country":"India, United States","Awards":"1 win","Poster":"https://m.media-amazon.com/images/M/MV5BNzQ4Njg3Mjg5Nl5BMl5BanBnXkFtZTgwODE5MDg1NjE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.4/10"}],"Metascore":"N/A","imdbRating":"6.4","imdbVotes":"14,034","imdbID":"tt3802576","Type":"movie","DVD":"N/A","BoxOffice":"$613,775","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Bulbbul","Year":"2020","Rated":"TV-MA","Released":"24 Jun 2020","Runtime":"94 min","Genre":"Drama, Horror, Mystery","Director":"Anvita Dutt","Writer":"Anvita Dutt","Actors":"Triptii Dimri, Avinash Tiwary, Rahul Bose","Plot":"A man returns home after years to find his brother's child bride now grown up and abandoned, and his ancestral village plagued by mysterious deaths.","Language":"Hindi","Country":"India","Awards":"8 wins & 11 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMGQzYzFkMDYtYTNmZi00MDQ0LWFjZjItZjE3NGJjNjllY2UxXkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"},{"Source":"Rotten Tomatoes","Value":"83%"}],"Metascore":"N/A","imdbRating":"6.6","imdbVotes":"14,838","imdbID":"tt12393526","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Chhichhore","Year":"2019","Rated":"Not Rated","Released":"06 Sep 2019","Runtime":"143 min","Genre":"Comedy, Drama, Romance","Director":"Nitesh Tiwari","Writer":"Piyush Gupta, Nikhil Mehrotra, Nitesh Tiwari","Actors":"Sushant Singh Rajput, Shraddha Kapoor, Varun Sharma","Plot":"A tragic incident forces Anirudh, a middle-aged man, to take a trip down memory lane and reminisce his college days along with his friends, who were labelled as losers.","Language":"Hindi","Country":"India","Awards":"5 wins & 20 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BYjg2ZDI2YTYtN2EwYi00YWI5LTgyMWQtMWFkYmE3NmJkOGVhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.3/10"},{"Source":"Rotten Tomatoes","Value":"58%"}],"Metascore":"N/A","imdbRating":"8.3","imdbVotes":"64,798","imdbID":"tt9052870","Type":"movie","DVD":"N/A","BoxOffice":"$2,004,400","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Chote Nawab","Year":"2020","Rated":"N/A","Released":"16 Oct 2020","Runtime":"108 min","Genre":"Drama","Director":"Kumud Chaudhary","Writer":"Arshad Jafferey, Syed Tabrez Pasha","Actors":"Tulika Banerjee, Plabita Borthakur, Rajshri Deshpande","Plot":"13-year-old Junaid visits ancestral home in Lucknow, India for family wedding. Experiencing Indian culture for first time, he goes through teen rites of passage: first love, heartbreak, rebellion against patriarchal family values.","Language":"Hindi","Country":"India","Awards":"2 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNjIwODlhZWItYmQzOS00MWY4LThmZmEtMDBmMDBlYWRlMWI4XkEyXkFqcGdeQXVyNzI0NzQyNTk@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.5/10"}],"Metascore":"N/A","imdbRating":"5.5","imdbVotes":"312","imdbID":"tt8733760","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Cocktail","Year":"2012","Rated":"Not Rated","Released":"13 Jul 2012","Runtime":"146 min","Genre":"Comedy, Drama, Romance","Director":"Homi Adajania","Writer":"Imtiaz Ali, Sajid Ali","Actors":"Saif Ali Khan, Deepika Padukone, Diana Penty","Plot":"A love triangle between a guy and two girls, who are best friends but the complete opposite of one another.","Language":"Hindi","Country":"United Kingdom, India","Awards":"10 wins & 53 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMjYyY2U2MjUtNTdkYS00ZjM5LTllNTUtYWFkZGVhYWU1YjEzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.3/10"},{"Source":"Rotten Tomatoes","Value":"67%"}],"Metascore":"N/A","imdbRating":"6.3","imdbVotes":"15,422","imdbID":"tt2168910","Type":"movie","DVD":"N/A","BoxOffice":"$1,227,789","Production":"N/A","Website":"N/A","Response":"True"}`,
                        `{"Title":"Gully Boy","Year":"2019","Rated":"Not Rated","Released":"14 Feb 2019","Runtime":"154 min","Genre":"Drama, Music, Romance","Director":"Zoya Akhtar","Writer":"Zoya Akhtar, Reema Kagti, Vijay Maurya","Actors":"Ranveer Singh, Alia Bhatt, Siddhant Chaturvedi","Plot":"A coming-of-age story based on the lives of street rappers in Mumbai.","Language":"Hindi, English","Country":"India","Awards":"76 wins & 67 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BZDkzMTQ1YTMtMWY4Ny00MzExLTkzYzEtNzZhOTczNzU2NTU1XkEyXkFqcGdeQXVyODY3NjMyMDU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"65/100"}],"Metascore":"65","imdbRating":"7.9","imdbVotes":"44,284","imdbID":"tt2395469","Type":"movie","DVD":"N/A","BoxOffice":"$5,566,534","Production":"N/A","Website":"N/A","Response":"True"}`
                      ]


    const [genre,setGenre] = useState({
                                        "Comedy" : false,
                                        "Drama" : false,
                                        "Romance" : false,
                                        "Horror" : false,
                                        "Thriller" : false,
                                        "Action" : false,
                                        "Sci-Fi" : false,
                                        "Sport" : false,
                                        "Biography" : false,
                                        "Fantasy" : false,
                                        "Crime" : false,
                                        "Family" : false,
                                        "History" : false,
                                        "Adventure" : false,
                                        "Mystery" : false,
                                        "Musical" : false,
                                        "War" : false,
                            })

    const [movies,setMovies] = useState([])

    const flipValue = (e) => {
        e.preventDefault()
        const genreName = e.target.value

        setGenre(prevGenre => ({
            ...prevGenre,
            [genreName]: !prevGenre[genreName]  // Toggle the value of the selected genre
        }))
    }

    useEffect(() => {
        const loadMovies = async () => {
            try {
                let g = "Romance"
                for (let key in genre) {
                    if(genre[key] == true) {
                        g = key
                        break
                    }
                }
                const load = await fetch(`https://localhost:9090/api/movies/search_by_genre/${g}`)
                if (!load.ok) {
                    throw new Error('Resource Not Found')
                }
                const l = await load.json()
                setMovies(l)
            } catch (e) {
                console.log("Not able to load : ",e)
                setMovies(jsonStrings)
            }
        }

        //console.log("Render")
        loadMovies()
    },[genre])

    return (
        <>
            <Header />
            <div className="text-white mx-[5vw] min-h-[90vh]">
                <div className="px-[4vw] pt-[1vh] sm:pt-[2vh] pb-[2vh] sm:pb-[3vh] mb-[3vh] bg-gray-900 rounded-xl w-[86vw] sm:w-[60vw] mx-auto text-lg sm:text-xl font-medium font-['Poppins']">
                    <h1 className="text-xl sm:text-2xl font-semibold text-center my-[2vh]">Choose Genre for Movie</h1>
                    <div className="flex flex-wrap gap-3 sm:gap-5">
                        {Object.entries(genre).map((entry) => {
                            if(entry[1] == false) {
                                return <button className="bg-gray-100 text-black text-base rounded-3xl px-[14px] py-[6px]" onClick={flipValue} value={entry[0]} key={entry[0]}>{entry[0]}</button>
                            }
                            else {
                                return <button className="bg-red-600 text-white text-base rounded-3xl px-[14px] py-[6px]" onClick={flipValue} value={entry[0]} key={entry[0]}>{entry[0]}</button>
                            }
                        })}
                    </div>
                </div>
                <h1 className = "text-3xl sm:text-4xl font-['Poppins'] font-semibold text-center my-[3vh] sm:my-[5vh] sm:text-left">🍿 Movies Based on Genre</h1>
                <div className="flex flex-wrap gap-4">
                {
                    movies.length !== 0 ? (
                        movies.map((obj, index) => (
                                    <div className="mx-auto" key={index}>
                                        <MovieCard props={obj} />
                                    </div>
                        ))
                    ) : (
                        <h1 className="text-3xl sm:text-4xl font-bold mx-auto py-[10vh] text-[red] font-['SUSE']">No movie found</h1>
                    )
                }

                </div>
                <div className="h-[5vh]"></div>
            </div>
            <Footer />
        </>
    )
}

export default Category