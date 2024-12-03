const express = require("express");
const app = express();
const usersRouter = require("./routes/users");

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
