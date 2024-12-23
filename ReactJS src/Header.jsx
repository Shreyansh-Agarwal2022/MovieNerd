import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"
import Logo from "./assets/logo.png"

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const renderButton = () => {
    const uid = localStorage.getItem("uid")
    let email = localStorage.getItem("email")
    if(email) {
      email = email.slice(0,6)
    }
    return ((!uid) ? (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <Link to='/signup'>Sign Up</Link>
      </button>
    ) : (
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
        <Link to='/profile'>{email}</Link>
      </button>
    ))
  }

  return (
    <>
    <div className="fixed w-[100vw] h-[7vh] flex items-center justify-between backdrop-blur-sm py-8 px-10 md:px-[10vw] xl:h-[10vh] z-[2]">
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/">Home</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/category">Category</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-10 lg:flex font-medium text-white">
          <li className="hover:bg-white hover:text-red-600 rounded-lg p-2">
            <NavLink 
              to="/" 
              style={({ isActive }) => ({ color: isActive ? 'red' : ''})}
            >
              Home
            </NavLink>
          </li>
          <li className="hover:bg-white hover:text-red-600 rounded-lg p-2">
            <NavLink 
              to="/category" 
              style={({ isActive }) => ({ color: isActive ? 'red' : ''})}
            >
              Category
            </NavLink>
          </li>
          <li className="hover:bg-white hover:text-red-600 rounded-lg p-2">
            <NavLink 
              to="/search" 
              style={({ isActive }) => ({ color: isActive ? 'red' : ''})}
            >
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>

      <Link to="/"><img src={Logo} alt="logo" className="w-[15vw] sm:w-[6vw] my-[2vh] ml-[6vw] sm:ml-0 sm:mr-[8vw]" /></Link>
      
      {renderButton()}
      
    </div>
    <div className="h-[10vh] sm:h-[15vh]"></div>
    </>
  );
}