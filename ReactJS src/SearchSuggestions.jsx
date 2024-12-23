import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function SearchSuggestions({query}) {
    const defaultRes = ['3 Idiots','Jab We Met','Drishyam','Bajrangi Bhaijaan','English Vinglish']
    const [res,setRes] = useState(defaultRes)

    useEffect(() => {
        if (query && query.length >= 3) {
            const fetchSuggestions = async () => {
                try {
                    const response = await fetch(`https://localhost:9090/api/movies/search_by_partial_name/${query}`)
                    console.log(`https://localhost:9090/api/movies/search_by_partial_name/${query}`)
                    if (!response.ok) {
                        throw new Error('Resource Not Found')
                    }
                    try {
                        const data = await response.json()
                        console.log(data,query)
                        setRes(data)
                    }
                    catch (e) {
                        setRes(defaultRes)
                    }
                          // change it to res
                } catch (error) {
                    console.log('Error fetching suggestions: Movie Not Found')
                    setRes(defaultRes)
                }
            }
    
            fetchSuggestions()

        } else {
            setRes(defaultRes)
        }
    }, [query])

    return (
        <div className = "text-white mx-auto w-[80vw] sm:w-[50vw] bg-gray-700 mt-[2px] py-[10px]">
            <ul>
                {res.map((suggestion, index) => {
                    return(
                        <Link to = {`/movie?name=${suggestion.replaceAll(" ","+")}`}>
                            <li className = "py-[5px] sm:py-[6px] px-[30px] font-semibold hover:text-red-400" key = {index}>{suggestion}</li>
                        </Link>
                )})}
            </ul>
        </div>
    )
}

export default SearchSuggestions