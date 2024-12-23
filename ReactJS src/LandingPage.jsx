import LandingImage from "./assets/landingImage.png"

function LandingPage() {
    //<img src = {LandingImage} alt = "Landing Image" />
    return (
        <>
            <div className = "flex flex-col sm:flex-row justify-center h-[70vh] mb-[5vh] sm:mb-[15vh]">
                <h1 className="text-center text-white sm:w-[40vw] text-wrap text-5xl sm:text-6xl my-[15vw] mx-[3vw] sm:my-auto font-['Poppins'] font-semibold">Discover your next binge watch in seconds</h1>
                <div className="m-[5vw] sm:m-0 sm:w-[55vw] sm:h-[70vh] flex flex-col justify-center">
                    <img src={LandingImage} alt="landing page image" width="800px" height="534px" className="sm:w-[55vw] h-auto"/>
                </div>
            </div>
        </>
    )
}

export default LandingPage