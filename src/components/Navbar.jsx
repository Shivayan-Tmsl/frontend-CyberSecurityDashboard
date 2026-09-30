import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useSubmit } from 'react-router-dom';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(false);
  const [loading, setLoading] = useState(false);

  

  

  const token = localStorage.getItem("token");

  const registerWebsite = async (e) => {
    
    e.preventDefault();
    // Handle form submission logic here
    setLoading(true);
    try {
      const response = await axios.post("https://backend-cybersecuritydashboard.onrender.com/api/register", {
        url,
        name
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error adding website:", error);
    } finally {
      setLoading(false);
      setWebsite(false);

    }

  }
  
  return (
    // Changed: Removed absolute bounds constraint if unnecessary, explicitly tracking top layout
    <div className='bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] shadow-lg p-3 fixed top-0 left-0 right-0 w-full z-50 box-border h-16 sm:h-16'>

      {/* Navbar Row */}
      <div className='flex items-center justify-between w-full max-w-full'>

        {/* Left Section: Forces content to take up exactly what it needs, no more */}
        <div className='flex items-center gap-2 max-w-[50%] min-w-0'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-gray-500 hover:text-green-500 lg:hidden flex-shrink-0'
          >
            <HiMenu className='text-2xl' />
          </button>
          <div className='flex gap-10'>
            <h1 className='text-sm sm:text-xl font-bold text-green-500 truncate select-none'>
            ThreatLens
          </h1>
          <div className="flex items-center gap-4">
  <span className="relative flex h-7 w-7 items-center justify-center">

    {/* Outer radiation */}
    <span className="absolute h-7 w-7 rounded-full border-2 border-green-500/40 animate-ping"></span>

    {/* Inner glow */}
    <span className="absolute h-5 w-5 rounded-full bg-green-500/30 animate-pulse"></span>

    {/* Core */}
    <span className="relative h-4 w-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]"></span>

  </span>

  <span className="text-4xl font-semibold text-green-500">
    Live Monitoring
  </span>
</div>

          </div>
          
          
        </div>

        {/* Right Section: Guaranteed visibility via flex-row and layout anchoring */}
        <div className='flex items-center gap-2 flex-nowrap flex-shrink-0 ml-auto'>

          <button className='bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] text-white rounded-full flex items-center justify-center p-2 sm:px-4 sm:py-2 flex-shrink-0' onClick={() => setWebsite(true)}>
            <FaPlus className='text-xl shrink-0' />
            <span className='hidden md:inline-block font-bold ml-1 whitespace-nowrap'>
              Website
            </span>
          </button>

          {website && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4'>
              <div className='w-full max-w-lg bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16]  flex flex-col rounded-xl p-5 gap-5'>

                <div className='flex bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] justify-between items-center rounded-xl p-3'>
                  <h1 className='font-bold'>Add Website</h1>
                  <FaTimes onClick={() => setWebsite(false)} className='cursor-pointer' />
                </div>

                <form className='flex flex-col gap-4' onSubmit={registerWebsite}>

                  <input
                    type="text"
                    placeholder='Website Name'
                    className='p-2 border bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder='Website URL'
                    className='p-2 border bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />

                  <button
                    className='bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] hover:bg-gradient-to-br hover:from-indigo-400/[0.16] hover:via-white/[0.08] hover:to-blue-500/[0.12] text-white font-bold p-2 rounded-xl flex items-center justify-center gap-2'
                    type='submit'
                  >
                    Add Website
                  </button>

                </form>

              </div>
            </div>
          )}
          

        </div>

      </div>

      {/* Mobile Side Menu: Changed to absolute overlay so it doesn't physically disrupt the top navbar layout spacing */}
      {isMenuOpen && (
        <div className='lg:hidden absolute top-full left-3 w-2/3 bg-white shadow-xl rounded-xl p-2 border border-gray-100 mt-2 transition-all'>
          <Sidebar />
        </div>
      )}

    </div>
  );
};

export default Navbar;