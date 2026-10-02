import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { LuArrowRight } from 'react-icons/lu';
import AttacksOverTime from '../Charts/AttacksOverTime';
import AttacksType from '../Charts/AttacksType'
import SeverityTrend from '../Charts/SeverityTrend';
import { MdGppBad } from "react-icons/md";
import { socket } from "../services/socket";



const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalAttacks, setTotalAttacks] = useState(null);
  const [lowSeverityAttacks, setLowSeverityAttacks] = useState(null);
  const [mediumSeverityAttacks, setMediumSeverityAttacks] = useState(null);
  const [highSeverityAttacks, setHighSeverityAttacks] = useState(null);
  const [last5Attacks, setLast5Attacks] = useState([]);
  const [last5Alerts, setLast5Alerts] = useState([]);



  const token = localStorage.getItem("token");
  useEffect(() => {

    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);



  const fetchTotalAttacks = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/dashboard/total-attacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setTotalAttacks(data);

    } catch (error) {

      console.error("Error fetching total attacks :", error);
    } finally {
      setLoading(false);
    }



  }

  const fetchHighSeverityAttacks = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/dashboard/high-severity-attacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setHighSeverityAttacks(data);

    } catch (error) {

      console.error("Error fetching high severity attacks :", error);
    } finally {
      setLoading(false);
    }



  }

  const fetchMediumSeverityAttacks = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/dashboard/medium-severity-attacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setMediumSeverityAttacks(data);

    } catch (error) {

      console.error("Error fetching medium severity attacks :", error);
    } finally {
      setLoading(false);
    }



  }

  const fetchLowSeverityAttacks = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/dashboard/low-severity-attacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setLowSeverityAttacks(data);

    } catch (error) {

      console.error("Error fetching total attacks :", error);
    } finally {
      setLoading(false);
    }



  }

  const fetchLast5Attacks = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/dashboard/last5-attacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setLast5Attacks(data);

    } catch (error) {

      console.error("Error fetching total attacks :", error);
    } finally {
      setLoading(false);
    }



  }

  const fetchLast5Alerts = async () => {
    if (!token) return;
    if (loading) return; // Prevent multiple requests

    setLoading(true);

    try {
      const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/dashboard/last5-alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setLast5Alerts(data);

    } catch (error) {

      console.error("Error fetching total attacks :", error);
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
    Promise.all([ //Promise.all() makes it explicit that these requests are independednt and can happen in parallel
      fetchTotalAttacks(),
      fetchHighSeverityAttacks(),
      fetchMediumSeverityAttacks(),
      fetchLowSeverityAttacks(),
      fetchLast5Attacks(),
      fetchLast5Alerts(),
    ]);
  }, []);

  useEffect(() => {
    const handleNewAttack = (attack) => {
      console.log("New attack received:", attack);
      // Update the total attacks count
      setTotalAttacks(prevCount => prevCount + 1);

      // Update the severity counts based on the new attack's severity
      if (attack.severity === "high") {
        setHighSeverityAttacks(prevCount => prevCount + 1);
      } else if (attack.severity === "medium") {
        setMediumSeverityAttacks(prevCount => prevCount + 1);
      } else if (attack.severity === "low") {
        setLowSeverityAttacks(prevCount => prevCount + 1);
      }
      //update the last 5 attacks list
      setLast5Attacks(prevAttacks => {
        const updatedAttacks = [attack, ...prevAttacks];
        return updatedAttacks.slice(0, 5); // Keep only the last 5 attacks
      });
    }
    socket.on("newAttack", handleNewAttack);
    return () => {
      socket.off("newAttack", handleNewAttack);
    }
  }, []);

  useEffect(() => {
    const handleNewAlert = (alert) => {
      console.log("New alert received:", alert);
      //update the last 5 alerts list
      setLast5Alerts(prevAlerts => {
        const updatedAlerts = [alert, ...prevAlerts];
        return updatedAlerts.slice(0, 5); // Keep only the last 5 alerts
      });
    }
    socket.on("newAlert", handleNewAlert);
    return () => {
      socket.off("newAlert", handleNewAlert);
    }
  }, []);




  return (
    <div className='min-h-screen bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] flex flex-col'>

      <div><Navbar /></div>


      <div className='flex'>

        {/* Sidebar */}
        <div className='w-1/5 fixed top-[60px] left-0 h-[calc(100vh-60px)] bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] shadow-[0_8px_20px_rgba(0,0,0,0.5)] mt-0.5 rounded-xl lg:block hidden'>
          <Sidebar />
        </div>

        {/* Main Content Wrapper */}
        <div className='flex-1 lg:ml-[20%] w-full'>

          {/* Top Summary Cards */}
          <div className='mt-20 w-full rounded-xl px-4 lg:px-6 '>
            <div className='bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] shadow-[0_8px_20px_rgba(0,0,0,0.5)] border-2 border-yellow-800 w-full flex flex-col lg:flex-row justify-evenly p-7 rounded-xl gap-4 mt-14'>

              <div className='flex items-center justify-center gap-3    bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-4  w-full'>

                <div className='text-xl flex flex-col gap-2 font-bold text-white'>
                  <div className='flex gap-3 items-center justify-center'><MdGppBad className='text-xl text-yellow-400' /><p className='text-white font-bold'>Total</p></div> <p className='text-white font-bold flex items-center justify-center'>Attacks : {totalAttacks || 0}</p>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3   bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-4  w-full'>

                <div className='text-xl flex flex-col gap-2 font-bold text-white'>
                  <div className='flex gap-3 items-center justify-center'><div className='rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-red-800 flex items-center justify-center'>

                  </div> <p className='text-white font-bold'>High Severity</p></div> <p className='text-white font-bold flex items-center justify-center'>Attacks : {highSeverityAttacks || 0}</p>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3   bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-4  w-full'>

                <div className='text-xl flex flex-col gap-2 font-bold text-white'>
                  <div className='flex gap-3 items-center justify-center'><div className='rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-orange-600 flex items-center justify-center'>

                  </div> <p className='text-white font-bold'>Medium Severity</p></div> <p className='text-white font-bold flex items-center justify-center'>Attacks : {mediumSeverityAttacks || 0}</p>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3   bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-4  w-full'>

                <div className='text-xl flex flex-col gap-2 font-bold text-white'>
                  <div className='flex gap-3 items-center justify-center'><div className='rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-green-700 flex items-center justify-center'>

                  </div> <p className='text-white font-bold'>Low Severity</p></div> <p className='text-white font-bold flex items-center justify-center'>Attacks : {lowSeverityAttacks || 0}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Middle Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-7 mt-3 px-4 lg:px-6'>

             {/* Recent Attacks */}
<div className="bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328]
                border-2 border-yellow-800
                shadow-[0_8px_20px_rgba(0,0,0,0.5)]
                p-4 sm:p-6 lg:p-12
                rounded-xl
                flex flex-col
                min-w-0">

  <p className="text-lg font-bold text-white">
    Recent Attacks
  </p>

  <div className="mt-4 w-full overflow-x-auto rounded-xl border border-blue-200/10">

    <div className="min-w-[600px] bg-gradient-to-br from-indigo-950/80 via-[#111936]/80 to-[#0b1025]/90 backdrop-blur-xl">

      {last5Attacks.length === 0 ? (

        <p className="p-4 text-white">
          No recent attacks.
        </p>

      ) : (

        <table className="w-full text-left">

          <thead className="border-b border-blue-200/10">
            <tr>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                Attack Type
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                Time
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                IP Address
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                Severity
              </th>

            </tr>
          </thead>

          <tbody>

            {last5Attacks.map((item, index) => (

              <tr
                key={index}
                className="border-b border-blue-200/10 last:border-b-0 transition-colors hover:bg-blue-500/5"
              >

                <td className="px-4 py-4 font-bold text-white whitespace-nowrap">
                  {item.type}
                </td>

                <td className="px-4 py-4 text-gray-300 whitespace-nowrap">
                  {getTimeAgo(item.timestamp)}
                </td>

                <td className="px-4 py-4 font-mono text-gray-300 whitespace-nowrap">
                  {item.ip === "::1" ? "127.0.0.1" : item.ip}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-xs font-bold text-white ${
                      item.severity === "high"
                        ? "bg-red-600"
                        : item.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
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

            {/* Attacks over time */}
            <div className='bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] p-12 rounded-xl border-2 border-yellow-800 flex flex-col aspect-square shadow-[0_8px_20px_rgba(0,0,0,0.5)]'>
              <p className='text-lg font-bold text-white'>Attacks over Time</p>
              <p className='text-gray-50 mt-3'>Attacks over last 24 hours</p>
              <div className='mt-6 items-center justify-center p-8'>
                  <AttacksOverTime />
              </div>
              
            </div>

            {/* Recent Alerts */}
<div className="bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328]
                p-4 sm:p-6 lg:p-12
                rounded-xl
                border-2 border-yellow-800
                flex flex-col
                min-w-0
                shadow-[0_8px_20px_rgba(0,0,0,0.5)]">

  <p className="text-lg font-bold text-white">
    Recent Alerts
  </p>

  <div className="mt-4 w-full overflow-x-auto rounded-xl border border-blue-200/10">

    <div className="min-w-[500px] bg-gradient-to-br from-indigo-950/80 via-[#111936]/80 to-[#0b1025]/90 backdrop-blur-xl">

      {last5Alerts.length === 0 ? (

        <p className="p-4 text-white">
          No recent alerts.
        </p>

      ) : (

        <table className="w-full text-left">

          <thead className="border-b border-blue-200/10">
            <tr>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                Alert
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                Time
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-400 whitespace-nowrap">
                Severity
              </th>

            </tr>
          </thead>

          <tbody>

            {last5Alerts.map((item, index) => (

              <tr
                key={index}
                className="border-b border-blue-200/10 last:border-b-0 transition-colors hover:bg-blue-500/5"
              >

                <td className="px-4 py-4 font-bold text-white whitespace-nowrap">
                  {item.title}
                </td>

                <td className="px-4 py-4 text-gray-300 whitespace-nowrap">
                  {getTimeAgo(item.createdAt)}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-xs font-bold text-white ${
                      item.severity === "high"
                        ? "bg-red-600"
                        : item.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
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

            {/* Attack Type Distribution */}
            <div className='bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] border-2 border-yellow-800 shadow-[0_8px_20px_rgba(0,0,0,0.5)] p-12 rounded-xl flex flex-col aspect-square'>
              <p className='text-lg font-bold text-white'>Attack Type Distribution</p>
              <p className='text-gray-50 mt-3'>Over last 7 days</p>
              <div className='mt-6 items-center justify-center'>
                <AttacksType /></div>
            </div>



            <div className='border-2 border-yellow-800 bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] shadow-[0_8px_20px_rgba(0,0,0,0.5)] p-12 rounded-xl flex flex-col aspect-square'>
              <p className='text-lg font-bold text-white'>Severity Trend</p>
              <div className='mt-8'>
                  <SeverityTrend />
              </div>
              
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
