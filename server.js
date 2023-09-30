// Import required modules
const express = require('express');
const http = require('http');
const fs = require('fs');

// Read options file
const options = JSON.parse(fs.readFileSync('options.json', 'utf8'));

// Create an instance of Express
const app = express();

const requestOptions = {
  hostname: options.hostname,
  path: options.path,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${options.apiKey}`,
    'Content-Type': 'application/json',
  },
};

// Define a route that calls chatgpt and sends response
app.get('/', (req, res) => {
  try {
    const apiKey = options.apiKey; 

    // What we ask from chatgpt
    const textPrompt = 'I am in a dota2 drafting phase amd I am middle lane and in my team I have witch doctor and bane support, axe offlane and slark carry. Enemies have morphling, dragon knight, windranger and shadow shaman. Which mid I should pick?';


    const requestOptions = {
      hostname: options.hostname,
      path: options.path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Host': url.host,
      },
    };

    const postData = JSON.stringify({
      prompt: textPrompt,
      max_tokens: 100, // Adjust the number of tokens as needed
    });

    const request = http.request(requestOptions, (response) => {
      let responseData = '';

      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        // Extract the response from the API
        const answer = JSON.parse(responseData).choices[0].text;

        // Send the answer as the HTTP response
        res.send(`ChatGPT Response: ${answer}`);
      });
    });

    request.on('error', (error) => {
      console.error('Error calling ChatGPT:', error);
      res.status(500).send('Internal Server Error');
    });

    // Send the POST request with the data
    request.write(postData);
    request.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }

});

// Define the port for your server
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
