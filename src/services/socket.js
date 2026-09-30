// socket.js
import { io } from "socket.io-client";

const token = localStorage.getItem("token");

export const socket = io("https://backend-cybersecuritydashboard.onrender.com", {
    auth: {
        token
    }
});