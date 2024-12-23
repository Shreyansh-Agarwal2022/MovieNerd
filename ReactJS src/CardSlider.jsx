function CardSlider({ title,children }) {
    /*const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };*/
    return(
        <>
            <h1 className = "text-xl sm:text-4xl text-white px-[5vw] sm:px-[2vw] font-['Poppins'] font-semibold">🎬 {title}</h1>
            <div className = "flex overflow-x-auto space-x-8 mx-[5vw] my-[15px] sm:mx-[2vw] sm:my-[30px]">
                {children}
            </div>
            {/*
                <div className="flex items-center justify-between mt-4 relative bottom-[300px]">
                    <button className="w-6 h-6 rounded-full bg-gray-300  relative right-0" onClick={handlePrev}>&lt;</button>
                    <button className="w-6 h-6 rounded-full bg-gray-300 relative left-0" onClick={handleNext}>&gt;</button>
                </div>
            */}
            <div className = "mb-[30px] sm:mb-[50px]"></div>
        </>
    )
}

export default CardSlider