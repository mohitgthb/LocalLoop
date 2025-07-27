const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const businessRoutes = require("./routes/businessRoutes");
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const threadRoutes = require('./routes/threadRoutes');

app.use("/api/posts", postRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/auth", authRoutes);

//database connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {console.error("Database connection failed:", err);});


//test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on PORT", PORT);
});