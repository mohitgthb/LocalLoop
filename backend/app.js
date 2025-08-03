const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const passport = require('passport');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Make io available everywhere (optional)
app.set('io', io);


//middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

// app.use(passport.initialize());

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

io.on('connection', (socket) => {
  console.log('✅ New socket connected:', socket.id);

  socket.on('join', (userId) => {
    console.log(`User ${userId} joined their notifications room`);
    socket.join(userId); // Join room for this user
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

//test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("server is running on PORT", PORT);
});