const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log("REGISTER BODY:", req.body);

  res.json({
    success: true,
    message: "Register working ✔",
  });
});

router.post("/login", (req, res) => {
  console.log("LOGIN BODY:", req.body);

  res.json({
    success: true,
    message: "Login working ✔",
  });
});

module.exports = router;