import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import { socket } from "../services/socket";

const SeverityTrend = () => {

    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");


    // Create 30 empty minute slots
    const createEmptyData = () => {

        const now = new Date();
        const slots = [];

        for (let i = 29; i >= 0; i--) {

            const time = new Date(now.getTime() - i * 60 * 1000);

            const formattedTime =
                `${String(time.getHours()).padStart(2, "0")}:` +
                `${String(time.getMinutes()).padStart(2, "0")}`;

            slots.push({
                time: formattedTime,
                high: 0,
                medium: 0,
                low: 0
            });
        }

        return slots;
    };


    // Fetch initial data
    useEffect(() => {

        const fetchSeverityTrend = async () => {

            try {

                const response = await axios.get(
                    "https://backend-cybersecuritydashboard.onrender.com/api/severity-trend",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const emptySlots = createEmptyData();

                // Put API data into corresponding minute
                response.data.forEach(item => {

                    const slot = emptySlots.find(
                        slot => slot.time === item.time
                    );

                    if (slot) {
                        slot.high = item.high;
                        slot.medium = item.medium;
                        slot.low = item.low;
                    }

                });

                setData(emptySlots);

            } catch (error) {

                console.error(
                    "Error fetching severity trend data:",
                    error
                );

            }

        };

        fetchSeverityTrend();

    }, []);


    // Real-time updates
    useEffect(() => {

        const handleNewAttack = (attack) => {

            const now = new Date();

            const currentTime =
                `${String(now.getHours()).padStart(2, "0")}:` +
                `${String(now.getMinutes()).padStart(2, "0")}`;


            setData(previousData => {
    const updatedData = [...previousData];

    const lastIndex = updatedData.length - 1;
    const lastEntry = updatedData[lastIndex];

    // Same minute
    if (lastEntry && lastEntry.time === currentTime) {
        updatedData[lastIndex] = {
            ...lastEntry,
            high:
                attack.severity === "high"
                    ? lastEntry.high + 1
                    : lastEntry.high,

            medium:
                attack.severity === "medium"
                    ? lastEntry.medium + 1
                    : lastEntry.medium,

            low:
                attack.severity === "low"
                    ? lastEntry.low + 1
                    : lastEntry.low
        };
    }

    // New minute
    else {
        updatedData.push({
            time: currentTime,
            high: attack.severity === "high" ? 1 : 0,
            medium: attack.severity === "medium" ? 1 : 0,
            low: attack.severity === "low" ? 1 : 0
        });
    }

    return updatedData.slice(-30);
});

        };


        socket.on("newAttack", handleNewAttack);


        return () => {
            socket.off("newAttack", handleNewAttack);
        };

    }, []);


    return (

        <ResponsiveContainer width="100%" height={350}>

            <BarChart data={data}>

                <XAxis
    dataKey="time"
    axisLine={false}
    tickLine={false}
    interval={4}
/>

                <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip />

                <Legend />

                <Bar
                    dataKey="high"
                    stackId="severity"
                    fill="#F87171"
                    name="High"
                />

                <Bar
                    dataKey="medium"
                    stackId="severity"
                    fill="#FACC15"
                    name="Medium"
                />

                <Bar
                    dataKey="low"
                    stackId="severity"
                    fill="#34D399"
                    name="Low"
                />

            </BarChart>

        </ResponsiveContainer>
    );
};

export default SeverityTrend;
