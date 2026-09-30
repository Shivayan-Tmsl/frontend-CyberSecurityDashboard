import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Websites = () => {
      const [loading, setLoading] = useState(false);
      const [websites, setWebsites] = useState([]);
    
      const token = localStorage.getItem("token");
      const navigate = useNavigate();
    
    
      useEffect(() => {
    
        if (!token) {
          navigate("/login");
        }
      }, [token, navigate]);

    const fetchWebsites = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/websites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setWebsites(data);

    } catch (error) {

      console.error("Error fetching websites:", error);
    } finally {
      setLoading(false);
    }



  }

    useEffect(() => {
      fetchWebsites();
    }, []);
  return (
        <div className='min-h-screen flex-1  bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] flex flex-col w-full'>
      <Navbar />
      <div className='flex'>

        {/* Sidebar */}
        <div className='w-1/5 fixed top-[60px] left-0 h-[calc(100vh-60px)] shadow-[0_8px_20px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] mt-0.5 rounded-xl lg:block hidden'>
          <SideBar />
        </div>
        <div className='flex w-full flex-col ml-0 lg:ml-[20%] mt-16 p-5 '>
          <div className='w-full  '>

            <div className='bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] border-2 border-yellow-700 shadow-md rounded-xl p-5'>
              <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold text-white mb-5'>Registered Websites</h1>
                </div>
                <div className="flex flex-col gap-5 mt-4">
  {websites.length === 0 ? (
    <p className="text-white">No websites registered.</p>
  ) : (
    websites.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-3 items-center p-4 rounded-md border border-blue-200/10
        bg-gradient-to-br from-indigo-950/80 via-[#111936]/80 to-[#0b1025]/90
        backdrop-blur-xl
        shadow-[0_8px_25px_rgba(15,23,42,0.25)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200/20
        hover:shadow-[0_10px_30px_rgba(30,64,175,0.12)]"
      >

        {/* Website Name */}
        <p className="text-white font-bold">
          {item.name}
        </p>

        {/* URL */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline truncate"
        >
          {item.url}
        </a>

        {/* API Key */}
        <p className="text-white font-mono text-sm truncate">
          {item.apiKey}
        </p>

      </div>
    ))
  )}
</div>
              
              
              
            </div>

           




          </div>
        </div>

      </div>


    </div>
  )
}

export default Websites
