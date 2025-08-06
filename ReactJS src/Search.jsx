import { useState, useEffect } from 'react';
import SearchSuggestions from './SearchSuggestions';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './index.css';

function Search() {
    const [inputValue, setInputValue] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(inputValue);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    return (
        <>
            <Header />
            <div className="h-[90vh] sm:h-[90vh] text-white flex flex-col justify-center px-[10vw] pb-[10vh]" style={{backgroundImage: 'linear-gradient(to bottom, rgba(70,0,0,0), rgba(70,0,0,1))'}}>
                <h1 className="font-['Poppins'] font-semibold text-center text-2xl sm:text-4xl mx-auto my-[5vh] sm:my-[6vh]">What Movie Are You Looking For?</h1>
                <input
                    type="text"
                    value={inputValue}
                    className="w-[80vw] sm:w-[50vw] mx-auto text-black px-[20px] py-[6px] sm:py-[10px] text-lg text-center font-semibold bg-white"
                    placeholder="Type Movie Name"
                    onChange={handleInputChange}
                />
                <SearchSuggestions query={debouncedQuery} />
            </div>
            <Footer />
        </>
    );
}

export default Search;
