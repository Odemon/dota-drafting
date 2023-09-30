// Import required modules
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route that sends a "Hello, World!" message
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define the port for your server
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
