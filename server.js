// Import required modules
const express = require('express');
const https = require('https'); // Use the 'https' module
const fs = require('fs');

// Read options file
const options = JSON.parse(fs.readFileSync('options.json', 'utf8'));

// Create an instance of Express
const app = express();

// Define a route that calls ChatGPT and sends a response
app.get('/', (req, res) => {
  try {
    console.log('Beginning of the app.get');
    console.log(options.apiKey);
    console.log(options.hostname);
    console.log(options.path);
    const apiKey = options.apiKey;

    // What we ask from ChatGPT
    const textPrompt =
      'I am in a Dota 2 drafting phase, and I am middle lane. In my team, I have Witch Doctor and Bane support, Axe offlane, and Slark carry. Enemies have Morphling, Dragon Knight, Windranger, and Shadow Shaman. Which mid should I pick?';

    const requestOptions = {
      hostname: 'api.openai.com',
      path: '/v1/engines/davinci/completions',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Host: 'api.openai.com',
      },
    };

    const postData = JSON.stringify({
      prompt: textPrompt,
      max_tokens: 500, // Adjust the number of tokens as needed
    });

    const request = https.request(requestOptions, (response) => {
      let responseData = '';

      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        console.log('API Response:', responseData);
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
