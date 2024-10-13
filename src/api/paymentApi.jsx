import axios from "axios";

// Set up the base URL for API calls
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Pointing to your local server
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
