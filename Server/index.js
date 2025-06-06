
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Routers: These are imported from different route and controller files that manage authentication, user, post, comment, and upload routes.
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const uploadRouter = require('./controllers/uploadController');
//Dotenv: Loads environment variables from a .env file into process.env.
const dotenv = require('dotenv').config();
//HTTP and Socket.io: http creates an HTTP server, and socket.io enables real-time, bidirectional communication between web clients and servers.
const http = require('http');
const { Server } = require('socket.io');

// This line initializes an Express application, which will handle incoming HTTP requests.
const app = express();

require('dotenv').config();


// 
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});





// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connection is a success'))
  .catch((err) => console.error('DB connection error (not connected):', err));


// Serve static files (e.g., images) from the public/images directory
app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/upload', uploadRouter);

// Start the server with both REST API and WebSocket
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


