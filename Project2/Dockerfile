# Stage 1: Build the Node.js application
FROM node:14 AS builder

# Set the working directory for the catalog server
WORKDIR /home

# Copy package.json and install dependencies for the catalog server
COPY package*.json ./
RUN npm install

# Copy the source code for the catalog server
COPY . .

# Build the catalog server
RUN npm run build


# Stage 2: Final image
FROM ubuntu:latest

# Update packages and install necessary tools
RUN apt-get update -y
 
# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /home/


# Expose ports for catalog and order servers
EXPOSE 3002

# Command to run the servers
CMD ["node", "app.js"]

