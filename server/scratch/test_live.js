// server/scratch/test_live.js
import axios from "axios";

const LIVE_URL = "https://mern-events-backend.onrender.com";

const runTest = async () => {
  console.log("Testing live server connectivity...");
  try {
    const rootRes = await axios.get(LIVE_URL);
    console.log("Root health check response:", rootRes.data);
  } catch (err) {
    console.error("Root health check failed:", err.message);
    return;
  }

  console.log("\nTesting intelligent recommendation endpoint...");
  try {
    const recRes = await axios.post(`${LIVE_URL}/api/v1/recommendation`, {
      budget: 150000,
      eventType: "Wedding",
      guestCount: 150,
      location: "Mumbai"
    });
    console.log("Recommendation response success status:", recRes.data.success);
    console.log("Recommendation payload keys:", Object.keys(recRes.data.data));
  } catch (err) {
    console.error("Recommendation endpoint failed:", err.response?.data || err.message);
  }
  
  console.log("\nTesting login endpoint with invalid credentials...");
  try {
    await axios.post(`${LIVE_URL}/api/v1/auth/login`, {
      email: "test@nonexistent.com",
      password: "wrongpassword"
    });
  } catch (err) {
    console.log("Login returned (expected error):", err.response?.status, err.response?.data?.message);
  }
};

runTest();
