import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import margin from '../assets/margin.png';
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async(e) => {
    e.preventDefault();

    if(!email){
      setError("Please enter a valid email id!");
      return;
    }

    if(!password){
      setError("Please enter a valid password!");
      return;
    }

    if(!name){
      setError("Please enter a user name!");
      return;
    }

    setError("");

    try {
      const res = await axios.post("https://backend-cybersecuritydashboard.onrender.com/api/auth/signup",{
        name,
        email,
        password,
      });
      const data = res.data;
      if(data.success){
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while signing up. Please try again.")
      
    }


    
  }
  
  
  return (
    <div className="bg-gradient-to-br from-[#111a35] via-[#10172d] to-[#0c1328] flex items-center min-h-screen pl-10 pr-0">
    
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center w-1/2">
        <h1 className='text-white text-4xl'>Welcome!</h1>
        <h2 className="text-white mb-6">
          See the threats. Secure your system. Stay one step ahead with ThreatLens.
        </h2>
    
        <form
          autoComplete="off"
          onSubmit={handleSignup}
          className="flex flex-col gap-4 rounded-2xl p-6 w-full max-w-xl bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16]"
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-3 w-full"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-3 w-full"
          />
    
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06]
  backdrop-blur-xl
  border border-white/[0.10]
  shadow-[0_8px_32px_rgba(0,0,0,0.18)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:border-white/[0.16] rounded-xl p-3 w-full"
          />

          {error && <p className='text-red-500 '>{error}</p>}



          <button
            type="submit"
            className=" bg-gradient-to-br from-indigo-950/80 via-[#111936]/80 to-[#0b1025]/90
  backdrop-blur-xl
  shadow-[0_8px_25px_rgba(15,23,42,0.25)]
  transition-all duration-300
  hover:-translate-y-1
  hover:border-blue-200/20
  hover:shadow-[0_10px_30px_rgba(30,64,175,0.12)] w-full rounded-full p-2 text-white "
          >
            Signup
          </button>
        </form>
        <p className='flex items-center gap-2 mt-3 ml-5 text-white'>Already have an account?<span className='text-blue-600 cursor-pointer underline decoration-blue-700' onClick={()=> navigate("/login")}>Login</span></p>
      </div>
    
      {/* RIGHT SIDE IMAGE */}
      <img
        src={margin}
        alt="Expense Illustration"
        className="hidden md:block w-[20%] h-screen object-cover ml-auto rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
      />
    
    </div>
  )
}

export default Signup
