import Header from './Header.jsx'
import Footer from './Footer.jsx'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import API from "./axios.jsx"

function Profile() {
    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [userID,setUserID] = useState(-1)
    const [temp,setTemp] = useState(-1)
    const [fav,setFav] = useState([])
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate()
    
    const changeD = (e) => {
        e.preventDefault()
        if(userID != -1) {
            try {
                API.put(`/users/${userID}`, {email: userEmail, name: userName, password: userPassword})
                localStorage.setItem("uid",userID)
                localStorage.setItem("namep",userPassword)
                localStorage.setItem("email",userEmail)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const loadProfile = () => {
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("namep")
        const uid = localStorage.getItem("uid")
        if(uid && userID === -1) {
            setUserID(uid)
        }
        if(password) {
            setUserPassword(password)
        }
        if(email) {
            setUserEmail(email)
        }
    }

    const loadFavourites = async () => {
        try {
            const uid = localStorage.getItem("uid")
            const response = await fetch(`https://localhost:9090/api/review/get_user/${uid}`)
            const data = await response.json()
            console.log(data)
            setFav(data)
        } catch (e) {
            console.log(e)
        }
    }

    const logOut = (e) => {
        e.preventDefault()
        console.log("LOG OUT")
        localStorage.clear()
        navigate("/")
    }

    const deleteUser = async (e) => {
        e.preventDefault()
        console.log("DELETED")
        localStorage.clear()
        const response = API.delete(`/users/sign_out/${userID}`)
        navigate("/")
    }

    const loadName = async () => {
        if(userID !== -1) {
            try {
                const response = await fetch(`https://localhost:9090/api/users/${userID}`)
                const data = await response.json()
                setUserName(data.name)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        }
    }

    useEffect(() => {
        loadProfile()
        loadName()
        loadFavourites()
    },[])

    useEffect(() => {
        if (userID !== -1) {
            loadName(); // Load name only after userID is set
        }
    }, [userID])

    if(loading) {
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
    return (
        <>
            <Header />
            <div className='text-white mx-[5vw] min-h-[68vh]'>
                <div className="mx-auto">
                    <h1 className = "text-3xl sm:text-4xl font-['Poppins'] font-semibold text-center my-[2vh]">Change Profile Details</h1>
                    <div className='sm:flex sm:space-x-8 justify-center'>
                        <h1 className="text-xl font-['SUSE'] font-semibold py-2 sm:mx-6 sm:w-[6vw]">Name</h1>
                        <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} className="text-black w-[50vw] sm:w-[20vw] sm:m-3 px-2"></input>
                        <button onClick={changeD} className = "m-2 bg-red-600 px-1 rounded-lg">Submit</button>
                    </div>
                    <div className='sm:flex sm:space-x-8 justify-center'>
                        <h1 className="text-xl font-['SUSE'] font-semibold py-2 sm:mx-6 sm:w-[6vw]">E-mail</h1>
                        <input type="text" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} className="text-black w-[50vw] sm:w-[20vw] sm:m-3 px-2"></input>
                        <button onClick={changeD} className = "m-2 bg-red-600 px-1 rounded-lg">Submit</button>
                    </div>
                    <div className='sm:flex sm:space-x-8 justify-center'>
                        <h1 className="text-xl font-['SUSE'] font-semibold py-2 sm:mx-6 sm:w-[6vw]">Password</h1>
                        <input type="password" value={userPassword} onChange={(e) => {setUserPassword(e.target.value)}} className="text-black w-[50vw] sm:w-[20vw] sm:m-3 px-2"></input>
                        <button onClick={changeD} className = "m-2 bg-red-600 px-1 rounded-lg">Submit</button>
                    </div>
                </div>
                <div className='h-10'></div>
                <div className="text-center">
                    <button onClick={logOut} className="bg-red-700 hover:bg-red-600 py-2 px-6 font-semibold text-lg rounded-3xl">Log Out</button>
                </div>
                <div className='h-10'></div>
                <div className="text-center">
                    <button onClick={deleteUser} className="bg-red-700 hover:bg-red-600 py-2 px-6 font-semibold text-lg rounded-3xl">Delete Profile</button>
                </div>
                <div className='h-10'></div>
                <div className="bg-gray-900 rounded-xl px-[2vw] p-3 sm:w-[50vw] mx-auto">
                    <h1 className="my-[1vh] text-2xl sm:text-3xl font-['Poppins'] font-semibold">Favourite Movie List</h1>
                    {

                        fav.map((movie,index) => {
                            return <h1 key={index} className="font-medium my-2 hover:text-red-400"><Link to = {`/movie?name=${movie.replaceAll(" ","+")}`}>{movie}</Link></h1>
                        })
                    }
                </div>
                <div className='h-10'></div>
            </div>
            <Footer />
        </>
    )
}

export default Profile