# Use official node.js image
FROM node:18.18.0-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Port to run the application
EXPOSE 3000

# Run the program
CMD [ "node", "server.js" ]  # Replace "server.js" with the actual entry point of your application
