# Standalone use:
# > docker build -t family-calendar-backend .
# > docker run --name family-calendar-backend -dp 3000:3000 family-calendar-backend

# Create image based on the official Node 12 image from the dockerhub
FROM node:12-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/family-calendar/backend

# Change directory so that our commands run inside this new directory
WORKDIR /usr/family-calendar/backend

# Copy dependency definitions
COPY package.json yarn.lock ./

# Install bash
RUN apk add bash

# Install dependencies
RUN npm install pm2 -g
RUN yarn install
# RUN yarn install --production

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
# CMD ["yarn", "start:dev"]
CMD ["node", "./build/main.bundle.js"]
# CMD ["pm2-runtime", "./build/main.bundle.js"]



# FROM node:12-alpine
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --production
# COPY . .
# CMD ["node", "/app/src/index.js"]