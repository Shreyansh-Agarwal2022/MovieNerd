import Header from './Header.jsx'
import Footer from './Footer.jsx'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import API from "./axios.jsx"

function Signup() {
    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return null != String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };


      const createAccount = async (e) => {
        e.preventDefault()
        if (userPassword.trim() === "" || userEmail.trim() == "" || userName.trim() == "") {
            alert("Password cannot be empty.")
            return
        }try {
            // Call the login API
            const response = await API.post("/v1/auth/register", {
                email: userEmail,
                name: userName,
                password: userPassword,
            })

            // Save the token and id in local storage
            const temp = response.data

            localStorage.setItem("token", temp.password)
            localStorage.setItem("uid", temp.id)
            localStorage.setItem("email",userEmail)
            localStorage.setItem("namep",userPassword)

            // Navigate to the home page after successful login
            navigate("/")
        } catch (error) {
            console.error("Error during login:", error)

            // Handle error response (e.g., invalid credentials)
            if (error.response && error.response.data) {
                alert(`Login failed: ${error.response.data.message}`)
            } else {
                alert("An error occurred during login. Please try again.")
            }
        }
    }

    return(
        <>
            <Header />
            <div className='sm:min-h-[50vh] sm:my-[10vh] min-h-[30vh] my-[20vh]'>
            <div className="bg-gray-800 rounded-3xl text-white mx-10 sm:mx-[30vw] text-center">
                <h1 className="py-[2vh] text-3xl sm:text-4xl font-['Poppins'] font-semibold">Create Account</h1>
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold font-['Roboto']">Enter Name</h1>
                    <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} className="text-black w-[50vw] sm:w-[20vw] my-3 px-2 mx-auto"></input>
                    <h1 className="text-xl font-semibold font-['Roboto']">Enter Email</h1>
                    <input type="email" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} className="text-black w-[50vw] sm:w-[20vw] my-3 px-2 mx-auto"></input>
                    <h1 className="text-xl font-semibold font-['Roboto']">Enter Password</h1>
                    <input type="password" value={userPassword} onChange={(e) => {setUserPassword(e.target.value)}} className="text-black w-[50vw] sm:w-[20vw] my-3 px-2 mx-auto"></input>
                    <div className='h-6'></div>
                    <button onClick={createAccount} className="mx-auto text-center p-3 bg-blue-600 hover:bg-blue-800 font-semibold text-lg rounded-full">Create</button>
                    <div className='h-6'></div>
                </div>
                <h1 className="font-['Roboto'] text-lg font-semibold text-red-600"><Link to='/login'>Already a user?</Link></h1>
                <div className='h-6'></div>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup