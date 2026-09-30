//line chart for attacks over time
import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../services/socket";
import {
    AreaChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Area
} from "recharts";



const AttacksOverTime = ({ attacksData }) => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAttackTrend = async() => {
      try {
        const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/attack-trend", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching attack trend data:", error);
      }

      
    }
    fetchAttackTrend();
  }, []);

   useEffect(() => {

        const handleNewAttack = (attack) => {

            const currentTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
});


            setData(previousData => {

    const updatedData = [...previousData];

    const lastEntry =
        updatedData[updatedData.length - 1];

    if (lastEntry && lastEntry.time === currentTime) {

        updatedData[updatedData.length - 1] = {
            ...lastEntry,
            attacks: lastEntry.attacks + 1
        };

    } else {

        updatedData.push({
            time: currentTime,
            attacks: 1
        });

    }

    return updatedData.slice(-30);
});

        };


        socket.on("newAttack", handleNewAttack);


        // Cleanup listener
        return () => {
            socket.off("newAttack", handleNewAttack);
        };

    }, []);

    

    return (
        <div className="w-full h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ right: 30 }}>
        
        {/* Cybersecurity cyan gradient */}
        <defs>
            <linearGradient
                id="cyberGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop
                    offset="0%"
                    stopColor="#38BDF8"
                    stopOpacity={0.30}
                />

                <stop
                    offset="60%"
                    stopColor="#0EA5E9"
                    stopOpacity={0.10}
                />

                <stop
                    offset="100%"
                    stopColor="#0F172A"
                    stopOpacity={0}
                />
            </linearGradient>
        </defs>

        {/* Subtle grid */}
        <CartesianGrid
            stroke="#334155"
            strokeOpacity={0.35}
            vertical={false}
        />

        {/* X Axis */}
        <XAxis
            dataKey="time"
            interval="preserveStartEnd"
            stroke="#94A3B8"
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
        />

        {/* Y Axis */}
        <YAxis
            stroke="#94A3B8"
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
        />

        <Legend
            wrapperStyle={{
                color: "#CBD5E1",
                fontSize: "13px"
            }}
        />

        <Tooltip
            contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: "10px",
                color: "#E2E8F0",
                boxShadow: "0 8px 30px rgba(0,0,0,0.35)"
            }}
            labelStyle={{
                color: "#94A3B8"
            }}
            itemStyle={{
                color: "#38BDF8"
            }}
        />

        {/* Cybersecurity attack area */}
        <Area
            type="monotone"
            dataKey="attacks"
            stroke="#38BDF8"
            strokeWidth={2.5}
            fill="url(#cyberGradient)"
            activeDot={{
                r: 6,
                fill: "#38BDF8",
                stroke: "#E0F2FE",
                strokeWidth: 2
            }}
        />

    </AreaChart>
</ResponsiveContainer>
</div>
    );
};

export default AttacksOverTime;
