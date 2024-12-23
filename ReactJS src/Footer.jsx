function Footer() {
    return (
        <>
            <div className = "h-[220px] bg-gray-600 font-['Poppins'] text-white">
                <div className = "h-[2px] w-full bg-red-600"></div>
                <div className = "w-full flex flex-col space-y-[20px] sm:space-y-[30px] py-[20px]">
                    <h1 className = "font-bold text-2xl sm:text-3xl m-auto drop-shadow-red">ISDL Project</h1>
                    <h1 className = "font-semibold text-xl sm:text-2xl m-auto">Made By</h1>
                    <h1 className = "font-medium text-base sm:text-lg m-auto">Kanishk - Laukik - Sanidhya - Shreyansh</h1>
                </div>
            </div>
        </>
    )
}

export default Footer