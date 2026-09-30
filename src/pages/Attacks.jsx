import React from 'react';
import SideBar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


const Attacks = () => {
  
  const [loading, setLoading] = useState(false);
  const [attacks, setAttacks] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {

    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchAttacks = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/attacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setAttacks(data);

    } catch (error) {

      console.error("Error fetching attacks:", error);
    } finally {
      setLoading(false);
    }



  }

    const getTimeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
};

  useEffect(() => {
    fetchAttacks();
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
                <h1 className='text-xl font-bold text-white mb-5'>All Attacks</h1>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-blue-200/10 bg-gradient-to-br from-indigo-950/80 via-[#111936]/80 to-[#0b1025]/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(15,23,42,0.25)]">

  {attacks.length === 0 ? (
    <p className="p-4 text-white">No attacks to display.</p>
  ) : (
    <table className="w-full text-left">
      <thead className="border-b border-blue-200/10">
        <tr>
          <th className="px-4 py-3 text-sm font-semibold text-gray-400">
            Attack Type
          </th>

          <th className="px-4 py-3 text-sm font-semibold text-gray-400">
            Time
          </th>

          <th className="px-4 py-3 text-sm font-semibold text-gray-400">
            IP Address
          </th>

          <th className="px-4 py-3 text-sm font-semibold text-gray-400">
            Severity
          </th>
        </tr>
      </thead>

      <tbody>
        {attacks.map((item, index) => (
          <tr
            key={index}
            className="border-b border-blue-200/10 last:border-b-0 transition-colors hover:bg-blue-500/5"
          >
            {/* Attack Type */}
            <td className="px-4 py-4 font-bold text-white">
              {item.type}
            </td>

            {/* Time */}
            <td className="px-4 py-4 text-gray-300">
              {getTimeAgo(item.timestamp)}
            </td>

            {/* IP Address */}
            <td className="px-4 py-4 font-mono text-gray-300">
              {item.ip === "::1" ? "127.0.0.1" : item.ip}
            </td>

            {/* Severity */}
            <td className="px-4 py-4">
              <span
                className={`font-bold ${
                  item.severity === "high"
                    ? "text-red-500"
                    : item.severity === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {item.severity}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

</div>
              
              
              
            </div>

           




          </div>
        </div>

      </div>


    </div>
  )
}

export default Attacks
