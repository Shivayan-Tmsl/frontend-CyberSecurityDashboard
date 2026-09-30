//pie chart
import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from "../services/socket";


const AttacksType = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  

  useEffect(() =>{
    const fetchAttackType = async()=>{
      try {
        const response = await axios.get("https://backend-cybersecuritydashboard.onrender.com/api/attack-type-distribution",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log("Attack type data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching attack type distribution:", error);
      }

    }
    fetchAttackType();
  }, []);

  useEffect(() =>{
    const handleNewAttack = (attack) => {
  setData(previousData => {
    const updatedData = [...previousData];

    const existingType = updatedData.find(
      item => item.attackType === attack.attackType
    );

    if (existingType) {
      existingType.attacks += 1;
    } else {
      updatedData.push({
        attackType: attack.attackType,
        attacks: 1
      });
    }

    return updatedData;
  });
};
  }, []);




  return (
   <ResponsiveContainer width="100%" height={350}>

      <PieChart>

        <Pie
          data={data}
          dataKey="attacks"
          nameKey="attackType"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          label
        >

          {data.map((entry, index) => (
           <Cell
    key={`cell-${index}`}
    fill={[
        "#38BDF8",
        "#F87171",
        "#FACC15",
        "#A78BFA",
        "#34D399"
    ][index % 5]}
/>
          ))}

        </Pie>

        <Tooltip />

<Legend
  formatter={(value, entry, index) => data[index]?.attackType}
/>

      </PieChart>

    </ResponsiveContainer>
  )

}
export default AttacksType
