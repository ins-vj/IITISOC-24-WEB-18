FROM node:21-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]
